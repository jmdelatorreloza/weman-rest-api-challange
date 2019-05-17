const mongoose = require('mongoose');
 
module.exports = mongoose
.connect('mongodb://localhost/weman', {useNewUrlParser: true})
.then(() => {
  console.log('Database connection successful')
})
.catch(err => {
  console.error('Database connection error')
});