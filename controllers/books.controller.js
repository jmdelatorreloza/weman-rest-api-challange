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
  }
};

module.exports = BooksController;