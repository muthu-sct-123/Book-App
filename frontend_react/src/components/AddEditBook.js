// Import Required Modules
import React from 'react'

// Import Context - Global Declaration of Variables & Functions
import { useAppContext } from '../context/AppContext'

// HTML Interface
const AddEditBook = () => {
    const { form, handleInputChange, handleSubmit, editingBookId } = useAppContext()

    return (
        <table class="tableAddEdit">
        <tr>
            <td>
                <form onSubmit={handleSubmit}>
                    <input name='title' className='inputText' value={form.title} onChange={handleInputChange} placeholder='Title' required />
                    <input name='author' className='inputText' value={form.author} onChange={handleInputChange} placeholder='Author' required />
                    <input name='year' className='inputText' value={form.year} onChange={handleInputChange} placeholder='Year' type='number' required />
                    <button className='buttonAddEdit fontformatAddEdit' type='submit'>{editingBookId ? 'UPDATE' : 'ADD' } BOOK</button>
                </form>
            </td>
        </tr>
        </table>
    )
}

export default AddEditBook