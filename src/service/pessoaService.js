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