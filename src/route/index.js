const express = require('express')
const router = express.Router()

const clienteController = require('../controller/clienteController')
const funcionarioController = require('../controller/funcionarioController')
const loginController = require('../controller/loginController')
const pessoaController = require('../controller/pessoaController')
const loteController = require('../controller/loteController')
const insumoController = require('../controller/insumoController')
// const produtoController = require('../controller/produtoController')
// const pedidoController = require('../controller/pedidoController')

module.exports = (jwtOptions, passport) => {
    router

    //START HEROKU
        .get('/', (req, res) => {
            res.status(200).json({ status: 'MED API está online!', time: new Date() });
        })
        // LOGIN
        .post('/login', (req, res) => loginController.login(req, res, jwtOptions))
        .get('/logout', (req, res) => { res.status(200).send({ auth: false, token: null }) })
        //PESSOA
        .get('/valida/cpf/:cpf', (req, res) => pessoaController.findByCPF(req, res))
        .get('/valida/email/:email', (req, res) => pessoaController.findByEmail(req, res))
        .get('/valida/login/:login', (req, res) => pessoaController.findByLogin(req, res))
        //CLIENTES
        .get('/clientes', passport.authenticate('jwt', { session: false }), (req, res) => clienteController.findAll(req, res))
        .get('/clientes/:id', passport.authenticate('jwt', { session: false }), (req, res) => clienteController.find(req, res))
        .post('/clientes', (req, res) => clienteController.create(req, res))
        .put('/clientes/:id', passport.authenticate('jwt', { session: false }), (req, res) => clienteController.update(req, res))
        .delete('/clientes/:id', passport.authenticate('jwt', { session: false }), (req, res) => clienteController.delete(req, res))
        //FUNCIONARIOS
        .get('/funcionarios', passport.authenticate('jwt', { session: false }), (req, res) => funcionarioController.findAll(req, res))
        .get('/funcionarios/:id', passport.authenticate('jwt', { session: false }), (req, res) => funcionarioController.find(req, res))
        .post('/funcionarios', passport.authenticate('jwt', { session: false }), (req, res) => funcionarioController.create(req, res))
        .put('/funcionarios/:id', passport.authenticate('jwt', { session: false }), (req, res) => funcionarioController.update(req, res))
        .delete('/funcionarios/:id', passport.authenticate('jwt', { session: false }), (req, res) => funcionarioController.delete(req, res))
        //LOTES
        .get('/lotes', passport.authenticate('jwt', { session: false }), (req, res) => loteController.findAll(req, res))
        .get('/lotes/:id', passport.authenticate('jwt', { session: false }), (req, res) => loteController.find(req, res))
        .post('/lotes', passport.authenticate('jwt', { session: false }), (req, res) => loteController.create(req, res))
        .put('/lotes/:id', passport.authenticate('jwt', { session: false }), (req, res) => loteController.update(req, res))
        .delete('/lotes/:id', passport.authenticate('jwt', { session: false }), (req, res) => loteController.delete(req, res))
        //INSUMOS
        .get('/insumos', passport.authenticate('jwt', { session: false }), (req, res) => insumoController.findAll(req, res))
        .get('/insumos/:id', passport.authenticate('jwt', { session: false }), (req, res) => insumoController.find(req, res))
        .post('/insumos', passport.authenticate('jwt', { session: false }), (req, res) => insumoController.create(req, res))
        .put('/insumos/:id', passport.authenticate('jwt', { session: false }), (req, res) => insumoController.update(req, res))
        .delete('/insumos/:id', passport.authenticate('jwt', { session: false }), (req, res) => insumoController.delete(req, res))
        //PRODUTOS
        // .get('/produtos', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.findAll(req, res))
        // .get('/produtos/:id', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.find(req, res))
        // .post('/produtos', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.create(req, res))
        // .put('/produtos/:id', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.update(req, res))
        // .delete('/produtos/:id', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.delete(req, res))
        // //PEDIDOS
        // .get('/pedidos', passport.authenticate('jwt', { session: false }), (req, res) => pedidoController.findAll(req, res))
        // .get('/pedidos/:id', passport.authenticate('jwt', { session: false }), (req, res) => pedidoController.find(req, res))
        // .post('/pedidos', passport.authenticate('jwt', { session: false }), (req, res) => pedidoController.create(req, res))
        // .put('/pedidos/:id', passport.authenticate('jwt', { session: false }), (req, res) => pedidoController.update(req, res))
        // .delete('/pedidos/:id', passport.authenticate('jwt', { session: false }), (req, res) => pedidoController.delete(req, res))


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