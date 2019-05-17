const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');

app.use(bodyParser());

app.get('/books', booksController.readBooks);
app.post('/books', booksController.createBook);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))   