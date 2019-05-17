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
        const author = req.body.author;
        const pageNumber = req.body.pageNumber;
        BookModel
        .create ({
          title,
          author,
          pageNumber
        })  
        .then(data => {
          res.status(200).send({data: data}).end();
        })
        .catch(err => {
          res.status(500).send({message: "Morí creando :("})
        })
    } else {
      res.status(400).send({message:"Asegurate de incluir titulo, autor y número de página"})
    }
  },
  readOneBook: (req, res) => {
    let id = req.body.id
    BookModel
    .findOne({_id: id})
    .then(data => {
      if(data) {
        res.status(200).send({data:data}).end();// codigo para cuando encontramos el libro
      } else {
        res.status(400).send({message: "No encontramos el titulo que buscaste </3"})// codigo para cuando no encontramos el libro
      }
    })
  .catch( err => {
    res.status(500).send({message: "Morí leyendo solo un libro :( "})// codigo por si falla la peticion a la base de datos
  });
  },
  actualizar: (req,res) => {
    if (!(req.body.title && req.body.author && req.body.pageNumber && req.body.id)) {
      res.status(400).send({ Error: 'Asegurate de incluir titulo, autor y número de página' });
    } else { 
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
        .then(data => {
          res.status(200).send({ data: data }).end(); // codigo para cuando se actualiza el libro
        })
        .catch(err => {
          res.status(500).send({ message: "Morí actualizando :(" }); // codigo por si falla la peticion a la base de datos
        })
    }
  },
  eraseBook: (req, res) => {
  let id = req.body.id;
  BookModel
  .deleteOne({_id: id})
  .then( data => {
   res.status(200).send({message: "Se ha borrado el libro :)"}); // codigo para cuando se borra el libro
  })
  .catch( err => {
    res.status(500).send({message: "Morí borrando libros u.u"})// codigo por si falla la peticion a la base de datos
  });
}
};

module.exports = BooksController;