const bcrypt = require('bcrypt')

const {funcionario, pessoa, endereco} = require('../../models');
const pessoaService = require('../../service/pessoaService')

class FuncionarioService {

    create(data) {
        const salt = bcrypt.genSaltSync(10)
        data.pessoa.senha = bcrypt.hashSync(data.pessoa.senha, salt)
        console.log(data.pessoa.senha)
        return new Promise((resolve, reject) => {
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
        })
    }

    findAll() {
        return new Promise((resolve, reject) => {
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
        })
    }

    find(id) {
        return new Promise((resolve, reject) => {
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
        })
    }

    async update(data) {
        /*return new Promise((resolve, reject) => {
            funcionario.update(data.payload, { where:{id: data.id} })
                .then(result => pessoaService.update(data.payload.pessoa))
                .then(result => resolve(result))
                .catch(err => reject(err))
        })*/

        try {
            const salt = bcrypt.genSaltSync(10)
            data.payload.pessoa.senha = bcrypt.hashSync(data.payload.pessoa.senha, salt)
            await funcionario.update(data.payload, { where:{id: data.id} })
            await pessoaService.update(data.payload.pessoa)
            return 200
        } catch (error) {
            return error            
        }
    }

    async delete(id) {
        const funcionario = await this.find(id)
        if(funcionario == null){
            return 404
        } 
        return await pessoaService.delete(funcionario.pessoaId)
    }

    findByPessoaId(id) {
        return new Promise((resolve, reject) => {
            funcionario.findOne({
                where: {
                    pessoaId: id
                }
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

}

module.exports = new FuncionarioService();