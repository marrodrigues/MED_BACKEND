const express = require('express')
const router = express.Router()

const clienteController = require('../controller/clienteController')
const funcionarioController = require('../controller/funcionarioController')
const loginController = require('../controller/loginController')
const pessoaController = require('../controller/pessoaController')
const loteController = require('../controller/loteController')
const insumoController = require('../controller/insumoController')
const produtoController = require('../controller/produtoController')
const pedidoController = require('../controller/pedidoController')

module.exports = (jwtOptions, passport) => {
    router

    //START HEROKU
        .get('/', (req, res) => {
            res.status(200).json({ status: 'MED API está online!', time: new Date() });
        })
        .get('/mario', (req, res) => 
        loteController.mario(req,res))
        // LOGIN
        .post('/login', (req, res) => loginController.login(req, res, jwtOptions))
        .get('/logout', (req, res) => { res.status(200).send({ auth: false, token: null }) })
        //PESSOA
        .get('/pessoas/cpf/:cpf', (req, res) => pessoaController.findByCPF(req, res))
        .get('/pessoas/email/:email', (req, res) => pessoaController.findByEmail(req, res))
        .get('/pessoas/login/:login', (req, res) => pessoaController.findByLogin(req, res))
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
        .get('/lotes/lote/:lote', passport.authenticate('jwt', { session: false }), (req, res) => loteController.findByLote(req, res))
        .post('/lotes', passport.authenticate('jwt', { session: false }), (req, res) => loteController.create(req, res))
        .put('/lotes/:id', passport.authenticate('jwt', { session: false }), (req, res) => loteController.update(req, res))
        .delete('/lotes/:id', passport.authenticate('jwt', { session: false }), (req, res) => loteController.delete(req, res))
        //INSUMOS
        .get('/insumos', passport.authenticate('jwt', { session: false }), (req, res) => insumoController.findAll(req, res))
        .get('/insumos/:id', passport.authenticate('jwt', { session: false }), (req, res) => insumoController.find(req, res))
        .get('/insumos/descricao/:descricao', passport.authenticate('jwt', { session: false }), (req, res) => insumoController.findByDescricao(req, res))
        .post('/insumos', passport.authenticate('jwt', { session: false }), (req, res) => insumoController.create(req, res))
        .put('/insumos/:id', passport.authenticate('jwt', { session: false }), (req, res) => insumoController.update(req, res))
        .delete('/insumos/:id', passport.authenticate('jwt', { session: false }), (req, res) => insumoController.delete(req, res))
        //PRODUTOS
        .get('/produtos', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.findAll(req, res))
        .get('/produtos/:id', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.find(req, res))
        .get('/produtos/nome/:nome', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.findByNome(req, res))
        .get('/produtos/nome/:nome/tamanho/:tamanho', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.findByNome(req, res))
        .post('/produtos', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.create(req, res))
        .put('/produtos/:id', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.update(req, res))
        .delete('/produtos/:id', passport.authenticate('jwt', { session: false }), (req, res) => produtoController.delete(req, res))
        //PEDIDOS
        // .get('/pedidos', passport.authenticate('jwt', { session: false }), (req, res) => pedidoController.findAll(req, res))
        // .get('/pedidos/:id', passport.authenticate('jwt', { session: false }), (req, res) => pedidoController.find(req, res))
        // .get('/pedidos/codigo/:codigo', passport.authenticate('jwt', { session: false }), (req, res) => pedidoController.findByCodigo(req, res))
        .post('/pedidos', passport.authenticate('jwt', { session: false }), (req, res) => pedidoController.create(req, res))
        // .put('/pedidos/:id', passport.authenticate('jwt', { session: false }), (req, res) => pedidoController.update(req, res))
        // .delete('/pedidos/:id', passport.authenticate('jwt', { session: false }), (req, res) => pedidoController.delete(req, res))

    return router
}