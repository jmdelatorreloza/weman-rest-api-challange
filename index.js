const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./db');
const booksController = require('./controllers/books.controller');

app.use(bodyParser.json());

app.get('/books', booksController.readBooks);
app.get('/books', booksController.createBook);
app.get('/books', booksController.read1Book);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
