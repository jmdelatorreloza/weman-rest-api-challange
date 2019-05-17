const BookModel = require('../models/books.model');


// Leer todos los libros
BookModel
.find()
.then( data => {
  if(data.length === 0) {
    // codigo para cuando no existan libros
  } else {
    // codigo para cuando existan libros
  }
})
.catch( err => {
  // codigo por si falla la peticion a la base de datos
});

// Leer un solo libro
let id = "el id de tu libro, remplazar esto!"
BookModel
.findOne({_id: id})
.then( data => {
  if(data) {
    // codigo para cuando encontramos el libro
  } else {
    // codigo para cuando no encontramos el libro
  }
})
.catch( err => {
  // codigo por si falla la peticion a la base de datos
});


// Crear un libro
const title = "test", author = "test", pageNumber = "test"
BookModel
.create({
  title,
  author,
  pageNumber
})
.then( data => {
  // codigo para cuando se crea el libro
})
.catch( err => {
  // codigo para cuando falla la creacion del libro o la peticion a la base de datos
})


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
  // codigo para cuando se actualiza el libro
})
.catch( err => {
  // codigo por si falla la peticion a la base de datos
})


// Borrar un libro
let id = "el id de tu libro, remplazar esto!"
BookModel
.deleteOne({_id: id})
.then( data => {
  // codigo para cuando se borra el libro
})
.catch( err => {
  // codigo por si falla la peticion a la base de datos
});