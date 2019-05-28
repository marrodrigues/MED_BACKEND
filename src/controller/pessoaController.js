const pessoaService = require('../service/pessoaService')

class PessoaController {

    findByCPF(req, res) {
        const cpf = req.params.cpf;
        pessoaService.findByCPF(cpf)
            .then(result => {
                if (!result) {
                    res.status(404).send('O CPF especificado não foi encontrado.');
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(200).send(result)
                }
            })
    }

    findByEmail(req, res) {
        const email = req.params.email;
        pessoaService.findByEmail(email)
            .then(result => {
                if (!result) {
                    res.status(404).send('O e-mail especificado não foi encontrado.');
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(200).send(result)
                }
            })
    }

    findByLogin(req, res) {
        const login = req.params.login;
        pessoaService.findByLogin(login)
            .then(result => {
                if (!result) {
                    res.status(404).send('O login especificado não foi encontrado.');
                } else if (result.status === 500) {
                    res.status(500).send('Erro inesperado.\n' + result.error)
                } else {
                    res.status(200).send(result)
                }
            })
    }

}

module.exports = new PessoaController();