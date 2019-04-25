const Joi = require('joi');
const service = require('../../service/funcionarioService')


class FuncionarioController {

    create(req, res) {
        let data = req.body;
        this._validate(req, (err, result) => {
            if (err){
                console.log(err)
                res.status(400).send('Dados inconsistentes ao tentar criar um novo funcionário.')
            }
            
            service.create(data)
                .then(data => {
                    res.status(201).send(data)
                })
                .catch(err => res.status(401).send('Criação do novo funcionário negada.\n'+ err))
        })
    }


    findAll(req, res) {
        service.findAll()
            .then(data => {
                if (data.length === 0){
                    res.status(404).send('Não foram encontrados funcionários.')
                } else{
                    res.status(200).json(data)
                }
            })
            .catch(err => res.status(401).send('Busca por funcionários negada.\n' + err))
    }


    find(req, res) {
        let id = req.params.id;
        service.find(id)
            .then(data => {
                if (!data){
                    res.status(404).send('O funcionário especificado não foi encontrado.')
                }
                res.status(200).json(data);
            })
            .catch(err => res.status(401).send('Busca por funcionário negada.\n'+ err))
    }


    update(req, res) {
        let data = {
            id: req.params.id,
            payload: req.body
        }
        this._validate(req, (err, result) => {
            if (err || !data.id){
                res.status(400).send('Dados inconsistentes ao tentar atualizar um funcionário.')
            }
            service.update(data)
                .then(data => {
                    if (!data)
                        res.status(404).send('Funcionário não encontrado.')

                    res.status(204).send('Funcionário atualizado com sucesso.')
                })
                .catch(err => res.status(401).send('Atualização de funcionário negada.'))
        })
    }


    delete(req, res) {
        let id = req.params.id;
        if (!id)
            res.status(400).send('Dados inconsistentes ao tentar excluir funcionário.')

        service.delete(id)
            .then(data => {
                if (!data || data === 404){
                    res.status(404).send('Funcionário não encontrado.')
                } 
                
                res.status(204).send('Funcionário excluido com sucesso.')
                
            })
            .catch(err => res.status(401).send('Exclusão de funcionário negada.'))
    }



    _validate(req, cb) {
        const schema = Joi.object().keys({
            nome: Joi.string().required(),
           /* login: Joi.string().required(),
            senha: Joi.string().required(),
            email: Joi.string().required(),
            dataNascimento: Joi.string().required()*/
        });
        Joi.validate({
            nome: req.body.pessoa.nome,
            /*login: req.body.login,
            senha: req.body.senha,
            email: req.body.email,
            dataNascimento: req.body.dataNascimento*/
        }, schema, cb)
    }

}

module.exports = new FuncionarioController();