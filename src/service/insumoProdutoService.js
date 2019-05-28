const { insumos_produto } = require('../models');

// const insumoService = require('../insumoService')

class InsumoProdutoService {
    async create(produtoId, insumos){
        let inserts = []
        insumos.map(insumo => {
            let data = {
                produtoId: produtoId,
                insumoId: insumo.id,
                qtd: insumo.qtd
            }
            const result = insumos_produto.create(data)
            inserts.push(result)
        })
        if(!inserts){
            return { status: 503, error: 'Não foi possivel adicionar relação produto-insumos'}
        } else{
            return { status: 200, error: null}
        }
    }

    async findByProdutoId(produtoId){
        try {
            const result =  await insumos_produto.findAll({
                where: {
                    produtoId: produtoId,
                }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async delete(produtoId){
        try {
            const all = await this.findByProdutoId(produtoId)
            all.map(async p => {
                await insumos_produto.destroy({
                    where: {
                        produtoId: p.produtoId
                    }
                })
            })
            return { status: 204, error: null}
        } catch (error) {
            return { status: 500, error: error }        
        }
    }
}

module.exports = new InsumoProdutoService();