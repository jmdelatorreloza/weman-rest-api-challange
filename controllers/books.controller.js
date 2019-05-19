const BookModel = require('../models/books.model');

const BooksController = {

  //1_función para ver TODOS los libros ingresados
  readBooks: (req, res) => {
    BookModel //hace referencia a la base de datos vía folder moderls, se ocupa en las 5 funciones de abajo.
      .find()
      .then(data => {
        if (data.length === 0) {
          res.status(404).send({ message: "Todavía no hay libros en la base." })
        } else {
          res.status(200).send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Algo malo pasó, lo siento." })
      });
  }, //separar funciones adentro de la constante con comas, NO PUNTO Y COMA

  //2_función para ingresar un libro
  ponerLibroNuevo: (req, res) => {
    if (req.body.title && req.body.author && req.body.pageNumber) {
      const title = req.body.title;
      const author = req.body.author;
      const pageNumber = req.body.pageNumber; //recordar enviar sin comillas en postman xq es info numérica, no string.
      BookModel
        .create({
          title,
          author,
          pageNumber
        })
        .then(laInfoIngresada => { //nombre formal: data
          res.status(200).send({ data: laInfoIngresada }).end({ message: "Muy bien amigo, creaste un nuevo libro." }) //buscar: como hacer que aparezca este mensaje también
        })
        .catch(err => {
          res.status(500).send({ message: "Algo malo pasó y no se pudo crear libro, lo siento." })
        })
    } else {
      res.status(400).send({ message: "No puedo guardar tu libro porque no pones bien los datos: título, autor y número de páginas, al tiro." })
    }
  },

  //3_función para buscar UN SOLO libro por medio de su id que te arroja el postman
  leerUnLibro: (req, res) => {
    BookModel
      .findOne({ _id: req.params.identificador })//ojo aquí, es req.params.id y NO req.body.id xq el id lo tomamos de lo que el cliente ponga en url, NO en el body como en la función anterior donde efectivamente ingresábamos los datos en el body.
      .then(laInfoIngresada => {//ojo el nombre formal de "identificador" es id
        if (laInfoIngresada) {
          res.status(200).send({ data: laInfoIngresada }).send({ message: "Si tenemos el libro, éxito." }).end(); //buscar: como hacer que aparezca este mensaje tambien
        } else {
          res.status(400).send({ error: "No tenemos el libro que buscas, sorry" });
        }
      })
      .catch(err => {
        res.status(500).send({ error: "Algo malo pasó y no se pudo buscar el libro, lo siento." });
      });
  },
  //en postman, abrir una nueva ventana (+)
  //ubicarte en el body
  //cambiar opción a raw (en los radio buttons)
  //en el radio button binary, cambiar la opción a JSON(application/json) porque son objetos lo que ingresamos
  // ingresar en una pestada diferente a donde dimos post algo así: http://localhost:3000/books/elIDarrojadoPorPostmanCuandoDamosUnPost
  //como resultado, nos arrojará en su body el objeto si está ingresado previamente

  //4_función para cambiar los datos de un libro previamente ingresado, por nuevos valores
  sobreescribirUnLibro: (req, res) => { //nombre formal updateBook
    if (req.body.title && req.body.author && req.body.pageNumber && req.params.id) {
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
        .then(data => {
          res.status(200).send({ data = laInfoIngresada }).end();
        })
        .catch(err => {
          res.status(500).send({ message: "Algo malo pasó y no se pudo sobre escribir un libro, lo siento." }).end();
        })
    } else {
      res.status(400).send({ message: "No puedo actualizar por que no me mandas bien ID o tittle o author o pageNumber" }).end();
    }
  },

  //5_función para borrar un libro por medio de su id
  borrarUnLibro: (req, res) => {
    if (req.params.id) {
      BookModel
        .deleteOne({ _id: req.params.id })
        .then(data => {
          res.status(200).send({ message: "Ya borré el libro, éxito amigo" })
        }) 
        .catch(err => {
          res.status(500).send({ message: "Algo malo pasó y no se pudo borrar el libro, lo siento." }).end();
        });
    } else {
      res.status(400).send({ message: "Manda bien el id or die" })
    }
  }//sin coma por ser la última función de la constante, éxito.
};

module.exports = BooksController;

//Recordar: en este archivo de controladores, sólo debe haber funciones y cómo importarlas

//http://localhost:3000/books en postman

//Recordar cambiar a la opción BODY en postman y en método POST o GET dependiendo
//(body se referencía en este archivo así: req.body.author, req.boyd.title, etc) 