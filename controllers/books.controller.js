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
  }
};
        

module.exports = BooksController;