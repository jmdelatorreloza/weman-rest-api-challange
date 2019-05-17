const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.get('/books', booksController.readBooks);
app.post("/books", booksController.createBooks);
app.get("/book", booksController.readBook);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
