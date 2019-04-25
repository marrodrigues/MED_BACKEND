const {pessoa} = require('../../models');

class PessoaService {

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