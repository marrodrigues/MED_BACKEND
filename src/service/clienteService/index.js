const bcrypt = require('bcrypt')

const { cliente } = require('../../models');
const pessoaService = require('../../service/pessoaService')

class ClienteService {

    async create(data) {
        try {
            const salt = bcrypt.genSaltSync(10)
            data.pessoa.senha = bcrypt.hashSync(data.pessoa.senha, salt)
            const result = await cliente.create(data, {
                include: [{
                    association: "pessoa",
                    include: [
                        "endereco",
                        "telefone"
                    ]
                }]
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
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
        })*/
    }

    async delete(id) {
        try {
            const result = await this.find(id)
            if (result == null) {
                return { status: 404, error: 'Cliente não encontrado.' }
            }
            return await pessoaService.delete(result.pessoaId)
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findAll() {
        try {
            const result = await cliente.findAll({
                include: [{
                    association: "pessoa",
                    include: [
                        "endereco",
                        "telefone"
                    ],
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            cliente.findAll({
                include: [
                    {
                        association: "pessoa",
                        include:[
                            "endereco",
                            "telefone"
                        ],
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    }
                ],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })*/
    }

    async find(id) {
        try {
            const result = await cliente.findByPk(id, {
                include: [{
                    association: "pessoa",
                    include: [
                        "endereco",
                        "telefone"
                    ],
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            cliente.findByPk(id,{
                include: [
                    {
                        association: "pessoa",
                        include:[
                            "endereco",
                            "telefone"
                        ],
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    }
                ],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            .then(result => resolve(result))
            .catch(err => reject(err))
        })*/
    }

    async findByPessoaId(id) {
        try {
            const result = await cliente.findOne({
                where: {
                    pessoaId: id
                }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            cliente.findOne({
                where: {
                    pessoaId: id
                }
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })*/
    }

    async update(data) {
        try {
            const salt = bcrypt.genSaltSync(10)
            data.payload.pessoa.senha = bcrypt.hashSync(data.payload.pessoa.senha, salt)
            await cliente.update(data.payload, { where: { id: data.id } })
            await pessoaService.update(data.payload.pessoa)
            return { status: 204, error: null }
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            cliente.update(data.payload, { where:{id: data.id} })
                .then(result => pessoaService.update(data.payload.pessoa))
                .then(result => resolve(result))
                .catch(err => reject(err))
        })*/
    }

}

module.exports = new ClienteService();