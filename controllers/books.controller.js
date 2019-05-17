const BookModel = require('../models/books.model');

const BooksController = {
  readBooks: (req, res) => {
    BookModel
    .find()
    .then( data => {
      if(data.length === 0) {
        res.status(404).send({message: "Todavia no hay libros"})
      } else {
        res.status(200).send(data)
      }
    })
    .catch( err => {
      res.status(500).send({message: "Error en la base"})
    });
  }, 

// Leer un solo libro
let id = "el id de tu libro, remplazar esto!";
readBook: (req, res) => {
.findOne({_id: id})
.then( data => {
  if(data) {
    res.status(200).send(data)
  } else {
    res.status (400).send ({message: "No encontramos el libro"});
  }
})
.catch( err => {
  res.status(500).send({message: "Error en la base"}).end()
});


//entontrar libro
createBook: (req, res)=> {
	if (req.body.title && req.body.author && req.body.pageNumber){
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
  res.status(200).send({data:data}).end()
})
.catch( err => {
 res.status(500).send({message: "Error en la base"}).end()
})
} else {
	res.status (400).send ({message: "Te falta alguno de estos datos, manda titulo, autor y página"});
   }	
  }
};


// Actualiza un libro
const title = "test", author = "test", pageNumber = "test", id = "id del libro"
BookModel
.findOneAndUpdate({
  _id: id
}, {
  title,
  author,
  pageNumber
})
.then( data => {
  res.status(200).send({data:data}).end()
})
.catch( err => {
  res.status(500).send({message: "Error en la base"}).end()
})

.find()
.then( data => {
  if(data.length === 0) {
    // codigo para cuando no existan libros
  } else {
    // codigo para cuando existan libros
  }
})
.catch( err => {
  res.status(500).send({message: "Error en la base"}).end()
});






module.exports = BooksController;