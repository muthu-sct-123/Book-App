// Import Required Modules
import React from 'react'

// Import Context - Global Declaration of Variables & Functions
import { useAppContext } from '../context/AppContext'

// HTML Interface
const Pagination = () => {
  const { currentPage, totalPages, handlePageChange } = useAppContext()

  return (
    <table className='tablePagination'>
        <tbody>
        <tr>
            <td align='left'>
                <span>Page {currentPage} of {totalPages}</span>
            </td>
            <td align='right'>
                <button className={currentPage === 1 ? 'fontpaginationdisabled' : 'fontpagination'} 
                    onClick={() => handlePageChange(currentPage - 1)}>Previous</button> |
                <button className={currentPage === totalPages ? 'fontpaginationdisabled' : 'fontpagination'}
                    onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </td>
        </tr>
        </tbody>
    </table>
  )
}

export default Pagination