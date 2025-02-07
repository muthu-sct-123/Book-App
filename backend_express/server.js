// Import Required Modules
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

// Import Book Routes
const bookRoutes = require('./routes/bookRoutes')

const app = express()

// Enable CORS for all requests
app.use(cors())

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Link /book-service to get bookRoutes
app.use('/book-service', bookRoutes)

// Start Application with specified port
app.listen(process.env.PORT, () => {
    console.log(`NodeJS Express Server running on port ${process.env.PORT}`)
})