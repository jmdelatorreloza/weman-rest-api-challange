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
      const title = req.body.title, author = req.body.author, pageNumber = req.body.pageNumber
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
        res.status(500).send({err:'no se pudo crear libro'})
      })
    }else{
      res.status(400).send({mesage:'Datos incompletos, manda: título, autor y número de páginas'})
    }
  },

  read1Book: (req, res)=>{
    BookModel
    .findOne({_id: req.params.id})
    .then( data => {
      if(data) {
        // codigo para cuando encontramos el libro
        res.status(200).send({data}).end
      } else {
        // codigo para cuando no encontramos el libro
        res.status(404).send({mesage:'ese libro no existe'})
      }
    })
    .catch( err => {
      res.status(500).send({mesage: 'error fatal'}).end()
      // codigo por si falla la peticion a la base de datos
    });
  },
  overwriteBook:(req, res)=>{
    if (req.body.title&&req.body.author&&req.body.pageNumber&&req.params.id){
      const title = req.body.title, author = req.body.author, pageNumber = req.body.pageNumber
      let id = req.params.id
      BookModel
      .findOneAndUpdate({
        _id:id
      },
      {
        title,
        author,
        pageNumber
      })
      .then( data => {
        // codigo para cuando se crea el libro
        res.status(200).send({mesage:'libro actualizado'})
      })
      .catch( err => {
        // codigo para cuando falla la creacion del libro o la peticion a la base de datos
        res.status(500).send({err:'no se pudo actualizar el libro'})
      })
    }else{
      res.status(404).send({mesage:'Datos incompletos, manda: título, autor, número de páginas y ID'})
    }
  },

  deleteBook: (req, res)=>{
    if (req.params.id){
      BookModel
      .deleteOne({_id: req.params.id})
      .then( data => {
        // codigo para cuando se borra el libro
        res.status(200).send({mesage:'libro eliminado'})
      })
      .catch( err => {
        // codigo por si falla la peticion a la base de datos
        res.status(500).send({err:'No se pudo borrar el libro'})
      });
    }else{
      res.status(400).send({mesage:'Para eliminar debes poner el ID del libro'})
    }
    }
};

module.exports = BooksController;
