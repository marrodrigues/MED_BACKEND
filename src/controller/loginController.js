const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const pessoaService = require('../service/pessoaService')
const loginService = require('../service/loginService')

class LoginController {

    login(req, res, jwtOptions) {
        const { login, senha } = req.body
        if (login && senha) {
            pessoaService.findByLogin(login)
                .then(pessoa => {
                    if (!pessoa) {
                        res.status(401).send(`Login inválido.`)
                    }
                    bcrypt.compare(senha, pessoa.senha, (err, isValid) => {
                        if (!isValid) { res.status(401).send('Senha incorreta.') }
                        const payload = { id: pessoa.id }
                        const token = jwt.sign(payload, jwtOptions.secretOrKey)
                        loginService.getRole(payload.id).then(perfil => {
                            if (perfil.role === 'Erro na busca') res.status(404).send('Perfil não encontrado.')
                            res.status(200).json({ id: pessoa.id, msg: 'OK', token: token, role: perfil.role })
                        })
                    })
                })
                .catch(err => res.status(500).send(`Serviço indisponível, erro: ${err}`))
        }
    }



}

module.exports = new LoginController()