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
                        } else if (result.status === 500) {
                            res.status(500).send('Erro inesperado.\n' + result.error)
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
            qtd: Joi.number().required(),
            // nome: Joi.string().required(),
            // login: Joi.string().required(),
            // senha: Joi.string().required(),
            // email: Joi.string().required(),
            // dataNascimento: Joi.date().required(),
            // logradouro: Joi.string().required(),
            // numero: Joi.string().required(),
            // CEP: Joi.string().required(),
            // bairro: Joi.string().required(),
            // numero_telefone: Joi.string().required(),
            // tipo: Joi.string().required()
        });
        Joi.validate({
            qtd: req.body.qtd,
            // nome: req.body.pessoa.nome,
            // login: req.body.pessoa.login,
            // senha: req.body.pessoa.senha,
            // email: req.body.pessoa.email,
            // dataNascimento: req.body.pessoa.dataNascimento,
            // logradouro: req.body.pessoa.endereco[0].logradouro,
            // numero: req.body.pessoa.endereco[0].numero,
            // CEP: req.body.pessoa.endereco[0].CEP,
            // bairro: req.body.pessoa.endereco[0].bairro,
            // numero_telefone: req.body.pessoa.telefone[0].numero_telefone,
            // tipo: req.body.pessoa.telefone[0].tipo,
        }, schema, cb)
    }

}

module.exports = new LoteController();