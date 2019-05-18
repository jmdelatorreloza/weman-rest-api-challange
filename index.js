const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');

app.get('/books', booksController.readBooks);
app.get('/books/:id', booksController.readBook);
app.post('books', booksController.createBook);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))