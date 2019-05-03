const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const pessoaService = require('../../service/pessoaService')

class LoginController {

    login(req, res, jwtOptions) {
        const {login, senha} = req.body
        if(login && senha){
            pessoaService.findByLogin(login)
                .then(pessoa => {
                    if(!pessoa){
                        res.status(401).send(`Nenhum usuário encontrado.`)
                    }
                    bcrypt.compare(senha, pessoa.senha, (err, isValid) => {
                        if (!isValid) { res.status(401).send('Senha incorreta.') }
                        const payload = {id: pessoa.id}
                        const token = jwt.sign(payload, jwtOptions.secretOrKey)
                        res.status(200).json({msg: 'OK', token: token})
                    })
                })
                .catch(err => res.status(503).send(`Serviço indisponível, erro: ${err}`))
        }
    }



}

module.exports = new LoginController()