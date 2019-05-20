const Joi = require('joi');
const funcionarioService = require('../../service/funcionarioService')


class FuncionarioController {

    create(req, res) {
        let data = req.body;
        this._validate(req, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).send('Dados inconsistentes ao tentar criar um novo funcionário.')
            } else {
                funcionarioService.create(data)
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
        funcionarioService.findAll()
            .then(result => {
                if (result.length === 0) {
                    res.status(404).send('Não foram encontrados funcionários.')
                } else if (!result || result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(200).json(result)
                }
            })
    }


    find(req, res) {
        let id = req.params.id;
        funcionarioService.find(id)
            .then(result => {
                if (!result) {
                    res.status(404).send('O funcionário especificado não foi encontrado.')
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
                res.status(400).send('Dados inconsistentes ao tentar atualizar um funcionário.')
            } else {
                funcionarioService.update(data)
                    .then(result => {
                        if (!result) {
                            res.status(404).send('Funcionário não encontrado.')
                        } else if (result.status === 500) {
                            res.status(500).send('Erro inesperado.\n' + result.error)
                        } else {
                            res.status(204).send('Funcionário atualizado com sucesso.')
                        }
                    })
            }
        })
    }


    delete(req, res) {
        let id = req.params.id;
        if (!id) {
            res.status(400).send('Dados inconsistentes ao tentar excluir funcionário.')
        }
        funcionarioService.delete(id)
            .then(result => {
                if (!result || result.status === 404) {
                    res.status(404).send(result.error)
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(204).send('Funcionário excluido com sucesso.')
                }
            })
    }



    _validate(req, cb) {
        const schema = Joi.object().keys({
            cargo: Joi.string().required(),
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
            cargo: req.body.cargo,
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

module.exports = new FuncionarioController();