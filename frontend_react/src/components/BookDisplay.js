// Import Required Modules
import React from 'react';

// Import Context - Global Declaration of Variables & Functions
import { useAppContext } from '../context/AppContext';

// HTML Interface
const BookDisplay = () => {
    const { books, handleEdit, handleDelete, currentPage, limit } = useAppContext();

    return (
        <table className='tableDisplay'>
            <thead>
            <tr>
                <th>S.No.</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {books.length > 0 ? (
                books.map((book, index) => (
                <tr key={book.id}>
                    <td>{(currentPage - 1) * limit + index + 1}.</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.year}</td>
                    <td><button className='fontformatEdit' onClick={() => handleEdit(book)}>&#120124;</button></td>
                    <td><button className='fontformatDelete' onClick={() => handleDelete(book.id)}>&#120123;</button></td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan='6' align='center'>
                        No Records Found
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default BookDisplay;