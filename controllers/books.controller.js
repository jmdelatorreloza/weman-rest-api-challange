const BookModel = require('../models/books.model');


const BooksController = {
  readBooks: (req, res) => {
    BookModel
      .find()
      .then(data => {
        if (data.length === 0) {
          res.status(404).send({ message: "Todavia no hay libros!" });
        } else {
          res.status(200).send(data);
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Trono la Base de Datos! D:" });
      })
  },

  // Crear un libro
  createBook: (req, res) => {
    if (!(req.body.title && req.body.author && req.body.pageNumber)) {
      res.status(400).send({ Error: ' El usuario no se agrego! , Intentalo de nuevo ( Revisa los nombres )' });
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
          res.status(201).send({ data: data }).end();
        })
        .catch(err => {
          res.status(500).send({ message: "Trono la Base de Datos o la creación del libro! D:" });
        })

    }
  }

  

}
module.exports = BooksController;