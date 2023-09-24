const http = require("http");
const servers = require("./servers");

const mapServers = new Map();

for (const server of servers) {
  const { port, name, notFound } = server;

  if (!port || port < 80) {
    continue;
  }

  const isServer = mapServers.get(port);

  if (isServer) {
    continue;
  }

  mapServers.set(port, true);

  const { status: statusNotFound, body: bodyNotFound } = notFound;

  const { paths: pathsConfig } = server;

  const paths = new Map();
  for (const value of pathsConfig) {
    const { path, methods } = value;
    const httpMethod = new Map();
    for (const mvalues of methods) {
      const { method, response } = mvalues;
      httpMethod.set(method, response);
    }
    paths.set(path, httpMethod);
  }

  const httpServer = http.createServer((req, res) => {
    const { url, method, headers } = req;

    const log = {
      serverName: name,
      url,
      method,
      headers,
    };
    console.log(log);

    if (method === "OPTIONS") {
      res.statusCode = 200;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Credentials", "true");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.end();
      return;
    }

    const path = paths.get(url);

    if (!path) {
      res.statusCode = statusNotFound;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(bodyNotFound));
      return;
    }

    const response = path.get(method.toLocaleLowerCase());

    if (!response) {
      res.statusCode = statusNotFound;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(bodyNotFound));
      return;
    }

    const { status, body, headers: responseHeaders } = response;
    statusCode = status;

    res.statusCode = statusCode;

    if (!responseHeaders) {
      res.setHeader("Content-Type", "application/json");
    } else {
      for (const [key, value] of Object.entries(responseHeaders)) {
        res.setHeader(key, value);
      }
    }

    res.end(JSON.stringify(body));
  });

  mapServers.clear();

  httpServer.listen(port, () => {
    const listen = {
      name,
      port,
    };
    console.log(listen);
  });
}
