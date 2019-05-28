const Joi = require('joi');
const clienteService = require('../service/clienteService')


class ClienteController {

    create(req, res) {
        let data = req.body;
        this._validate(req, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send('Dados inconsistentes ao tentar criar um novo cliente.')
            } else {
                clienteService.create(data)
                    .then(result => {
                        if (!result || result.status === 500) {
                            res.status(500).send('Erro inesperado.\n' + result.error)
                        } else {
                            res.status(201).send(result)
                        }
                    })
            }
        })
    }


    findAll(req, res) {
        clienteService.findAll()
            .then(result => {
                if (result.length === 0) {
                    res.status(404).send('Não foram encontrados clientes.')
                } else if (!result || result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(200).json(result)
                }
            })
            .catch(err => res.status(500).send('Busca por clientes negada.\n' + err))
    }


    find(req, res) {
        let id = req.params.id;
        clienteService.find(id)
            .then(result => {
                if (!result) {
                    res.status(404).send('O cliente especificado não foi encontrado.')
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
                res.status(400).send('Dados inconsistentes ao tentar atualizar um cliente.')
            } else {
                clienteService.update(data)
                    .then(result => {
                        if (!result) {
                            res.status(404).send('Cliente não encontrado.')
                        } else if (result.status === 500) {
                            res.status(500).send('Erro inesperado.\n' + result.error)
                        } else {
                            res.status(204).json('Cliente atualizado com sucesso.')
                        }
                    })
            }
        })
    }


    delete(req, res) {
        let id = req.params.id;
        if (!id)
            res.status(400).send('Dados inconsistentes ao tentar excluir cliente.')

        clienteService.delete(id)
            .then(result => {
                if (!result || result.status === 404) {
                    res.status(404).send(result.error)
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(204).send('Cliente excluido com sucesso.')
                }
            })
    }



    _validate(req, cb) {
        const schema = Joi.object().keys({
            cpf: Joi.string().required(),
            nome: Joi.string().required(),
            login: Joi.string().required(),
            email: Joi.string().required(),
            dataNascimento: Joi.date().required(),
            logradouro: Joi.string().required(),
            numero: Joi.string().required(),
            CEP: Joi.string().required(),
            bairro: Joi.string().required(),
            numero_telefone: Joi.string().required(),
            tipo: Joi.string().required()
        });
        Joi.validate({
            cpf: req.body.pessoa.cpf,
            nome: req.body.pessoa.nome,
            login: req.body.pessoa.login,
            email: req.body.pessoa.email,
            dataNascimento: req.body.pessoa.dataNascimento,
            logradouro: req.body.pessoa.endereco[0].logradouro,
            numero: req.body.pessoa.endereco[0].numero,
            CEP: req.body.pessoa.endereco[0].CEP,
            bairro: req.body.pessoa.endereco[0].bairro,
            numero_telefone: req.body.pessoa.telefone[0].numero_telefone,
            tipo: req.body.pessoa.telefone[0].tipo,
        }, schema, cb)
    }

}

module.exports = new ClienteController();