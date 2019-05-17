const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');

app.use(bodyParser())

app.get('/books', booksController.readBooks);
app.post ('/books', booksController.createBook);
app.post('/books/buscar', booksController.readOneBook);
app.patch('/books', booksController.actualizar);
app.delete('/books', booksController.eraseBook);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))