const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
const bodyParser = require('body-parser');
const booksController = require('./controllers/books.controller');
const authController = require('./controllers/auth.controller');
const authMiddleware = require('./middlewares/auth.middleware');

app.use(bodyParser.json());


app.post('/auth/singin', authController.authBook);
app.use(authMiddleware.authMiddleware);
app.use(authMiddleware.checkAdmin);
app.get('/books', booksController.readBooks);
app.get('/books/findBook/:id', booksController.readABook);
app.post('/books', booksController.createBook);
app.put('/books/:id', booksController.updateBook);
app.delete('/books/:id', booksController.deleteBook);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))