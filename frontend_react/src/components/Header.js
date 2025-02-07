// Import Required Modules
import React from 'react'

// Import Context - Global Declaration of Variables & Functions
import { useAppContext } from '../context/AppContext'

// HTML Interface
const Header = () => {
  const { status } = useAppContext()

  return (
    <header>
      <h1>BOOK MANAGEMENT SYSTEM</h1>
      <table className='tableTitle'>
        <tbody>
          <tr>
            <td align='left'>Book List</td>
            <td align='right'>{status}</td>
          </tr>
        </tbody>
      </table>
    </header>
  )
}

export default Header