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
    const author= req.body.title.author;
    const pageNumber = req.body.pageNumber;
    BookModel
      .create({
      title,
      author,
      pageNumber
      })
     .then( data => {
         res.status(200).send({data:data}).end()
     })
    .catch( err => {
        res.status(500).send({message: "Trono la Base de Datos! D:"}).end()
       })
      } else {
         res.status(400).send({message: "Necesitas title, author, y pageNumber para crear un libro"});
      }
    },

readBook: (req, res) => {
BookModel
.findOne({_id: req.params.id })
.then( data => {
  if(data) {
    res.status(200).send({data}).end();
  } else {
    res.status(404).send ({message:"No se encuentra ese libro"}).end();
  }
})
.catch( err => {
  res.status(500).send ({message: "Error en la base de datos"});
});
},


updateBook: (req, res) => {
  if (req.body.title && req.body.author && req.body.pageNumber && req.params.id) {
    const title = req.body.title;
    const author= req.body.title.author;
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
  res.status(200).send ({data}).end();
})
.catch( err => {
  res.status(500).send ({message: "Error en la base de datos"});
})
} else {
      res.status(400).send ({message: "Manda ID, title, author y pageNuber para actualizar un libro"});
   }
 },

eraseBook: (rec, res) =>{
  if(req.params.id) {
  BookModel
  .deletOne ({_id: req.params.id})
  .then (data => {
    res.status(200).send ({message: "ya quedó borrado"})  
  })
  .catch (err=> { 
    res.status(500).send({message: "Hay un error en la base de datos"}).end();
  });
  }else{
    res.status(400).send ({message: "OJO se necesita mandar id o se borrará todo"});
  }


}

};

module.exports = BooksController;