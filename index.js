const express = require('express');
const app = express();
const db = require('./db');
const booksController = require('./controllers/books.controller');
const bodyParsed = require('body-parser');
const port = 3000;

app.use(bodyParsed()); //no olvidar usar el parseador porque si no, no se va a visualizar los datos.

app.get('/books', booksController.readBooks); 
app.post('/books', booksController.createBooks); //misma ruta

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//Recuerda: en este archivo index sólo debe haber rutas hacia controladores.