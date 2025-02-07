// Import Required Modules
const express = require('express')

// Import Required Functions from Book Controllers
const { getAllBooks, getBookbyId, createBook, updateBook, deleteBook } = require('../controllers/bookRouteController')

// Initialize Router
const router = express.Router()

// Route - Get All Books
router.get('/', getAllBooks)

// Route - Get Book by Id
router.get('/:id', getBookbyId)

// Route - Create a new book
router.post('/', createBook)

// Route - Update a book by ID
router.put('/:id', updateBook)

// Route - Delete a book by ID
router.delete('/:id', deleteBook)

module.exports = router