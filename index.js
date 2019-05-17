const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const jwt= require ('jsonwebtoken');

app.use(bodyParser())
app.use()

app.get('/books', booksController.readBooks);
app.post ('/books', booksController.createBook);
app.post('/books/buscar', booksController.readOneBook);
app.patch('/books', booksController.actualizar);
app.delete('/books', booksController.eraseBook);
app.post('/auth/signin', booksController.auth);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))