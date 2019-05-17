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
    if (req.body.title && req.body.author && req.body.pageNumber) {
        const title = req.body.title;
        const author = req.body.author;
        const pageNumber = req.body.pageNumber;
        BookModel
        .create ({
          title,
          author,
          pageNumber
        })  
        .then(data => {
          res.status(200).send({data: data}).end();
        })
        .catch(err => {
          res.status(500).send({message: err})
        })
    } else {
      res.status(400).send({message:"Asegurate de incluir titulo, autor y numero de pagina"})
    }
  } 
};

module.exports = BooksController;