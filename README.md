# Desafio 8 Curso Backend

## Nuestra Primera Base de Datos

#### Comenzamos:

### Descripcion:

El desafio consiste en lograr persistencia en las bases de datos usando socket.io, por un lado un listado de productos usando la base de datos MySql Maria DB y por el otro un listado de mensajes de un chat en base de datos Sqlite3.

### Ejecutar el proyecto:

Para ejecutar el proyecto, el mismo puede descargarse como .zip o git clone
[Clic aqui para clonar](https://github.com/matsanchez/desafio8-backend.git)

> Instalar las dependencias:

```
npm install
```

> Poner a escuchar MySql:

```
Usando XAMPP Control Panel o el que utilices
```

> Modos de ejecucion Local:

```
npm run start (modo produccion) Node JS

npm run dev (modo developer) Nodemon
```

```
Ingresas en el navegador http://localhost:8080
```

> Creacion Base de Datos:

``
Si ya esta MySql a la escucha, simplemente ejecutas la aplicacion con los comandos "npm run dev" o "npm run start" y en el navegador ingresar a http://localhost:8080 y automaticamente se creara la base de datos en Mysql local bajo el nombre websocket_mariadb y se generara el archivo de la base de datos de Sqlite con el nombre "ecommerce" dentro de la carpeta DB del proyecto.
``

Autor: Matias Sanchez
