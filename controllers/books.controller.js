const BookModel = require('../models/books.model');

const BooksController = {
  readBooks: (req, res) => {
    BookModel
    .find()
    .then( data => {
      if(data.length === 0) {
        res.status(404).send({message: "Todavia no hay libros!"})
      } else {
        res.status(200).send(data)
      }
    })
    .catch( err => {
      res.status(500).send({message: "Trono la Base de Datos! D:"})
    });
  },

  createBooks: (req, res) => {
    if(req.body.title && req.body.author && req.body.pageNumber){
      const title = req.body.title;
      const author = req.body.author;
      const pageNumber = req.body.pageNumber;
      BookModel
      .create({
        title,
        author,
        pageNumber
      })
    .then( data => {
      res.status(201).send({data : data}).end()
    })
    .catch( err => {
      res.status(500).send({messagge: "Ya valió"})
    })
    } else {
      res.status(400).send({messagge: "Está toda la información"})
      }
  },

  searchBooks: (req, res) => {
      let id = req.body.id
      BookModel
      .findOne({_id: id})
      .then( data => {
        if(data) {
          // codigo para cuando encontramos el libro
          res.status(200).send({data : data}).end();
        } else {
          // codigo para cuando no encontramos el libro
          res.status(400).send({message : "No lo encontramos"});
        }
      })
      .catch( err => {
        // codigo por si falla la peticion a la base de datos
        res.status(500).send({error : "La busqueda no funcionó"});
      });
    }
  };


module.exports = BooksController;