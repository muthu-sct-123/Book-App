// Import DB Connection
const db = require('../config/dbConnection');

// Get DB Book Count
getDBBookCount = function() {
    return new Promise((resolve, reject) => {
        var sql = "SELECT COUNT(*) AS count FROM mbooks WHERE status = '1'"
        db.all(sql, function (err, rows) {
        if (err) throw reject(err)
            let totalBooks = rows[0].count
            return resolve(totalBooks)
        })
    })
}

// Get DB Book List - SELECT Query
getDBBookList = function(limit, offset) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM mbooks WHERE status = '1' ORDER BY id LIMIT ? OFFSET ?"
        db.all(sql, [limit, offset], function(err, results){
            if (err){ 
                return reject(err)
            }
            return resolve(results)
        })
    })
}

// Get DB Book by Id - SELECT Query
getDBBookbyId = function(id) {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM mbooks WHERE id = ? AND status = '1'"
        db.all(sql, [id], function(err, results){
            if (err){ 
                return reject(err)
            }
            return resolve(results)
        })
    })
}

// Insert DB Book - INSERT Query
insertDBBook = async function(title, author, year) {
    var success = 1
    var sql = "INSERT INTO mbooks (title, author, year) VALUES (?, ?, ?)"

    db.run(sql, [title, author, year], (err) => {
        if (err) throw err
    })

    return success
}

// Update DB Book - UPDATE Query
updateDBBook = async function(title, author, year, id) {
    var success = 1
    var sql = "UPDATE mbooks SET title = ?, author = ?, year = ? WHERE id = ?"

    db.run(sql, [title, author, year, id], (err) => {
        if (err) throw err
    })

    return success
}

// Delete DB Book - UPDATE Query
deleteDBBook = async function(id) {
    var success = 1
    var sql = "UPDATE mbooks SET status = '0' WHERE id = ?"

    db.run(sql, [id], (err) => {
        if (err) throw err
    })

    return success
}

module.exports = { getDBBookCount, getDBBookList, getDBBookbyId, insertDBBook, updateDBBook, deleteDBBook }