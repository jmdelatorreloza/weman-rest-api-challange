const express = require('express')
const bodyParser = require ('body-parser')
const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');


app.use(bodyParser());

app.get('/books', booksController.readBooks);
app.post('/books', booksController.createbooks);
app.post('/books/Read1book', booksController.Read1book);
app.patch('/books/patch', booksController.actualizarlibro)
app.put('/books/put', booksController.borrarunlibro);




app.listen(port, () => console.log(`Example app listening on port ${port}!`))