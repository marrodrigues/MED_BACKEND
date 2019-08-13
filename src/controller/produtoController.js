const Joi = require('joi');
const produtoService = require('../service/produtoService')


class ProdutoController {

    create(req, res) {
        let data = req.body;
        this._validate(req, (err, result) => {
            if (err) {
                res.status(400).send('Dados inconsistentes ao tentar criar um novo produto.')
            } else {
                produtoService.create(data)
                    .then(result => {
                        if (!result || result.status === 500) {
                            res.status(result.status).send('Erro inesperado.\n' + result.error)
                        } else if (result.status === 400){
                            res.status(result.status).send(result.error)
                        } else if (result.status === 404){
                            res.status(result.status).send(result.error)
                        } else if (result.status === 409) {
                            res.status(result.status).send(result.error)
                        } else {
                            res.status(201).send(result)
                        }
                    })
            }
        })
    }

    findAll(req, res) {
        produtoService.findAll()
            .then(result => {
                if (result.length === 0) {
                    res.status(404).send('Não foram encontrados produtos.')
                } else if (!result || result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(200).json(result)
                }
            })
    }

    find(req, res) {
        let id = req.params.id;
        produtoService.find(id)
            .then(result => {
                if (!result) {
                    res.status(404).send('O produto especificado não foi encontrado.')
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(200).json(result)
                }
            })
    }

    update(req, res) {
        let data = {
            id: req.params.id,
            payload: req.body
        }
        this._validate(req, (err, result) => {
            if (err || !data.id) {
                res.status(400).send('Dados inconsistentes ao tentar atualizar um produto.')
            } else {
                produtoService.update(data)
                    .then(result => {
                        if (!result || result.status === 500) {
                            res.status(result.status).send('Erro inesperado.\n' + result.error)
                        } else if (result.status === 400){
                            res.status(result.status).send(result.error)
                        } else if (result.status === 404){
                            res.status(result.status).send(result.error)
                        } else{
                            res.status(204).json('Produto atualizado com sucesso.')
                        }
                    })
            }
        })
    }

    delete(req, res) {
        let id = req.params.id;
        if (!id)
            res.status(400).send('Dados inconsistentes ao tentar excluir produto.')

        produtoService.delete(id)
            .then(result => {
                if (!result || result.status === 404) {
                    res.status(404).send(result.error)
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(204).send('Produto excluido com sucesso.')
                }
            })
    }

    findByNome(req, res){
        let data = {
            nome: req.params.nome,
            tamanho: req.params.tamanho   
        }
        if(!data.tamanho){
            produtoService.findByNome(data)
                .then(result => {
                    if(!result){
                        res.status(404).send('O produto especificado não foi encontrado.')
                    } else if (result.status === 500) {
                        res.status(result.status).send('Erro inesperado.\n' + result.error)
                    } else {
                        res.status(200).json(result)
                    }
            })
        } else {
            produtoService.findByNomeAndTamanho(data)
                .then(result => {
                    if(!result){
                        res.status(404).send('O produto especificado não foi encontrado.')
                    } else if (result.status === 500) {
                        res.status(result.status).send('Erro inesperado.\n' + result.error)
                    } else {
                        res.status(200).json(result)
                    }
            })
        }
    }

    _validate(req, cb) {
        const schema = Joi.object().keys({
            nome: Joi.string().required(),
            tamanho: Joi.string().required(),
            valor: Joi.number().required(),
            tipo: Joi.number().required()
        });
        Joi.validate({
            nome: req.body.nome,
            tamanho: req.body.tamanho,
            valor: req.body.valor,
            tipo: req.body.tipo
        }, schema, cb)
    }

}

module.exports = new ProdutoController();