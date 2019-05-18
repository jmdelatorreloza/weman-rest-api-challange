const express = require('express')
const bodyParser = require("body-parser");
const app = express();
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const authController = require('./controllers/auth.controller');
const autentMiddleware = require('./middlewares/auth.middleware');

app.use(bodyParser.json());

app.post("/auth/signin", authController.signIn);

app.use(autentMiddleware.authMiddleware);

app.get('/books', booksController.readBooks);
app.get('/books/searchbooks', booksController.searchBooks);

app.use(autentMiddleware.checkAdmin);

app.post("/books", booksController.createBooks);
app.put("/books", booksController.backBooks);
app.delete("/books", booksController.deleteBooks);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))