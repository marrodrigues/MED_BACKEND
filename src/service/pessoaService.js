const { pessoa, endereco, telefone } = require('../models')
    //const clienteService = require('../../service/clienteService')
    //const funcionarioService = require('../../service/funcionarioService')

class PessoaService {

    async delete(id) {
        try {
            const result = await pessoa.destroy({
                where: {
                    id: id
                }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            pessoa.destroy({
                    where: {
                        id: id
                    }
                })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })*/
    }

    async find(id) {
        try {
            const result = await pessoa.findByPk(id, {
                include: [
                    "endereco",
                    "telefone"
                ],
                attributes: { exclude: ["createdAt", "updatedAt"] },
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            pessoa.findByPk(id, {
                    include: [
                        "endereco",
                        "telefone"
                    ],
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })*/
    }

    async findByCPF(cpf) {
        try {
            const result = await pessoa.findOne({
                include: [
                    "endereco",
                    "telefone"
                ],
                attributes: { exclude: ["createdAt", "updatedAt"] },
                where: {
                    cpf: cpf
                }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            pessoa.findOne({
                    include: [
                        "endereco",
                        "telefone"
                    ],
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: {
                        cpf: cpf
                    }
                })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })*/
    }

    async findByEmail(email) {
        try {
            const result = await pessoa.findOne({
                include: [
                    "endereco",
                    "telefone"
                ],
                attributes: { exclude: ["createdAt", "updatedAt"] },
                where: {
                    email: email
                }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            pessoa.findOne({
                    include: [
                        "endereco",
                        "telefone"
                    ],
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: {
                        email: email
                    }
                })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })*/
    }

    async findByLogin(login) {
        try {
            const result = await pessoa.findOne({
                include: [
                    "endereco",
                    "telefone"
                ],
                attributes: { exclude: ["createdAt", "updatedAt"] },
                where: {
                    login: login
                }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }

        /*return new Promise((resolve, reject) => {
            pessoa.findOne({
                    include: [
                        "endereco",
                        "telefone"
                    ],
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    where: {
                        login: login
                    }
                })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })*/
    }

    async update(data) {
        try {
            await pessoa.update(data, {
                where: {
                    id: data.id
                }
            })
            await endereco.update(data.endereco[0], {
                where: {
                    id: data.endereco[0].id
                }
            })
            await telefone.update(data.telefone[0], {
                where: {
                    id: data.telefone[0].id
                }
            })
            return 200
        } catch (error) {
            return { status: 500, error: error }
        }
    }

}

module.exports = new PessoaService();