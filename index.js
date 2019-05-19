const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./db');
const booksController = require('./controllers/books.controller');
const autenController = require('./controlles/auten.Controller');
const autentMiddelware = require('/controllers/autent.Middelware');

app.use(bodyParser.json());

app.post('/autenticar/singin',autenController.singIn);

app.use(autentMiddelware.autentMiddelware);

app.get('/books/:id', booksController.read1Book);
app.get('/books', booksController.readBooks);

app.use(autentMiddelware.checkAdmin);

app.post('/books', booksController.createBook);
app.put('/books/:id', booksController.overwriteBook);
app.delete('/books/:id', booksController.deleteBook);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
