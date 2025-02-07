// Import Required Modules
import React, { createContext, useContext, useState, useCallback } from 'react'
import axios from 'axios'

// Create App Context
const AppContext = createContext()

// Create Custom useAppContext to use context
export const useAppContext = () => useContext(AppContext)

// Create Context Provider Component
export const AppContextProvider = ({ children }) => {
    // Declartion of Global Variables
    const [books, setBooks] = useState([])
    const [form, setForm] = useState({ title: '', author: '', year: '' })
    const [editingBookId, setEditingBookId] = useState(null)
    const [status, setStatus] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const limit = 5

    // Function - Fetch Book List (Invoked by App Component)
    const fetchBooks = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5005/book-service?page=${currentPage}&limit=${limit}`)
            setBooks(response.data.books)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.error('Error fetching books: ', error)
        }
    }, [currentPage, limit])

    // Function - Handle Page Change (Invoked by Pagination Component)
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    // Function - Handle Form Input Change (Invoked by AddEditBook Component)
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    // Function - Handle Form Submission (Invoked by AddEditBook Component)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingBookId) {
                const response = await axios.put(`http://localhost:5005/book-service/${editingBookId}`, form)
                setStatus(response.data.success)
            } else {
                const response = await axios.post('http://localhost:5005/book-service', form)
                setStatus(response.data.success)
            }

            fetchBooks()
            setForm({ title: '', author: '', year: '' })
            setEditingBookId(null)
        } catch (error) {
            console.error('Error saving book:', error)
        }
    }

    // Function - Handle Edit Book (Invoked by BookDisplay Component)
    const handleEdit = (book) => {
        setForm(book)
        setEditingBookId(book.id)
    }

    // Function - Handle Delete Book (Invoked by BookDisplay Component)
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5005/book-service/${id}`)
            setStatus(response.data.success)
            fetchBooks()
        } catch (error) {
            console.error('Error deleting book:', error)
        }
    }

    // Return App Context Provider Component
    return (
        <AppContext.Provider
            value={{
                books,
                form,
                editingBookId,
                status,
                currentPage,
                totalPages,
                limit,
                fetchBooks,
                handlePageChange,
                handleInputChange,
                handleSubmit,
                handleEdit,
                handleDelete,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}