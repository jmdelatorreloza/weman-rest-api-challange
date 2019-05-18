const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const authController = require('./controllers/auth.controller');
const authMiddleware = require('./middlewares/auth.middlewre')
const jwt= require ('jsonwebtoken');

app.use(bodyParser.json())

app.post('/auth/signin', authController.auth);

app.use(authMiddleware.authMiddleware);

app.get('/books', booksController.readBooks);
app.get('/books/:id', booksController.readOneBook);

app.use(authMiddleware.Admin);

app.post ('/books', booksController.createBook);
app.put('/books/:id', booksController.actualizar);
app.delete('/books', booksController.eraseBook);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))