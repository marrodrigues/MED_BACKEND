const Joi = require('joi');
const service = require('../../service/clienteService');

class ClienteController {

    create(req, res) {
        let data = req.body;
        this._validate(req, (err, result) => {
            if (err){
                console.log(err)
                res.status(400).send('Dados inconsistentes ao tentar criar um novo cliente.')
            }
            service.create(data)
                .then(data => {
                    res.status(201).send(data)
                })
                .catch(err => res.status(401).send('Criação do novo cliente negada.\n'+ err))
        })
    }


    findAll(req, res) {
        service.findAll()
            .then(data => {
                if (!data)
                    res.status(404).json('Não foram encontrados clientes.')

                res.status(200).json(data)
            })
            .catch(err => res.status(401).send('Busca por clientes negada.\n'))
    }


    find(req, res) {
        let id = req.params.id;
        service.find(id)
            .then(data => {
                if (!data[0])
                    res.status(404).json('O cliente especificado não foi encontrado.')

                res.status(200).json(data[0]);
            })
            .catch(err => res.status(401).send('Busca por cliente negada.'))
    }


    update(req, res) {
        let data = {
            id: req.params.id,
            payload: req.body
        }
        this._validate(req, (err, result) => {
            if (err || !data.id)
                res.status(400).send('Dados inconsistentes ao tentar atualizar um cliente.')

            service.update(data)
                .then(data => {
                    if (!data)
                        res.status(404).json('Cliente não encontrado.')

                    res.status(204).json('Cliente atualizado com sucesso.')
                })
                .catch(err => res.status(401).send('Atualização de cliente negada.'))
        })
    }


    delete(req, res) {
        let id = req.params.id;
        if (!id)
            res.status(400).send('Dados inconsistentes ao tentar excluir cliente.')

        service.delete(id)
            .then(data => {
                if (!data)
                    res.status(404).json('Cliente não encontrado.')

                res.status(204).json('Cliente excluido com sucesso.')
            })
            .catch(err => res.status(401).send('Exclusão de cliente negada.'))
    }



    _validate(req, cb) {
        const schema = Joi.object().keys({
            nome: Joi.string().required(),
            login: Joi.number().required(),
            senha: Joi.number().required(),
            email: Joi.string().required(),
            dataNascimento: Joi.string().required()
        });
        Joi.validate({
            nome: req.body.nome,
            login: req.body.login,
            senha: req.body.senha,
            email: req.body.email,
            dataNascimento: req.body.dataNascimento
        }, schema, cb)
    }

}

module.exports = new ClienteController();