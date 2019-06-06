const { pedidos_produto } = require('../models');

// const insumoService = require('../insumoService')

class PedidoProdutoService {
    async create(pedidoId, produtos){
        let inserts = []
        produtos.map(produto => {
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
}

module.exports = new PedidoProdutoService();