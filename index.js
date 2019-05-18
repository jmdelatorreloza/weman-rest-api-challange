const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 3000
const db = require('./db');
const booksController = require('./controllers/books.controller');
const authController =require('./controllers/auth.controller');
const authMiddleware =require('./middlewares/auth.middleware');



app.use(bodyParser.json());

app.post('/auth/signin', authController.signIn);

app.use('authMiddleware.authMiddleware');

app.get('/books', booksController.readBooks);
app.get('/books/:id', booksController.read2Books);

app.use(authMiddleware.checkAdmin);

app.post('/books', booksController.createBooks);
app.put('/books/:id', booksController.replaceBook);
app.delete('/books/:id', booksController.eliminateBook);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/* error cmder C:\Users\wemenconnect\Documents\weman-rest-api-challange\node_modules\express\lib\application.js:210
    throw new TypeError('app.use() requires a middleware function')*/