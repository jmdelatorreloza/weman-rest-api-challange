const BookModel = require('../models/books.model');


const BooksController = {
  // Leer todos los libros
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
      res.status(400).send({ Error: ' El LIBRO no se agrego!! , Intentalo de nuevo ( Revisa los nombres )' });
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
  },

  // Encontrar y leer un libro
  readOneBook: (req, res) => {
    let id = req.param.id;
    BookModel
      .findOne({ _id: id })
      .then(data => {
        if (data) {
          res.status(200).send({ data: data }).end();
        } else {
          res.status(404).send({ Error: 'No pudimos encontrar el libro, intenta otro ID' });
        }
      })
      .catch(err => {
        res.status(500).send({ Message: "Trono la Base de Datos o la creación del libro! D:" });
      });

  },

  // Sobre escribir un libro
  updateBook: (req, res) => {
    if (!(req.body.title && req.body.author && req.body.pageNumber && req.params.id)) {
      res.status(400).send({ Error: 'Ingresa todos los parametros! Asegurate de tener title,author pageNumber y ID!!!' });
    } else {
      const title = req.body.title;
      const author = req.body.author;
      const pageNumber = req.body.pageNumber;
      const id = req.params.id;
      BookModel
        .findOneAndUpdate({
          _id: id
        }, {
            title,
            author,
            pageNumber
          })
        .then(data => {
          res.status(200).send({ data: data }).end(); //regresa los datos del libro que se esta sobreescribiendo
        })
        .catch(err => {
          res.status(500).send({ message: "Trono la Base de Datos! D:" });
        })
    }
  },

  // Borrar un libro con ID
  deleteBook: (req, res) => {
    if(req.params.id){
    let id = req.params.id;
    BookModel
      .deleteOne({ _id: id })
      .then(data => {
        res.status(200).send({ message: "Libro borrado 4eva & eva!" }); //manda mensaje de borrado y el libro que se borro
      })
      .catch(err => {
        res.status(500).send({ message: "Trono la Base de Datos! D:" });
      });
    }else{
      res.status(400).send({message: "¡Oye! Revisa si mandas ID "})
    }
  }

};
module.exports = BooksController;
