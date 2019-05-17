const BookModel = require('../models/books.model');

const BooksController = {
  readBooks: (req, res) => {
    BookModel
      .find()
      .then(data => {
        if (data.length === 0) {
          res.status(404).send({ message: "Todavia no hay libros!" })
        } else {
          res.status(200).send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Trono la Base de Datos! D:" })
      });

  },

  // Crear un libro
  createBook: (req, res) => {
    if (!(req.body.title && req.body.author && req.body.pageNumber)) {
      res.status(400).send({ message: "Necesitas enviar título, autor y número de página" });
    } else {
      const title = req.body.title;
      const author = req.body.author;
      const pageNumber = req.body.pageNumber;
      BookModel
        .create({
          title,
          author,
          pageNumber
        })
        .then(data => {
          // codigo para cuando se crea el libro
          res.status(200).send({ data: data }).end();

        })
        .catch(err => {
          // codigo para cuando falla la creacion del libro o la peticion a la base de datos
          res.status(500).send({ error: "Falló la creación del libro" });
        })
    }
  },
  readABook: (req, res) => {
    // Leer un solo libro
    let id = req.body.id;
    BookModel
      .findOne({ _id: id })
      .then(data => {
        if (data) {
          // codigo para cuando encontramos el libro
          res.status(200).send({ data: data }).end();
        } else {
          // codigo para cuando no encontramos el libro
          res.status(400).send({ message: "No se encontró" });
        }
      })
      .catch(err => {
        // codigo por si falla la peticion a la base de datos
        res.status(500).send({ error: "Falló la búsqueda" });
      });

  },
  updateBook: (req, res) => {
    if (!(req.body.title && req.body.author && req.body.pageNumber && req.body.id)) {
      res.status(400).send({ message: "Necesitas enviar título, autor y número de página" });
    } else {
      const id = req.body.id;
      const title = req.body.title;
      const author = req.body.author;
      const pageNumber = req.body.pageNumber;
      BookModel
        .findOneAndUpdate({
          _id: id
        }, {
            title,
            author,
            pageNumber
          })
        .then(data => {
          // codigo para cuando se crea el libro
          res.status(200).send({ data: data }).end();

        })
        .catch(err => {
          // codigo para cuando falla la creacion del libro o la peticion a la base de datos
          res.status(500).send({ error: "Falló la creación del libro" });
        })
    }
  },
  deleteBook: (req, res) => {
    // Borrar un libro
    let id = req.body.id;
    if (req.body.id !== id) {
      res.status(400).send({ message: "No se encontró el id" });
    } else {
      BookModel
        .deleteOne({ _id: id })
        .then(data => {
          // codigo para cuando se borra el libro
          res.status(200).send({ data: data }).end();
        })
        .catch(err => {
          // codigo por si falla la peticion a la base de datos
          res.status(500).send({ error: "Falló la creación del libro" });
        });
    }
  },

  authBook: (req, res) => {
    const privateKey = 'llave';
    if (!(req.body.user && req.body.pass)) {
      res.status(400).send('Necesitas introducir usuario y contraseña');
    }
    jwt.sign({ user: request.body.user, theme: 'black' }, privateKey, function (err, token) {
      if (err) {
        res.send(500).end();
      } else {
        res.status(200).send({ token: token })
      }
    });
  }
};

module.exports = BooksController;