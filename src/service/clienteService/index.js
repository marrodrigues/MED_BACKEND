const {cliente} = require('../../models');

const pessoaService = require('../../service/pessoaService')

class ClienteService {

    create(data) {
        return new Promise((resolve, reject) => {
            cliente.create(data, {
                include:[
                    {
                        association: "pessoa",
                        include:[
                            "endereco",
                            "telefone"
                        ]   
                    }
                ]
            })
                .then(result => resolve(result)).catch(err => reject(err))
        })
    }

    findAll() {
        return new Promise((resolve, reject) => {
            cliente.findAll({
                include: [
                    {
                        association: "pessoa",
                        include:[
                            "endereco",
                            "telefone"
                        ]
                    }
                ]
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    find(id) {
        return new Promise((resolve, reject) => {
            cliente.findByPk(id,{
                include: [
                    {
                        association: "pessoa",
                        include:[
                            "endereco",
                            "telefone"
                        ]
                    }
                ]
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            cliente.update(data.payload, { include: [
                {
                    association: "pessoa",
                    include:[
                        "endereco",
                        "telefone"
                    ]
                }
            ],
            where:{id: data.id} })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    async delete(id) {
        const cliente = await this.find(id)
        if(cliente == null){
            return 404
        } 
        return await pessoaService.delete(cliente.pessoaId)
    }

}

module.exports = new ClienteService();