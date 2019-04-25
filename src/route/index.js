const express = require('express')
const router = express.Router()

const clienteController = require('../controller/clienteController')
const loginController = require('../controller/loginController')

module.exports = (jwtOptions, passport) => {
    router

    .get('/', (req, res) => {
        res.status(200).json({ status: 'MED API está online!', time: new Date() });
    })
    
    .get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
        res.send('Parabéns! Se você está vendo isso é porque você está autenticado.')
    })
    .post('/login', (req, res) => loginController.login(req, res))
    .get('/clientes', passport.authenticate('jwt', {session: false}), (req, res) => clienteController.findAll(req,res))
    .get('/clientes/:id', passport.authenticate('jwt', {session: false}), (req, res) => clienteController.find(req,res))
    .post('/clientes', passport.authenticate('jwt', {session: false}), (req, res) => clienteController.create(req,res))
    .put('/clientes/:id', passport.authenticate('jwt', {session: false}), (req, res) => clienteController.update(req,res))
    .delete('/clientes/:id', passport.authenticate('jwt', {session: false}), (req, res) => clienteController.delete(req,res))



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