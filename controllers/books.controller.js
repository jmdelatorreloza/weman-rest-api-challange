const BookModel = require('../models/books.model');

const BooksController = {

  //función para ver TODOS los libros ingresados
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
  //descargar el parseador e importarlo en index (require y como use.)
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
        .then(laInfoIngresada => { //nombre formal: data
          res.status(200).send({ data: laInfoIngresada }).end({ message: "Muy bien amigo, creaste un nuevo libro." }) //buscar: como hacer que aparezca este mensaje tambien
      })
      .catch(err => {
          res.status(500).send({ message: "Algo malo pasó y no se pudo crear libro, lo siento." })
          })
    } else {
      res.status(400).send({ message: "Ponga bien los datos: título, autor y número de páginas" })
    }
  },

  //función para buscar UN SOLO libro
  //descargar librería de jsonwebtoken para poder usar los id generados y buscar objetos ingresados, no olvidar require y el app.use en index
  //primero ver que el libro exista en la base de datos:
  readOneBook: (req, res) => {
    let identificador = req.body.identificador;
    BookModel //hace referencia a la base de datos.
    .findOne({_id: identificador})
    .then(laInfoIngresada => {
      if (laInfoIngresada) {
        res.status(200).send({data : laInfoIngresada}).send({message: "Si tenemos el libro."}).end(); //buscar: como hacer que aparezca este mensaje tambien
      } else {
        res.status(400).send({error: "No tenemos el libro que buscas"});
      }
    })
    .catch(err => {
      res.status(500).send({error:"Algo malo pasó y no se pudo buscar el libro, suerte."});
    });
  }
};
//en postman, abrir una nueva ventana (+)
//ubicarte en el body
//cambiar opción a raw (en los radio buttons)
//en el radio button binary, cambiar la opción a JSON(application/json)
//en este body poner {"id": "EL ID QUE NOS ARROJE EN LA PESTAÑA DE POST CUANDO AÑADIMOS UN LIBRO NUEVO"}
//como resultado, nos arrojará todo el objeto
//OJO
//hasta aquí hay un error porque cuando pongo otro id me arroja el mismo resultado en postman

module.exports = BooksController;

//Recordar: en este archivo de controladores, sólo debe haber funciones y cómo importarlas

//http://localhost:3000/books en postman

//Recordar cambiar a la opción BODY en postman y en método POST o GET dependiendo
//(body se referencía en este archivo así: req.body.author, req.boyd.title, etc) 



/* esto para ingresar no sirve
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