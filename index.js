const express = require('express')
const bodyParser = require("body-parser");
const app = express();
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const autentifica = require('./controllers/autentifica.controller');

app.use(bodyParser.json());


app.get('/books', booksController.readBooks);

app.post("/books", booksController.createBooks);

app.post('/books/searchbooks', booksController.searchBooks);

app.put("/books", booksController.backBooks);

app.delete("/books", booksController.deleteBooks);

app.post("/auth/signin", booksController.autentifica);

app.use(middle)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))