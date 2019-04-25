const bcrypt = require('bcrypt')

const {funcionario} = require('../../models');
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
            funcionario.findByPk(id,{
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
        const salt = bcrypt.genSaltSync(10)
        data.pessoa.senha = bcrypt.hashSync(data.pessoa.senha, salt)
        console.log(data.pessoa.senha)
        return new Promise((resolve, reject) => {
            funcionario.update(data.payload, { include: [
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
        const funcionario = await this.find(id)
        if(funcionario == null){
            return 404
        } 
        return await pessoaService.delete(funcionario.pessoaId)
    }

}

module.exports = new FuncionarioService();