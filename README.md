# WeMan REST Api Challange

## Requisitos
* Tener NodeJs instalado version 8.11.1 o mayor
* Tener mongodb instalado

## Antes de empezar:

Instalar paquetes:

$ npm install

Correr MongoDB (dependiendo su instalacion lo podran correr de diferentes maneras, lo mas usual seria solo correr lo siguiente en la terminal)

$ mongod

Y por ultimo corremos el server con nodemon para que se reinicie nuestro servicio automaticamente

$ npm run dev

Deberias ver en los logs en cuanto inicias tu servidor lo siguiente:

```
Example app listening on port 3000!
Database connection successful
```

Si no es asi, revisa los pasos anteriores y asegurate de tener mongodb corriendo.

## Reglas
* La API solo puede regresar JSON, ningun texto, imagenes, u otro tipo de archivos
* Las funciones "handler" de las rutas deben existir en algun archivo de la carpeta de controladores e importarlos al archivo index.js para usarlas
* Los modelos solo se pueden usar dentro de archivos de la carpeta de controladores
* Ningun archivo de la carpeta models necesita tiene que ser editado
* La carpeta models_use tiene ejemplo de codigo que necesitaran usar en sus controladores para, leer, escrivir, actualizar y borrar registros, pero estos archivos no tienen que ser editados! solo son para que hagan copy/paste.
* los middleware que necesitemos codear nosotros, tendran que estar en el folder de middleawares, y haremos uso de ellos en index.js similiar a los controladores
* los archivos controlador tendran que tener la terminacino .controller.js, los archivos middleware tendran que tener la terminacion .middlware.js


## Instrucciones
El flujo de trabajo sera el siguiente

* Empezaran en orden de las tareas de la lista TO DO
* Cada tarea en la lista tiene su parte de especificaciones al final del documento
* Una ves terminada la tarea la marcaran en la lista de este archivo con una "x" en medio de los corchetes
* Haran git add, y git commit de su trabajo hasta el momento
* Continuaran la siguietne tarea, y repiten el ciclo hasta terminar


### TO DO:
- [x] crear endpoint para leer libros
- [x] crear endpoint para crear libros
- [x] crear endpoint para leer un libro
- [x] crear endpoint para sobre escribir libros
- [x] crear endpoint para borrar libros
- [x] crear endpoint para autentificarnos
- [x] crear middleware para revisar que el token sea valido
- [ ] crear middleware pare revisar si el usuario es admin

### Especificaciones

#### crear endpoint para leer libros

Crear una ruta '/books' que nos regrese todos los libros que tenemos en la base de datos, si no hay ningun libro nos deberia regresar una respuesta que nos informe eso.

#### crear endpoint para crear libros

Crear un endpoint para crear libros, este endpoint necesita recibir "title", "author" y "pageNumber", si no viene alguno de esos necesitamos regresar un mensaje de error, si todos vienen procederemos a crear el libro en la base de datos, de ser exitosa la operacion le informamos al cliente, y de fallar por alguna razon, se le tendra que enviar un mensaje de error al cliente informandole el error

#### crear endpoint para leer un libro

Crear un endpoint con el cual leeremos un libro en base a su ID, si encontramos el record que buscamos lo regresamos, y si no le informamos al cliente que no lo tenemos

#### crear endpoint para sobre escribir libros

crear un endpoint para remplazar el record de un libro, lo remplazaremo en base a su Id, y como en el endpoint de creacion necesitamos validar que venga "title", "author" y "pageNumber" en caso de que no regresar mensaje de error

#### crear endpoint para borrar libros

Crear endpoint para borrar algun libro en base a su id

#### crear endpoint para autentificarnos

Crear endpoint para authentificarnos, este recibira "user" y "pass" y regresara un token al usuario para que pueda utilizarlo en futuras requests

#### crear funcionalidad para revisar que el token sea valido

Crear funcionalidad para revisar el token en cada request (endpoints de authorizacion no incluidos) si el token es valido el usuario podra seguir, de lo contrario necesitamos regresar un mensaje de error

#### crear middleware pare revisar si el usuario es admin

Creare funcionalidad para revisar si el usuario es "admin", el usuario sera "admin" si cuando usa el endpoint de registro su "username" es "admin", si el usuario es admin podra, crear, actualizar y borrar libros, de lo contrario solo podra leerlos