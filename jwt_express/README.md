# Arquitectura de Software

## Clase 6 - Autenticación y autorización con JWT

### Objetivos

- Implementar una API REST con operaciones CRUD para un usuario
- Incluir un mecanismo de autenticación y autorización utilizando [JWT](https://jwt.io/), leer acerca de JWT [aqui](https://jwt.io/introduction/)
- La persistencia de usuarios es deseable que sea en base de datos

### Ejercicio

Exponer un API REST con JSON como formato de intercambio de mensajes.
Los endpoints son los siguientes:

1. **GET** _/users?offset=0&limit=2_
   ```json
   {
     "offset": 0,
     "limit": 2,
     "size": 2,
     "data": [
       {
         "id": 1,
         "firstName": "Nombre 1",
         "lastName": "Apellido 1",
         "email": "example@example.com"
       },
       {
         "id": 2,
         "firstName": "Nombre 2",
         "lastName": "Apellido 2",
         "email": "example2@example.com"
       }
     ]
   }
   ```
2. **GET** _/users/:id_
   ```json
   {
     "id": 1,
     "firstName": "Nombre 1",
     "lastName": "Apellido 1",
     "email": "example@example.com"
   }
   ```
3. **POST** _/users/_
   ```json
   {
     "firstName": "Nombre 3",
     "lastName": "Apellido 3",
     "email": "example3@example.com"
   }
   ```
4. **POST** _/login/_
   ```json
   {
     "clientId": "client_id",
     "clientSecret": "client_secret_shh"
   }
   ```

Todos los endpoints excepto _/login/_ deben estar protegidos.
Al momento de implementar la protección de endpoints primero va a tener que generar un token de JWT que será devuelto al cliente y éste lo utilizara en las subsiguiente llamadas.

**POST** _/login/_

```json
{
  "clientId": "client_id",
  "clientSecret": "client_secret_shh"
}
```

respuesta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6Im9ydCIsImlhdCI6MTU1MTI5NDkwOX0.1AcM6WjVEcU9iE6OEsAPBOMUXGGF9Mt9o8iCxVzOdZ0"
}
```

**GET** _/users/:id_

Agregar el header `Authorization` con la informacion

`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6Im9ydCIsImlhdCI6MTU1MTI5NDkwOX0.1AcM6WjVEcU9iE6OEsAPBOMUXGGF9Mt9o8iCxVzOdZ0`

Puede bajar una colección de los endpoints de ejemplo [aquí](User_API.postman_collection.json).

### Posibles Node modules a utilizar

Algunos de los posibles módulos a utilizar (no restringidos a éstos) son:

1. _[koa](https://github.com/koajs/koa)_: web framework
2. _[koa-json](https://github.com/koajs/json)_: convierte objetos en JSON
3. _[koa-logger](https://github.com/koajs/logger)_: logging de cada request y response
4. _[koa-router](https://github.com/ZijianHe/koa-router)_: gestión simple de rutas
5. _[koa-bodyparser](https://github.com/koajs/bodyparser)_: parsing del request body
6. _[koa-jwt](https://github.com/koajs/jwt)_: helper para manejar JWT con koa
7. _[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)_: implementación de JWT
