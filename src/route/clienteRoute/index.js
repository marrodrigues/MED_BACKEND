const express = require('express')
const router = express.Router()

const { Pessoa } = require('../../models')

module.exports = () => {
    router

    .get('/clientes', async (req, res) => {
        const pessoas = await Pessoa.findAll()
        res.json(pessoas)
    }) //Listar todos

    return router
}

//Pessoa.create({nome: 'mario', login: 'marrodrigues', senha: 'teste', email: 'm.rodrigues.agr@gmail.com', dataNascimento: new Date(1990, 10, 09)})