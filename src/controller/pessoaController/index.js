const pessoaService = require('../../service/pessoaService')

class PessoaController {

    findByCPF(req, res) {
        const cpf = req.params.cpf;
        pessoaService.findByCPF(cpf)
            .then(result => {
                if (!result) {
                    res.status(200).send('CPF válido');
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(409).send('O CPF em questão já se encontra cadastrado.')
                }
            })
    }

    findByEmail(req, res) {
        const email = req.params.email;
        pessoaService.findByEmail(email)
            .then(result => {
                if (!result) {
                    res.status(200).send('E-mail válido');
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(409).send('O e-mail em questão já se encontra cadastrado.')
                }
            })
    }

    findByLogin(req, res) {
        const login = req.params.login;
        pessoaService.findByLogin(login)
            .then(result => {
                if (!result) {
                    res.status(200).send('Login válido');
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(409).send('O login em questão já existe.')
                }
            })
    }

}

module.exports = new PessoaController();