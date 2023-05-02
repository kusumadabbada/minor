const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: false, message: 'Title is required.' },
  author: { type: String, required: false, message: 'Author is required.' },
  genre: { type: String, required: false, message: 'Genre is required.' },
});

module.exports = mongoose.model('Book', bookSchema);
