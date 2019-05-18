const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const authController = require('./controllers/auth.controller');

app.use (bodyParser.json());

app.post('/auth/signIn', authController.signIn);


app.get('/books', booksController.readBooks);
app.get('/books/:id', booksController.readBook);
app.post('/books', booksController.createBook);
app.put('/books/:id', booksController.updateBook);
app.delete('/books/:id', booksController.eraseBook);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))