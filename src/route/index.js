const express = require('express')
const router = express.Router()

const {Pessoa} = require('../models')

module.exports = () => {
    router

    .get('/clientes', async (req, res) => {
        const pessoas = await Pessoa.findAll()
        res.status(200).json(pessoas)
    }) //Listar pessoas

    .post('/clientes', async (req, res) => {
        const response = await Pessoa.create(req.body)
        res.status(201).json(response)
    }) //Criar pessoa

    .get('/clientes/:id', async (req, res) => {
        const pessoa = await Pessoa.findByPk(req.params.id)
        if(!pessoa) res.status(404).json('Cliente não encontrado')
        res.status(200).json(pessoa)
    }) //Buscar pessoa

    .put('/clientes/:id', async (req, res) => {
        await Pessoa.update(req.body, {where:{id: req.params.id} })
        res.status(204).json('Cliente atualizado')
    }) //Atualizar pessoa

    .delete('/clientes/:id', async (req, res) => {
        await Pessoa.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(204).json('Cliente deletado')
    }) //Excluir pessoa

    return router
}