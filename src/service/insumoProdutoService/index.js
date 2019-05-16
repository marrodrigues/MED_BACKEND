const { insumos_produto } = require('../../models');

// const insumoService = require('../insumoService')

class InsumoProdutoService {
    async create(produtoId, insumos){
        let inserts = []
        insumos.map(insumo => {
            let data = {
                produtoId: produtoId,
                insumoId: insumo.id
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
}

module.exports = new InsumoProdutoService();