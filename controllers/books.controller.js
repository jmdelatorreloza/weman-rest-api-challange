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

  createBooks: (req, res) => {
    if (req.body.title && req.body.author && req.body.pageNumber) {
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
          res.status(200).send({ data: data }).end()
        })
        .catch(err => {
          res.status(500).send({ message: "Lo sentimos, no lo tenemos" }).end()
        });

    } else {
      res.status(400).send({ message: "Manda Libro, Autor, Numero de Página crear libro" }).end()
    }
  },

  // Leer un solo libro

  read2Books: (req, res) => {
    let id = ""
    BookModel
      .findOne({ _id: id })
      .then(data => {
        if (data) {
          // codigo para cuando encontramos el libro
          res.status(200).send({_id: id }).end()
        } else {
          // codigo para cuando no encontramos el libro
          res.status(500).send({ message: "No es posible encontrar el libro" }).end()
        }
      })
      .catch(err => {
        // codigo por si falla la peticion a la base de datos
        res.status(400).send({ message: "Lo sentimos, no fué posible encontrar el libro" })
      });

  }

}

module.exports = BooksController;