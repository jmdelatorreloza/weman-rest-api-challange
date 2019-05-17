const BookModel = require('../models/books.model');

const BooksController = {
  readBooks: (req, res) => {
    res.status(200).send({message: "test"}) 
  }
};

module.exports = BooksController;