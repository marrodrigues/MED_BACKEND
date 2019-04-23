const {Pessoa} = require('../../models');


class ClienteService {

    create(data) {
        return new Promise((resolve, reject) => {
            Pessoa.create(data)
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    findAll() {
        return new Promise((resolve, reject) => {
            Pessoa.findAll()
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    find(id) {
        return new Promise((resolve, reject) => {
            Pessoa.findByPk(id)
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            Pessoa.update(data.payload, {where:{id: data.id} })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            Pessoa.destroy({
                where: {
                    id: id
                }
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

}

module.exports = new ClienteService();