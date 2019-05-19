const BookModel = require('../models/books.model');

//leer un libro -----------------------------------------------
const BooksController = {
  readBook: (req, res) => {
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
    })
  },
  //crear un libro ----------------------------------------------------------------------
  createBook:(req, res)=> {
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
  res.status(200).send({data: data}).end()
  })

.catch( err => {
  res.status(500).send({message: "Datos erroneos"}).end()
})
  }else{
  res.status(400).send({message: "manda title, author y pageNumber para crear un libro"});
    }
  },

// Leer un solo libro------------------------------------------------------------------------------
readBook:(req, res)=>{
let id = req.params.id
BookModel
.findOne({_id: req.params.id})
.then( data => {
  if(data) { 
    res.status(200).send({data:data}).end();
    // codigo para cuando encontramos el libro
  } else {
    res.status(404).send({message:"no encontrado"})
    // codigo para cuando no encontramos el libro
  }
})
.catch( err => {
  res.status(500).send({message:" Error"}).end();
  // codigo por si falla la peticion a la base de datos

   })

  },

  updateBook:(req, res)=> {
    if(req.body.title && req.body.author && req.body.pageNumber){
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
  res.status(200).send({data: data}).end()
  })

.catch( err => {
  res.status(500).send({message: "Datos erroneos"}).end()
})
  }else{
  res.status(400).send({message: "manda el ID Y title, author y pageNumber para actualizar un libro"});
    }
  },

  daleteBook:(req, res)=> {
    if(req.params.id){
    BookModel
    .deleteOne({_id: req.params.id){
.then( data => {
  res.status(200).send({message:"eliminado"})
  })
.catch( err => {
  res.status(500).send({message: "error"}).end()
})
  } else {
  res.status(400).send({message: "Necesitas mandar id "})
      }
    }
  

module.exports = BooksController;
