const Book = require('../models/book');

module.exports = {
  // List all books
  index: (req, res) => {
    Book.find()
      .then(books => res.render('books/index', { books }))
      .catch(err => console.log(err));
  },

  // Add a book
 create: (req, res) => {
    const { title, author, genre } = req.body;
    const newBook = new Book({ title, author, genre });
    newBook.save()
      .then(book => res.redirect('/books'))
      .catch(err => console.log(err));
  },

 /* create: (req, res) => {
  const { title, author, genre } = req.body;
  console.log(req.body);
  const book = new Book({ title, author, genre });
  book.save()
    .then(book => res.redirect(`/books/${book.id}`))
    .catch(err => console.log(err));
}*/

  // Edit a book
  edit: (req, res) => {
    const { id } = req.params;
    Book.findById(id)
      .then(book => res.render('books/edit', { book }))
      .catch(err => console.log(err));
  },

  // Update a book
  update: (req, res) => {
    const { id } = req.params;
    const { title, author, genre } = req.body;
    Book.findByIdAndUpdate(id, { title, author, genre }, { new: true })
      .then(book => res.redirect('/books'))
      .catch(err => console.log(err));
  },

  // Delete a book
  delete: (req, res) => {
    const { id } = req.params;
    Book.findByIdAndDelete(id)
      .then(book => res.redirect('/books'))
      .catch(err => console.log(err));
  }

  // Delete a book by name
/*delete: async (req, res) => {
   try {
    const { title } = req.body;
    console.log(title);
    const book = await Book.findOne({ title });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await Book.findByIdAndDelete(book._id);
    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}*/

};
