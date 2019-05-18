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
    BookModel
    .findOne({_id: req.params.id})
    .then( data => {
      if(data) {
      // codigo para cuando encontramos el libro
        res.status(200).send({data : data}).end();
      } else {
      // codigo para cuando no encontramos el libro
        res.status(404).send({message : "No lo encontramos"}).end();
      }
    })
    .catch( err => {
      // codigo por si falla la peticion a la base de datos
      res.status(500).send({message : "La busqueda no funcionó"}).end();
      });
    }, 

  backBooks: (req, res) => {
    if (req.body.title && req.body.author && req.body.pageNumber && req.params.id) {
      const title = req.body.title;
      const author = req.body.author;
      const pageNumber = req.body.pageNumber;
      BookModel
      .findOneAndUpdate({_id: req.params.id}, 
        {
        title,
        author,
        pageNumber
      })
      .then( data => {
        // codigo para cuando se actualiza el libro
        res.status(200).send({data}).end();
      })
      .catch( err => {
        res.status(500).send({messagge: "Ya valió D:"}).end();
      })
      } else {
        res.status(400).send({message : "Envía todos los datos solicitados"}).end();
      }   
  },

  deleteBooks: (req, res) => {
    if (req.params.id) {
    BookModel
    .deleteOne({_id: req.params.id})
    .then( data => {
      res.status(200).send({message: "Tú libro ha sido eliminado"}).end();
      // codigo para cuando se borra el libro
    })
    .catch( err => {
      res.status(500).send({message: "Ya valió D:"}).end();
      // codigo por si falla la peticion a la base de datos
    });
    } else {
    res.status(400).send({message : "Envía el id"}).end();
    }
  } 
};


module.exports = BooksController;