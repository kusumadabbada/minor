const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// List all books
router.get('/', booksController.index);

// Add a book
router.post('/', booksController.create);

// Edit a book
router.get('/:id/edit', booksController.edit);

// Update a book
router.put('/:id', booksController.update);

// Delete a book
router.delete('/:name', booksController.delete);



module.exports = router;
