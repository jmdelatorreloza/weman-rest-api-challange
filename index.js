const express = require('express')
const bodyParser= require ('body-parser');
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const authController = require('./controllers/auth.controller');
const authMiddleware = require ('./middlewares/auth.middleware');

app.use(bodyParser.json());
app.use(jwt());

app.post('/auth/signin', authController.signIn);
app.use(authMiddleware.authMiddleware);
app.use(authMiddleware.checkAdmin);

app.get('/books', booksController.readBooks);
app.get('/books/:id', booksController.readBook);
app.post('/books', booksController.createBook);
app.get('/books/:id', booksController.updateBook);
app.get('/books/:id', booksController.deleteBook);




app.listen(port, () => console.log(`Example app listening on port ${port}!`))