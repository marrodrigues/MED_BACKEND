const Joi = require('joi');
const loteService = require('../service/loteService')


class LoteController {

    create(req, res) {
        let data = req.body;
        this._validate(req, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send('Dados inconsistentes ao tentar criar um novo lote.')
            } else {
                loteService.create(data)
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
        loteService.findAll()
            .then(result => {
                if (result.length === 0) {
                    res.status(404).send('Não foram encontrados lotes.')
                } else if (!result || result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(200).json(result)
                }
            })
    }


    find(req, res) {
        let id = req.params.id;
        loteService.find(id)
            .then(result => {
                if (!result) {
                    res.status(404).send('O lote especificado não foi encontrado.')
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(200).json(result)
                }
            })
    }

    findByLote(req, res) {
        let lote = req.params.lote
        loteService.findByLote(lote)
            .then(result => {
                if(!result){
                    res.status(404).send('O lote especificado não foi encontrado.')
                } else if (result.status === 500) {
                    res.status(result.status).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(200).json(result)
                } 
            })
    }

    update(req, res) {
        let data = req.body
        data.id = req.params.id
        this._validate(req, (err, result) => {
            if (err || !data.id) {
                res.status(400).send('Dados inconsistentes ao tentar atualizar um lote.')
            } else {
                loteService.update(data)
                    .then(result => {
                        if (!result) {
                            res.status(404).send('Lote não encontrado.')
                        } else if (result.status === 400) {
                            res.status(result.status).send(result.error)
                        } else if (result.status === 404) {
                            res.status(result.status).send(result.error)
                        } else if (result.status === 500) {
                            res.status(result.status).send('Erro inesperado.\n' + result.error)
                        } else {
                            res.status(204).json('Lote atualizado com sucesso.')
                        }
                    })
            }
        })
    }


    delete(req, res) {
        let id = req.params.id;
        if (!id)
            res.status(400).send('Dados inconsistentes ao tentar excluir lote.')

        loteService.delete(id)
            .then(result => {
                if (!result || result.status === 404) {
                    res.status(404).send('Lote não encontrado.')
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(204).send('Lote excluido com sucesso.')
                }
            })
    }



    _validate(req, cb) {
        const schema = Joi.object().keys({
            lote: Joi.string().required(),
            qtd: Joi.number().required(),
            validade: Joi.date().required(),
            valor_unitario: Joi.number().required()
        });
        Joi.validate({
            lote: req.body.lote,
            qtd: req.body.qtd,
            validade: req.body.validade,
            valor_unitario: req.body.valor_unitario
        }, schema, cb)
    }

}

module.exports = new LoteController();