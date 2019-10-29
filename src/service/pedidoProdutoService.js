const { pedidos_produto } = require('../models');

// const insumoService = require('../insumoService')

class PedidoProdutoService {
    async create(pedidoId, produtos){
        let inserts = []
        await produtos.map(async produto => {
            let data = {
                produtoId: produto.id,
                pedidoId: pedidoId,
                qtd: produto.qtd
            }
            const result = pedidos_produto.create(data)
            inserts.push(result)
        })
        if(!inserts){
            return { status: 503, error: 'Não foi possivel adicionar relação pedido-produtos'}
        } else{
            return { status: 200, error: null}
        }
    }

    async deleteByPedidoId(pedidoId) {
        try {
            await pedidos_produto.destroy({where: {pedidoId: pedidoId}})
            return { status: 200, error: null}
        } catch (error) {
            return { status: 500, error: error }
        }
    }
}

module.exports = new PedidoProdutoService();