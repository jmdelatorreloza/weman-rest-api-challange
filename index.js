const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const authController = require('./controllers/authentication.controller');

app.use(bodyParser.json());

app.get('/books', booksController.readBooks);
app.post('/books', booksController.createBook);
app.get('/books/find', booksController.readOneBook);
app.put('/books', booksController.updateBook);
app.delete('/books', booksController.deleteBook);
app.post('/auth', authController.authenticate);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))   