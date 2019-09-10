const Joi = require('joi');
const pedidoService = require('../service/pedidoService')


class PedidoController {

    create(req, res) {
        let data = req.body;
        this._validate(req, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send('Dados inconsistentes ao tentar criar um novo pedido.')
            } else {
                pedidoService.create(data)
                    .then(result => {
                        if (!result || result.status === 404){
                            res.status(result.status).send(result.error)
                        } else if (result.status === 409) {
                            res.status(result.status).send(result.error)
                        } else if (result.status === 500) {
                            res.status(result.status).send('Erro inesperado.\n' + result.error)
                        } else {
                            res.status(201).send(result)
                        }
                    })
            }
        })
    }


    findAll(req, res) {
        pedidoService.findAll()
            .then(result => {
                if (result.length === 0) {
                    res.status(404).send('Não foram encontrados pedidos.')
                } else if (!result || result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(200).json(result)
                }
            })
    }


    // find(req, res) {
    //     let id = req.params.id;
    //     pedidoService.find(id)
    //         .then(result => {
    //             if (!result) {
    //                 res.status(404).send('O pedido especificado não foi encontrado.')
    //             } else if (result.status === 500) {
    //                 res.status(500).send('Erro inesperado.\n' + result.error)
    //             } else {
    //                 res.status(200).json(result)
    //             }
    //         })
    // }

    // findByCodigo(req, res) {
    //     let pedido = req.params.pedido
    //     pedidoService.findByPedido(pedido)
    //         .then(result => {
    //             if(!result){
    //                 res.status(404).send('O pedido especificado não foi encontrado.')
    //             } else if (result.status === 500) {
    //                 res.status(result.status).send('Erro inesperado.\n' + result.error)
    //             } else {
    //                 res.status(200).json(result)
    //             } 
    //         })
    // }

    // update(req, res) {
    //     let data = req.body
    //     data.id = req.params.id
    //     this._validate(req, (err, result) => {
    //         if (err || !data.id) {
    //             res.status(400).send('Dados inconsistentes ao tentar atualizar um pedido.')
    //         } else {
    //             pedidoService.update(data)
    //                 .then(result => {
    //                     if (!result) {
    //                         res.status(404).send('Pedido não encontrado.')
    //                     } else if (result.status === 400) {
    //                         res.status(result.status).send(result.error)
    //                     } else if (result.status === 404) {
    //                         res.status(result.status).send(result.error)
    //                     } else if (result.status === 500) {
    //                         res.status(result.status).send('Erro inesperado.\n' + result.error)
    //                     } else {
    //                         res.status(204).json('Pedido atualizado com sucesso.')
    //                     }
    //                 })
    //         }
    //     })
    // }


    // delete(req, res) {
    //     let id = req.params.id;
    //     if (!id)
    //         res.status(400).send('Dados inconsistentes ao tentar excluir pedido.')

    //     pedidoService.delete(id)
    //         .then(result => {
    //             if (!result || result.status === 404) {
    //                 res.status(404).send('Pedido não encontrado.')
    //             } else if (result.status === 500) {
    //                 res.status(500).send('Erro inesperado.\n' + result.error)
    //             } else {
    //                 res.status(204).send('Pedido excluido com sucesso.')
    //             }
    //         })
    // }



    _validate(req, cb) {
        const schema = Joi.object().keys({
            codigo: Joi.string().required(),
            forma_pagamento: Joi.number().required(),
            clienteId: Joi.number().required(),
            produtos: Joi.array().required()
        });
        Joi.validate({
            codigo: req.body.codigo,
            forma_pagamento: req.body.forma_pagamento,
            clienteId: req.body.clienteId,
            produtos: req.body.produtos
        }, schema, cb)
    }

}

module.exports = new PedidoController();