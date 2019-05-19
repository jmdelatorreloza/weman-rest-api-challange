const express = require('express')
const bodyParser = require ('body-parser')
const jwt = require('jsonwebtoken');
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const AuthController = require('./controllers/auth.controller');
const AuthMidleware = require('./middlewares/auth.midleware');

app.use(bodyParser.json());

app.post('/auth/signin', AuthController.signIn);

app.use(AuthMidleware.authmidleware)

app.get('/books', booksController.readBooks);
app.post('/books', booksController.createbooks);
app.post('/books/Read1book', booksController.Read1book);
app.put('/books/patch', booksController.actualizarlibro)
app.patch('/books/put', booksController.borrarunlibro);
app.delete('/books/atentificar', booksController.borrarunlibro);



app.listen(port, () => console.log(`Example app listening on port ${port}!`))