const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');

app.use(bodyParser());


app.get('/books', booksController.readBooks);

app.post("/books", booksController.createBooks);

app.post('/books/searchbooks', booksController.searchBooks);

app.patch("/books", booksController.backBooks);

app.delete("/books", booksController.deleteBooks);

app.post("/auth/signin", booksController.autentifica);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))