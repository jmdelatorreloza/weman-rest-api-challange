const express = require('express')
const bodyParser = require('body-parser');
const jwt = require ('jsonwebtoken')
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');

let id = []

app.use(bodyParser.json());
app.use(jwt());

app.get('/books', booksController.readBooks);
app.post('/books', booksController.createBooks);
app.post('/books', booksController.rd2Books);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))