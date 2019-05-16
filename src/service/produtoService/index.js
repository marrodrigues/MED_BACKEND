const { produto } = require('../../models');

const insumoService = require('../insumoService')
const insumoProdutoService = require('../insumoProdutoService')

class ProdutoService {

    async create(data) {
        try {
            const insumos = await insumoService.findInsumos(data.insumos)
            
            console.log(insumos)
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
            return await produto.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findAll() {
        try {
            const result = await produto.findAll({
                include: [{
                    association: "insumos",
                    attributes: { exclude: ["createdAt", "updatedAt", "produtoId"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            return result
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