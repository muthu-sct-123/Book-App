// Import Required Modules
const dotenv = require('dotenv')

dotenv.config()

// Import the Book Model
const Books = require('../models/bookModel')

// Get All Books (with Limit & Offset)
getAllBooks = async (req, res) => {
    const page = parseInt(req.query.page) || 1 // Default to page 1
    const limit = parseInt(req.query.limit) || 5 // Default to 5 records per page
    const offset = (page - 1) * limit

    try {
        const totalBooks = await Books.getDBBookCount() // Total number of books in the database
        const books = await Books.getDBBookList(limit, offset)
        res.status(200).json({
            books,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: page
        })
    } catch (err) {
        console.error('Error fetching books: ', error)
        res.status(500).json({ error: 'Failed to fetch books!'})
    }
}

// Get Book by Id - Edit Book
getBookbyId = async (req, res) => {
    try {
        const book = await Books.getDBBookbyId(req.params.id)
        if (!book) return res.status(404).json({ error: 'Book not found.' })
        res.status(200).json(book)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch the book!'})
    }
}

// Get Form Inputs - Insert Book
createBook = async (req, res) => {
    const { title, author, year } = req.body
    try {
        const result = await Books.insertDBBook(title, author, year)
        if(result) {
            res.status(200).json({ success: 'Book Inserted Successfully' })
        } else {
            res.status(500).json({ error: 'Book Insertion Failed!' })    
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to insert book!' })
    }
}

// Get Form Inputs - Update Book
updateBook = async (req, res) => {
    const { title, author, year } = req.body
    try {
        const result = await Books.updateDBBook(title, author, year, req.params.id)
        if(result) {
            res.status(200).json({ success: 'Book Updated Successfully' })
        } else {
            res.status(500).json({ error: 'Book Updation Failed!' })    
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update book!' })
    }
}

// Get Book Id - Delete Book
deleteBook = async (req, res) => {
    try {
        const result = await Books.deleteDBBook(req.params.id)
        if(result) {
            res.status(200).json({ success: 'Book Deleted Successfully' })
        } else {
            res.status(500).json({ error: 'Book Deletion Failed!' })    
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete book!' })
    }
}

module.exports = { getAllBooks, getBookbyId, createBook, updateBook, deleteBook }