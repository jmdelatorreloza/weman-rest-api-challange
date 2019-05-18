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
    let id = req.params.id 
    BookModel
    .findOne({_id: id}) //puedes cambiarlo por ({_id: req.params.id}) y eliminar el let de arriba
    .then(data => {
      if(data) {
        res.status(200).send({data:data}).end();// codigo para cuando encontramos el libro
      } else {
        res.status(404).send({message: "No encontramos el titulo que buscaste </3"})// codigo para cuando no encontramos el libro
      }
    })
    .catch( err => {
      res.status(500).send({message: "Morí leyendo solo un libro :( "})// codigo por si falla la peticion a la base de datos
    });
  },
  actualizar: (req,res) => {
    if (req.body.title && req.body.author && req.body.pageNumber && req.params.id) {
      const title = req.body.title;
      const author = req.body.author;
      const pageNumber = req.body.pageNumber;
      BookModel
      .findOneAndUpdate({_id: req.params.id
      }, {
        title,
        author,
        pageNumber  
      })
      .then(data => {
      res.status(200).send({ data: data }).end(); // codigo para cuando se actualiza el libro
      })
      .catch(err => {
        res.status(500).send({ message: "Morí actualizando :(" }).end(); // codigo por si falla la peticion a la base de datos
      })
    } else { 
      res.status(400).send({message: Asegurate de mandar la info completa para actualizar});
    }
  },
  eraseBook: (req, res) => {
    if(req.params.id) {
      let id = req.body.id;
      BookModel
      .deleteOne({_id: id})
      .then( data => {
        res.status(200).send({message: "Se ha borrado el libro :)"}); // codigo para cuando se borra el libro
      })
      .catch( err => {
        res.status(500).send({message: "Morí borrando libros u.u"})// codigo por si falla la peticion a la base de datos
      });
    } else {
      res.status(400).send({message: "Por favor, manda tu Id"})
    }
    
  },
  auth: ('/auth/signin', (req, res) => {
    if (!(req.body.usuario && req.body.palabramagica)){
        res.status(400).send('Ya deja de llegar aqui por favor :(')
    }
    //aqui se debe revisar si un usuario existe en la base de datos
    jwt.sign({user: req.body.usuario, theme: 'black' }, Llave, function(err, token) {
        if(err) {
            res.send(500).end('Noup');
        } else {
            res.status(200).send({token: token})
        }
    })
})
};

module.exports = BooksController;