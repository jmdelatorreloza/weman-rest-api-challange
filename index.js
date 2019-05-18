const express = require('express')
const bodyParser = require('body-parser');
const jwt = require ('jsonwebtoken');
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const authController =require('./controllers/auth.controller');



app.use(bodyParser.json());

app.post('/auth/signin', authController.signIn);


app.get('/books', booksController.readBooks);
app.get('/books/:id', booksController.read2Books);
app.post('/books', booksController.createBooks);
app.put('/books/:id', booksController.replaceBook);
app.delete('/books/:id', booksController.eliminateBook);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))