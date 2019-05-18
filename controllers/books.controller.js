const BookModel = require('../models/books.model');

const BooksController = {

  //función para ver TODOS los libros ingresados
  readBooks: (req, res) => {
    BookModel //hace referencia a la base de datos vía folder moderls
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

  //función para buscar UN SOLO libro
  leerUnLibro: (req, res) => {
    BookModel
      .findOne({ _id: req.params.identificador })//ojo aquí, es req.params.id y NO req.body.id xq el id lo tomamos de lo que el cliente ponga en url, NO en el body como en la función anterior donde efectivamente ingresábamos los datos en el body.
      .then(laInfoIngresada => {//ojo el nombre formal de "identificador" (de línea 50 y ('/books/:identificador') de index es id
        if (laInfoIngresada) {
          res.status(200).send({ data: laInfoIngresada }).send({ message: "Si tenemos el libro, éxito." }).end(); //buscar: como hacer que aparezca este mensaje tambien
        } else {
          res.status(400).send({ error: "No tenemos el libro que buscas, sorry" });
        }
      })
      .catch(err => {
        res.status(500).send({ error: "Algo malo pasó y no se pudo buscar el libro, suerte para la próxima" });
      });
  },
  //en postman, abrir una nueva ventana (+)
  //ubicarte en el body
  //cambiar opción a raw (en los radio buttons)
  //en el radio button binary, cambiar la opción a JSON(application/json) xq ingresamos
  // ingresar en una pestada diferente a donde dimos post algo así: http://localhost:3000/books/5cdef059ea57900494d8ec57
  //como resultado, nos arrojará en su body el objeto si está ingresado previamente

  //función para cambiar los datos de un libro previamente ingresado por nuevos valores
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
        .then(laInfoIngresada => {///AQUÍ HAY UN ERROR
          res.status(200).send({ data = laInfoIngresada }).end();
        })
        .catch(err => {
          res.status(500).send({ message: "La vida no vale nada" }).end();
        })
    } else {
      res.status(400).send({ message: "No puedo actualizar por que no me mandas bien ID o tittle o author o pageNumber" }).end();
    }
  },

  //función para borrar un libro
  borrarUnLibro: (req, res) => {
    if (req.params.id) {
      BookModel
        .deleteOne({ _id: req.params.id })
        .then(laInfoIngresada => {
          res.status(200).send({ message: "Ya borré el libro, éxito amigo" })
        ) //AQUÍ HAY OTRO ERROR
        .catch(err => {
          res.status(500).send({ message: "La vida no vale nada 2.0" }).end();
        });
    } else {
      res.status(400).send({ message: "Manda bien el id or die" })
    }
  }
},

  //función para autentificarnos como usuarios
  
  //crear middleware para revisar que token sea válido
  //crear middleware para revisar si un usuario es administrador




};


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