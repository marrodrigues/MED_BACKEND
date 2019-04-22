const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b32f37f02e16a5',
    password: '3d0f499e',
    database: 'heroku_f1d31755cbdc0e8'
})

module.exports = connection