//constantes, importaciones etc.
const express = require('express');
const app = express();
const db = require('./db');
const booksController = require('./controllers/books.controller');
const bodyParsed = require('body-parser');
const port = 3000;

//librerías en uso
app.use(bodyParsed.json()); //no olvidar usar el parseador porque si no, no se va a visualizar los datos.

//rutas hacia las funciones contenidas en la const booksController ubicada en el file books
app.get('/books', booksController.readBooks); //misma ruta para todas las funciones
app.post('/books', booksController.createBooks); 
app.get('/books'), booksController.readOneBook;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//Recuerda: en este archivo index sólo debe haber rutas hacia controladores.