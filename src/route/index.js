const express = require('express')
const router = express.Router()

const pessoaRoute = require('./clienteRoute')

module.exports = (connection) => {
    router

    pessoaRoute

    return router
}