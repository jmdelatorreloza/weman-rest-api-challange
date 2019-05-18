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
      res.status(400).send({ message: "Ingresar Title, Author, pageNumber" }).end()
    }
  },

  // Leer un solo libro
  read2Books: (req, res) => {
    BookModel
      .findOne({ _id: req.params.id })
      .then(data => {
        if (data) {
          // codigo para cuando encontramos el libro
          res.status(200).send({ data: data }).end()
        } else {
          // codigo para cuando no encontramos el libro
          res.status(404).send({ message: "Error, no es posible encontrar el libro" }).end()
        }
      })
      .catch(err => {
        // codigo por si falla la peticion a la base de datos
        res.status(500).send({ message: "Lo sentimos, no fué posible encontrar el libro" }).end()
      });
  },

  replaceBook: (req, res) => {
    if (req.body.title && req.body.author && req.body.pageNumber && req.params.id) {
      const title = req.body.title; 
      const author = req.body.author; 
      const pageNumber = req.body.pageNumber; 
      BookModel
        .findOneAndUpdate({  //https://mongoosejs.com/docs/deprecations.html#-findandmodi fy- msjencmderypostman
          _id: req.params.id
        }, {
            title,
            author,
            pageNumber
          })
        .then(data => {
          res.status(200).send({ data: data }).end()
        })
        .catch(err => {
          res.status(500).send({ message: "sorry, not sorry" }).end()
        })
    } else {
      res.status(400).send({message: "Ingresar ID, Title, Author, pageNumber" }).end()
    }
  }
};


module.exports = BooksController;