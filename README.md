# Fake API

Crear micro servicios falsos fácilmente desde un archivo JSON de configuración.

La aplicación esta creada en NodeJS sin ningún dependencia, es muy simple y puede servir para simular respuestas de servicios REST.

[Se publico una entrada sobre este código aquí.](https://80bits.blog/index.php/2023/09/24/fake-api-generar-servicios-http-rest-en-nodejs-para-simular-micro-servicios/)

## Código

Solo tiene una dependencia que es prettier para formatear el código.

```bash
npm i
```

Para ejecutar el código, lo recomendable seria ejecutarlo mediante [nodemon](https://nodemon.io/) para que detectes los cambios en caso de moverle al archivo de configuración.

```bash
npm i -g nodemon
```

El nombre del archivo JSON esta en el código explicito con el nombre: _servers.json_, por lo que deberá nombrarse de este modo o cambiarlo en el código, que es en la segunda linea.

Ejecutar el archivo index.js

```bash
nodemon index.js
```

```bash
node index.js
```

## Ejemplo servers.json

```json
[
  {
    "name": "server 1",
    "notFound": {
      "status": 404,
      "body": {
        "error": "not_found"
      }
    },
    "port": 3000,
    "paths": [
      {
        "path": "/profile",
        "methods": [
          {
            "method": "get",
            "response": {
              "status": 200,
              "body": {
                "id": "123456789",
                "name": "John Doe"
              },
              "headers": {
                "Content-Type": "application/json"
              }
            }
          }
        ]
      }
    ]
  },
  {
    "name": "server 2",
    "notFound": {
      "status": 404,
      "body": {
        "error": "not_found"
      }
    },
    "port": 4000,
    "paths": [
      {
        "path": "/login",
        "methods": [
          {
            "method": "post",
            "response": {
              "status": 200,
              "body": {
                "token": "123456789"
              }
            }
          }
        ]
      }
    ]
  }
]
```
