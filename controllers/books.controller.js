const BookModel = require('../models/books.model');
const bodyParser = require("body-parser");


const BooksController = {
  readBooks: (req, res) => {
    BookModel
    .find()
    .then( data => {
      if (data.length === 0) {
        res.status(404).send({message: "Todavia no hay libros!"});
      } else {
        res.status(200).send(data)
      }
    })
    .catch( err => {
      res.status(500).send({message:"Trono todo en la base de datos :("})
    })
  },
  createBooks: (req, res) => {
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
        res.status(200).send({datos:data}).end();
      })
      .catch( err => {
        res.status(500).send({message:"Uy, ya fue :/"}).end();
      });
    } else {
      res.status(400).send({message:"No se puede, manda Title, author y pageNumber"}).end();
      //console.log(req.body); para revisar que trae el req body
    }
  },
  readBook: (req, res) => {
    let id = req.query.id;
   BookModel
   .findOne({_id: id})
   .then( data => {
     if (data) {
       res.status(200).send({message:"Lo encontramos! :)"}).end();
     } else {
       res.status(400).send({message:"no lo encontramos"}).end();

     }
   })
   .catch( err => {
     res.status(500).send({message:"No sé qué paso, hubo un error :("});
     ;
   })
  }
};



module.exports = BooksController;
