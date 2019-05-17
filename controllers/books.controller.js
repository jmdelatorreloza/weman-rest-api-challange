const BookModel = require('../models/books.model');
var privateKey = "pingüinos";
var jwt = require("jsonwebtoken");


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
    }, 

  backBooks: (req, res) => {
    if(!(req.body.title && req.body.author && req.body.pageNumber && req.body.id)) {
      res.status(400).send({error: "Ingresa todos los datos"})
      } else {
      const title = req.body.title;
      const author = req.body.author;
      const pageNumber = req.body.pageNumber;
      const id = req.body.id;
      BookModel
      .findOneAndUpdate({_id: id}, 
        {
        title,
        author,
        pageNumber
      })
      .then( data => {
        // codigo para cuando se actualiza el libro
        res.status(201).send({data : data}).end()
      })
      .catch( err => {
        res.status(500).send({messagge: "Ya valió D:"})
      })
      }    
  },

  deleteBooks: (req, res) => {
    let id = req.body.id;
    BookModel
    .deleteOne({_id: id})
    .then( data => {
      res.status(200).send({message: "Tú libro ha sido eliminado"});
      // codigo para cuando se borra el libro
    })
    .catch( err => {
      res.status(500).send({message: "Ya valió D:"});
      // codigo por si falla la peticion a la base de datos
    });
  },

  autentifica: (req, res) => {
     if (!(req.body.user && req.body.pass)){
        res.status(400).send("se necesita usuario y contraseña")
    }
    jwt.sign({ user: req.body.user, theme: 'black' }, privateKey, function(err, token) {
        if(err) {
          res.send(500).end();
        } else {
          res.status(200).send({token: token})
        }
      });
  },

  };


module.exports = BooksController;