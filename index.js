const express = require('express');
const app = express(); //express hace la función de router
const db = require('./db'); //importando mongodb
const port = 3000;
const booksController = require('./controllers/books.controller'); 
const autenticacioncontrollers = require('./controllers/autenticacion.controller');
const autorizacionMiddlewareToken = require('./middlewares/autorizacion.middlewares');
const bodyParsed = require('body-parser');

app.use(bodyParsed.json()); //no olvidar usar el parseador porque si no, no se va a visualizar los datos ingresados en postman en el body en archivo tipo json, que es una de las reglas

//archivo en carpeta de controllers junto con books.contollers
app.post('/autho/signin', autenticacioncontrollers.signIn);

//Este middleware es para ver si la persona es un usuario y si lo es, tenga acceso a las func del booksController PERO SÓLO a las de leer todos los libros ingresados (primera función) y leer un libro por su id.
app.use(autorizacionMiddlewareToken.mdlwValidacionGeneral);
//por esa razón, abajo de este mdw sólo están los gets:

app.get('/books', booksController.readBooks);
app.get('/books/:identificador', booksController.LeerUnLibro);

//Este otro middleware es para primero, verificar que seas un usuario administrador, eso te da acceso a las otras tres funciones (sobreescribir, borrar o crear uno nuevo)
app.use(autorizacionMiddlewareToken.mdlwValiacionAdministracion); //la opción administrador se cambia en postman
//y por eso los post, put y delete están abajo de este midlw, éxito:

app.post('/books', booksController.ponerLibroNuevo); 
app.put('/books/:identificador', booksController.sobreescribirUnLibro);
app.delete('/books/:identificador', booksController.borrarUnLibro);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//Recuerda: en este archivo index sólo debe haber rutas hacia controladores.