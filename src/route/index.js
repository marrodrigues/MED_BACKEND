const express = require('express')
const router = express.Router()

const clienteController = require('../controller/clienteController')

module.exports = () => {
    router

    .get('/', (req, res) => {
        res.status(200).json({ status: 'MED API está online!', time: new Date() });
    })
    .get('/clientes', (req, res) => clienteController.findAll(req,res))
    .get('/clientes/:id', (req, res) => clienteController.find(req,res))
    .post('/clientes', (req, res) => clienteController.create(req,res))
    .put('/clientes/:id', (req, res) => clienteController.update(req,res))
    .delete('/clientes/:id', (req, res) => clienteController.delete(req,res))

    /*.get('/clientes', async (req, res) => {
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
    }) //Excluir pessoa*/

    return router
}