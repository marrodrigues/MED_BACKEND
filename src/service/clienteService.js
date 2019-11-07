const bcrypt = require('bcrypt')

const { cliente } = require('../models');
const pessoaService = require('./pessoaService')

class ClienteService {

    async block(data){
        try {
            const result = await this.find(data.id)
            if (result == null) 
                return { status: 404, error: "O cliente em questão não foi encontrado."}
            
            const updateCliente = {
                "id": result.id,
                "pessoaId": result.pessoaId,
                "flag_bloqueado": 1,
                "motivo_bloqueio": data.motivo_bloqueio
            }
            
            const updateResult = await cliente.update(updateCliente, {where: {id: result.id}})
            if(updateResult > 0)
                return {status: 200}
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async unblock(id){
        try {
            const result = await this.find(id)
            if (result == null) 
                return { status: 404, error: "O cliente em questão não foi encontrado."}
            
            const updateCliente = {
                "id": result.id,
                "pessoaId": result.pessoaId,
                "flag_bloqueado": 0,
                "motivo_bloqueio": null
            }
            
            const updateResult = await cliente.update(updateCliente, {where: {id: result.id}})
            if(updateResult > 0)
                return {status: 200}
        } catch (error) {
            return { status: 500, error: error }
        }
    }

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
    }
}

module.exports = new ClienteService();