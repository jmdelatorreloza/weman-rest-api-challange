const BookModel = require('../models/books.model');

const BooksController = {

  //función para ver TODOS los libros ingresados
  //descargar el parseador e importarlo en index (require y como use.)
  readBooks: (req, res) => {
    BookModel //hace referencia a la base de datos.
      .find()
      .then(data => {
        if (data.length === 0) {
          res.status(404).send({ message: "Todavía no hay libros en la base." })
        } else {
          res.status(200).send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Tronó la Base de Datos! D:" })
      });
  }, //separar funciones adentro de la constante con comas, NO PUNTO Y COMA

  //función para ingresar un libro
  createBooks: (req, res) => {
    if (req.body.title && req.body.author && req.body.pageNumber) {
      const title = req.body.title;
      const author = req.body.author;
      const pageNumber = req.body.pageNumber; //recordar enviar sin comillas en postman xq es número, no string.
      BookModel //hace referencia a la base de datos.
        .create({
          title,
          author,
          pageNumber
        })
        .then(laInfoIngresada => {
          res.status(200).send({ data: laInfoIngresada }).end({ message: "Muy bien amigo, creaste un nuevo libro." })
      })
      .catch(err => {
          res.status(500).send({ message: "Algo malo pasó y no se pudo crear libro, lo siento." })
          })
    } else {
      res.status(400).send({ message: "Ponga bien los datos: título, autor y número de páginas" })
    }
  }

  //función para buscar UN SOLO libro

};

module.exports = BooksController;

//Recordar: en este archivo de controladores, sólo debe haber funciones y cómo importarlas

//http://localhost:3000/books en postman

//Recordar cambiar a la opción BODY en postman y en método POST o GET dependiendo
//(body se referencía en este archivo así: req.body.author, req.boyd.title, etc) 



/* ESTO NO SIRVE
 const title = "test", author = "test", pageNumber = "test"
  createBooks: (req, res) => {
    BookModel
    .create({
      tittle,
      author,
      pageNumber
    })
    .then(data => {
      if(data.lenght === 1) {
        res.status(200).send("Muy bien amigo, añadiste un libro nuevo exitosamente");
      } else {
        res.status(400).send({error: "Amigo, tienes que poner libro, autor y número de páginas, ojo ahí."})
      })
    .catch(err => {
      res.status(500).send({message: "Algo no funcionó, perdón vuelva a iniciar"})
    }
  )}
*/