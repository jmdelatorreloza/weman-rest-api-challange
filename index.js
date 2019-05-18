const express = require('express')
const bodyParser = require('body-parser');
const jwt = require ('jsonwebtoken');
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const authController = require('./controllers/auth.controller');
const authMiddleware = require('./middlewares/auth.middleware');

app.use (bodyParser.json());

app.post('/auth/signIn', authController.signIn);
app.use(authMiddleware.authMiddleware);


app.get('/books', booksController.readBooks);
app.get('/books/:id', booksController.readBook);

app.use(authMiddleware.checkAdmin);
app.post('/books', booksController.createBook);
app.put('/books/:id', booksController.updateBook);
app.delete('/books/:id', booksController.eraseBook);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));