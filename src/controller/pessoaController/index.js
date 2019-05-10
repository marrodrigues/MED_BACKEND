const service = require('../../service/pessoaService')


class PessoaController {

    findByCPF(req, res) {
        const cpf = req.params.cpf;
        console.log(cpf)
        service.findByCPF(cpf)
            .then(data => {
                if (!data){
                    res.status(200).send('CPF válido');
                }
                res.status(409).send('O CPF em questão já se encontra cadastrado.')
            })
            .catch(err => res.status(401).send('Busca por CPF negada.\n'+ err))
    }

    findByEmail(req, res) {
        const email = req.params.email;
        service.findByEmail(email)
            .then(data => {
                if (!data){
                    res.status(200).send('E-mail válido');
                }
                res.status(409).send('O e-mail em questão já se encontra cadastrado.')
            })
            .catch(err => res.status(401).send('Busca por e-mail negada.\n'+ err))
    }

    findByLogin(req, res) {
        const login = req.params.login;
        service.findByLogin(login)
            .then(data => {
                if (!data){
                    res.status(200).send('Login válido');
                }
                res.status(409).send('O login em questão já existe.')
            })
            .catch(err => res.status(401).send('Busca por login negada.\n'+ err))
    }

}

module.exports = new PessoaController();