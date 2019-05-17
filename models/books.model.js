const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const BookSchema = new Schema({
  title: String,
  author: String,
  pageNumber: Number
});

const BookModel = mongoose.model('Book', BookSchema);
module.exports = BookModel;