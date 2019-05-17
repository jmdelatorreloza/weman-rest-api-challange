const BookModel = require('../models/books.model');

//leer un libro -----------------------------------------------
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
  //crear un libro ----------------------------------------------------------------------
  createBooks:(req, res)=> {
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
  res.status(201).send({data: data}).end()
  })

.catch( err => {
  res.status(500).send({message: "Datos erroneos"}).end()
})
  }else{
  res.status(404).send({message: "manda title, author y pageNumber para crear un libro"});
    }
  },

// Leer un solo libro------------------------------------------------------------------------------
readAbooks:(req, res){

}
let id =req.query.id
BookModel
.findOne({_id: id})
.then( data => {
  if(data===id) { 
    res.status(200).send({data:data})
    // codigo para cuando encontramos el libro
  } else {
    res.status(404).send({message:"no encontrado"})
    // codigo para cuando no encontramos el libro
  }
}
.catch( err => {
  res.status(500).send({message:" Error"})
  // codigo por si falla la peticion a la base de datos

};
 


module.exports = BooksController;