const { produto } = require('../../models');

const insumoService = require('../insumoService')
const insumoProdutoService = require('../insumoProdutoService')

class ProdutoService {

    async create(data) {
        try {
            const exist = await this.produtoExiste(data)

            if (exist)
                return { status: 409, error: 'Produto já cadastrado.' }

            const insumos = await insumoService.findInsumos(data.insumos)

            if(!insumos)
                return { status: 404, error: 'Insumo não cadastrado.' }
            
            const resultProduto = await produto.create(data)

            const result = await insumoProdutoService.create(resultProduto.id, data.insumos)

            if(result.status === 200){
                const res = await this.find(resultProduto.id)
                return res
            }

            return { status: 500, error: 'Erro inesperado.' }            
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async delete(id) {
        try {
            const result = await this.find(id)
            if (result == null) {
                return { status: 404, error: "O produto em questão não foi encontrado."}
            }

            const insumosProdutos = await insumoProdutoService.delete(id)
            if(insumosProdutos.status === 500)
                return insumosProdutos
                
            return await produto.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            return { status: 500, error: error }
        }
    }
    
    async find(id) {
        return new Promise ((resolve, reject) => {
            produto.findByPk(id, {
                include: [{
                    association: "insumos",
                    attributes: { exclude: ["createdAt", "updatedAt", "produtoId"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            .then(result => resolve(result)).catch(err => reject(err))
        })
    }

    async findAll() {
        try {
            const result = await produto.findAll({
                include: [{
                    association: "insumos",
                    attributes: { exclude: ["createdAt", "updatedAt", "produtoId"] }
                },{
                    association: "insumosProdutos",
                    attributes: { exclude: ["createdAt","updatedAt"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findByNome(produtoNovo){
        try {
            const result =  await produto.findOne({
                include: [{
                    association: "insumos",
                    attributes: { exclude: ["createdAt", "updatedAt", "produtoId"] }
                }],
                where: {
                    nome: produtoNovo.nome,
                    tamanho: produtoNovo.tamanho,
                }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async produtoExiste(produto){
        const result = await this.findByNome(produto)
        if(result)
            return true
        
        return false
    }

    async update(data) {
        try {
            await produto.update(data.payload, { where: { id: data.id } })
            return { status: 204, error: null}
        } catch (error) {
            return { status: 500, error: error }
        }
    }

}

module.exports = new ProdutoService();