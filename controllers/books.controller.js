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
  createBook: (req, res) => {
    if(req.body.title && req.body.author && req.body.pageNumber) {
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
        res.status(200).send({data: data}).end()
      })
      .catch( err => {
        res.status(500).send({message: "Ya valio"}).end()
      })
    } else {
      res.status(400).send({message: "Manda title, author y pageNumber para crear un libro"});
    }
  },
  readBook: (req, res) => {
    BookModel
    .findOne({_id: req.params.id})
    .then( data => {
      if(data) {
        res.status(200).send({data}).end();
      } else {
        res.status(404).send({message: "No esta ese libro"}).end();
      }
    })
    .catch( err => {
      res.status(500).send({message: "Ya valio maiz"}).end();
    });
  },
  updateBook: (req, res) => {
    if(req.body.title && req.body.author && req.body.pageNumber && req.params.id) {
      const title = req.body.title;
      const author = req.body.author;
      const pageNumber = req.body.pageNumber;
      BookModel
      .findOneAndUpdate({
        _id: req.params.id
      }, {
        title,
        author,
        pageNumber
      })
      .then( data => {
        res.status(200).send({data}).end();
      })
      .catch( err => {
        res.status(500).send({message: "Ya valio maiz"}).end();
      })
    } else {
      res.status(400).send({message: "Manda el ID! y tambien title, author y pageNumber para actualizar un libro"});
    }
  },
  deleteBook: (req, res) => {
    if(req.params.id) {
      BookModel
      .deleteOne({_id: req.params.id})
      .then( data => {
        res.status(200).send({message: "ya lo desapareci"})
      })
      .catch( err => {
        res.status(500).send({message: "valio maizito"}).end();
      });
    } else {
      res.status(400).send({message: "necesitas mandar el ID o te borro todo"})
    }
  }
};

module.exports = BooksController;
