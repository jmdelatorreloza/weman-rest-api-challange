const BookModel = require('../models/books.model');


const BooksController = {
  readBooks: (req, res) => {
    BookModel
    .find()
    .then( data => {
      if(data.length === 0) {
        // codigo para cuando no existan libros
        res.status(404).send({mesage:'Lo sentimos, no hay libros, aún'})
      } else {
        // codigo para cuando existan libros
        res.status(200).send({mesage:data})
      }
    })
    .catch( err => {
      // codigo por si falla la peticion a la base de datos
      res.estatus(500).send({mesage:'la base de datos dejó de funcionar'})
    });
  },

  createBook:(req, res)=>{
    if (req.body.title&&req.body.author&&req.body.pageNumber){
      const title = "titulo", author = "autor", pageNumber = "noPages"
      BookModel
      .create({
        title,
        author,
        pageNumber
      })
      .then( data => {
        // codigo para cuando se crea el libro
        res.status(200).send({mesage:'libro creado'})
      })
      .catch( err => {
        // codigo para cuando falla la creacion del libro o la peticion a la base de datos
        res.status(500).send({mesage:'no se pudo crear libro'})
      })
    }else{
      res.status(400).send({mesage:'Datos incompletos, manda: título, autor y número de páginas'})
    }
  },

  read1Book: (req, res)=>{
    let id = "ISBN"
    BookModel
    .findOne({_id: id})
    .then( data => {
      if(id.length === 0) {
        // codigo para cuando encontramos el libro
        res.status(404).send({mesage:'Ese libro no existe'})
      } else {
        // codigo para cuando no encontramos el libro
        res.status(200).send({mesage:id})
      }
    })
    .catch( err => {
      // codigo por si falla la peticion a la base de datos
    });
  },
};

module.exports = BooksController;
