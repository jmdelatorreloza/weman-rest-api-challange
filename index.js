const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const bodyParser = require('body-parser')


app.use(bodyParser());
app.get('/books', booksController.readBooks);
app.get('/books', booksController.readBook);
app.post('/book', booksController.createbook);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))