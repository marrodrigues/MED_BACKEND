const bcrypt = require('bcrypt')

const { funcionario } = require('../models');
const pessoaService = require('./pessoaService')

class FuncionarioService {

    async create(data) {
        try {
            const salt = bcrypt.genSaltSync(10)
            data.pessoa.senha = bcrypt.hashSync(data.pessoa.senha, salt)
            const result = await funcionario.create(data, {
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
            return error.message === "Validation error" ? 
                        {status: 400, error: error} : { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            funcionario.create(data, {
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
                return { status: 404, error: 'Funcionário não encontrado.' }
            }
            return await pessoaService.delete(result.pessoaId)
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findAll() {
        try {
            const result = await funcionario.findAll({
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
            funcionario.findAll({
                include: [
                    {
                        association: "pessoa",
                        include: [
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
            const result = await funcionario.findByPk(id, {
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
            funcionario.findByPk(id,{
                include: [
                    {
                        association: "pessoa",
                        include: [
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
        }) */
    }

    async findByPessoaId(id) {
        try {
            const result = await funcionario.findOne({
                where: {
                    pessoaId: id
                }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            funcionario.findOne({
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
            const func = await pessoaService.find(data.payload.pessoa.id)
            if(!func) {
                return { status: 404 , error: 'Funcionário não encontrado.'}
            }

            const salt = bcrypt.genSaltSync(10)
            data.payload.pessoa.senha = bcrypt.hashSync(data.payload.pessoa.senha, salt)
            await funcionario.update(data.payload, { where: { id: data.id } })
            await pessoaService.update(data.payload.pessoa)
            return { status: 204, error: null }
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            funcionario.update(data.payload, { where:{id: data.id} })
                .then(result => pessoaService.update(data.payload.pessoa))
                .then(result => resolve(result))
                .catch(err => reject(err))
        })*/
    }

}

module.exports = new FuncionarioService();