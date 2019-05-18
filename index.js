//constantes, importaciones etc.
const express = require('express');
const app = express();
const db = require('./db');
const booksController = require('./controllers/books.controller');
const authController = require('./controllers/books.controller');
const authMiddleware = require('./middlewares/auth.middleware');
const port = 3000;
const bodyParsed = require('body-parser');

//librerías en uso
app.use(bodyParsed.json()); //no olvidar usar el parseador porque si no, no se va a visualizar los datos.

app.post('/auth/sigin', authController.sigIn);
app.use(authMiddleware);

//rutas hacia las funciones contenidas en la const booksController ubicada en el file books
app.get('/books', booksController.readBooks); //misma ruta para todas las funciones
app.post('/books', booksController.ponerLibroNuevo); 
app.get('/books/:identificador', booksController.LeerUnLibro);
app.put('/books/:identificador', booksController.sobreescribirUnLibro);
app.delete('/books/:identificador', booksController.borrarUnLibro);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//Recuerda: en este archivo index sólo debe haber rutas hacia controladores.