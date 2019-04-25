const {pessoa} = require('../../models');

class PessoaService {

    find(id) {
        return new Promise((resolve, reject) => {
            pessoa.findByPk(id,{
                include: [
                            "endereco",
                            "telefone"
                ]
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    findByLogin(login) {
        return new Promise((resolve, reject) => {
            pessoa.findOne({
                include: [
                            "endereco",
                            "telefone"
                ],
                where: {
                    login: login
                }
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    delete(id){
        return new Promise((resolve, reject) => {
            pessoa.destroy({
                where: {
                    id: id
                }
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }    
}

module.exports = new PessoaService();