const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const db = require('./db');
const booksController = require('./controllers/books.controller');
const authController = require('./controllers/authentication.controller');
const authorizationMiddleware = require('./middlewares/token.middleware');


app.use(bodyParser.json());

app.post('/auth/signin', authController.authenticate);

// Primer middleware (para verificar que sea un usuario) y tenga acceso solo a read Books y readOne book 
// Para lo demas se necesita acceso de admin.
app.use(authorizationMiddleware.authMiddleware);

app.get('/books', booksController.readBooks);
app.get('/books/:id', booksController.readOneBook);

// Segundo middleware : verifica que sea admin (solo los admin tienen acceso a create, update y delete)
// por eso se puso en esta posicion  
app.use(authorizationMiddleware.admin);

app.post('/books', booksController.createBook);
app.put('/books/:id', booksController.updateBook);
app.delete('/books/:id', booksController.deleteBook);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))   