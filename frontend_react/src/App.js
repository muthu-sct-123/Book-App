// Import Required Modules & Stylesheet
import React, { useEffect } from 'react'
import './css/basic_style.css'

// Import Components - HTML Interfaces 
import Header from './components/Header'
import Pagination from './components/Pagination'
import AddEditBook from './components/AddEditBook'
import BookDisplay from './components/BookDisplay'

// Import Context - Global Declaration of Variables & Functions
import { AppContextProvider, useAppContext } from './context/AppContext'

// Create App Component
const App = () => {
  const { fetchBooks, status } = useAppContext()

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  return (
    <div className="container">
      <Header status={status} />
      <AddEditBook />
      <Pagination />
      <BookDisplay />
    </div>
  )
}

// Create Root Component encapsulating App Component within AppContext
export const Root = () => (
  <AppContextProvider>
    <App />
  </AppContextProvider>
)

export default Root