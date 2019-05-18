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
        // codigo para cuando se crea el libro
        res.status(200).send({data: data}).end()
      })
      .catch( err => {
        // codigo para cuando falla la creacion del libro o la peticion a la base de datos
        res.status(500).send({message: "No pudo crearse tu libro"})
      })
    } else {
      res.status(400).send({message: "Debes escribir título, autor y página para crear tu libro"});
    }  
  },
  readOneBook: (req, res) => {
    let id = req.body.id
    BookModel
    .findOne({_id: id})
    .then(data => {
      if(data) {
        res.status(200).send({data:data}).end();// libro encontrado
      } else {
        res.status(400).send({message: "El libro que buscas no está en nuestro catálogo D:"})//Libro que no existe
      }  
      })
  .catch (err => {
    res.status(500).send({message: "La búsqueda falló"}) // Falló la petición
  });    
  },
  updateBook: (req, res) => {
    if (!(req.body.title && req.body.author && req.body.pageNumber && req.params.id)) {
      const title = req.body.title;
      const author = req.body.author;
      const pageNumber = req.body.pageNumber;
      const id = req.body.id;
      BookModel
        .findOneAndUpdate({
          _id: id
        }, {
          title,
          author,
          pageNumber
        })  
        .then(data => {
          res.status(200).send({ data }).end(); // codigo para cuando se actualiza el libro
        })
        .catch(err => {
          res.status(500).send({ message: "No se puede procesar tu solicitud" }); // codigo por si falla la peticion a la base de datos
        })        
    } else{
      res.status(400).send({message:"Envía el id, el título, autor y número de páginas para actualizar"})
    }
  },
  deleteBook:(req, res) => {
    if(req.params.id) {
        let id = "el id del libro..."
      BookModel
      .deleteOne({_id: req.params.id})
      .then( data => {
        res.status(200).send({message: "listo, se ha eliminado el libro"})
      })
      .catch( err => {
        res.status(500).send({message: err}).end();
      });  
    } else{
      res.status(400).send({message:"debes enviar el id para saber qué libro borrar"})
    }
  }   
};


module.exports = BooksController;