const {pessoa, endereco, telefone} = require('../../models')
const clienteService = require('../../service/clienteService')
const funcionarioService = require('../../service/funcionarioService')

class PessoaService {

    find(id) {
        return new Promise((resolve, reject) => {
            pessoa.findByPk(id,{
                include: [
                            "endereco",
                            "telefone"
                ]
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    findByLogin(login) {
        return new Promise((resolve, reject) => {
            pessoa.findOne({
                include: [
                            "endereco",
                            "telefone"
                ],
                where: {
                    login: login
                }
            })
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    async update(data){
        try {
            await pessoa.update(data, 
                {
                    where: {
                        id: data.id
                    }
                }
            )
            await endereco.update(data.endereco[0], 
                {
                    where: {
                        id: data.endereco[0].id
                    }
                }
            )
            await telefone.update(data.telefone[0], 
                {
                    where: {
                        id: data.telefone[0].id
                    }
                }
            )
        } catch (error) {
            return error
        }
    }

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
    
    async getRole(id){
        const cliente = await clienteService.findByPessoaId(id)
        if(cliente) {
            return {role: 'Cliente'}
        } else {
            const funcionario = await funcionarioService.findByPessoaId(id)
            if(!funcionario) return {role: 'Erro na busca'}
            if(funcionario.cargo === 'Admin'){
             return {role: 'Admin'}
            }else if(funcionario.cargo === 'Funcionario'){
                return {role: 'Funcionario'}
            }else{
                return {role: 'Erro na busca'}
            }    
        }
    }
}

module.exports = new PessoaService();