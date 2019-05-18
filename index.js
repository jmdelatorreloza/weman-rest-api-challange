const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const authController = require('./controllers/auth.controller');

//Agregar Const bodyParser
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.post('/auth/signin' , authController.signIn);

app.get('/books', booksController.readBooks);

//crear el port para createBook
app.post('/books', booksController.createBook);

app.post('/books/buscar', booksController.readOneBook);
app.put('/books/:id', booksController.updateBook);
app.delete('/books/:id', booksController.deleteBook);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))