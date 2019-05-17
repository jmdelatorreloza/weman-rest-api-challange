const BookModel = require('../models/books.model');

//leer un libro
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

// Crear un libro
createbooks: (req, res) => {
console.log(req.body)
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
  .then( data => {
      res.status(200).send({data: data}).end();
  })
  .catch( err => {
    // codigo para cuando falla la creacion del libro o la peticion a la base de datos
    res.status(500).send({message: err});    
  })
    }else {
      res.status(400).send({mensaje: "ingresa título, autor y página"});
     }
    },


// Leer un solo libro
Read1book: (req, res) => {
  let id = req.body.id;
BookModel
  .findOne({_id: id})
  .then( data => {
    if(data) {
      // codigo para cuando encontramos el libro
      res.status(201).send({data: data}).end();
    } else {
      // codigo para cuando no encontramos el libro
      res.status(500).send({message: err});    
    }
  })
  .catch( err => {
    // codigo por si falla la peticion a la base de datos
    res.status(400).send({mensaje: "not done, ingrea id"});
  });
},

//endpoint para sobre escribir libros (actualizar)
actualizarlibro: (req, res) => {
  const title = req.body.title; 
  const author = req.body.author; 
  const pageNumber = req.body.pageNumber;  
  const id = req.body.id;
BookModel
.findOneAndUpdate({_id: id}, {
  title,
  author,
  pageNumber
})
.then( data => {
  // codigo para cuando se actualiza el libro
  res.status(200).send({data: data}).end();
})
.catch( err => {
  // codigo por si falla la peticion a la base de datos
  res.status(400).send({mensaje: "No se actualizó"});
})
}

};



module.exports = BooksController;
