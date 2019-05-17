const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
const bodyParser = require ('body-parser');
const cookieParser = require('cookie-parser');
const booksController = require('./controllers/books.controller');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser());
app.get('/books', booksController.readBooks);
app.post('/books', booksController.createBook);
app.get('/books/findBook', booksController.readABook);
app.put('/books', booksController.updateBook);
app.delete('/books', booksController.deleteBook);
app.post('books/auth', booksController.authBook);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))