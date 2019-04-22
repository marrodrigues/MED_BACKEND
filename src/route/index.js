const express = require('express')
const router = express.Router()

module.exports = (connection) => {
    router

    .get('/', (req, res) => {
        connection.query('select * from test', (err, rows, fields) => {
            if(err){
                console.log(`Error: ${err}`)
                throw err
            }
            res.status(200).send(rows)
        })

    })

    return router
}