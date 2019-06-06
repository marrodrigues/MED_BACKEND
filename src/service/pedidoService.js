const {
    pedido
} = require('../models');

const produtoService = require('./produtoService')
const loteService = require('./loteService')
const pedidoProdutoService = require('./pedidoProdutoService')

class PedidoService {

    async validaPedido(data) {
        let validProd = []
        let validInsProd = []
        for (var i = 0; i < data.produtos; i++) {
            const produto = await produtoService.findByNomeAndTamanho(data.produtos[i])
            if (!produto) {
                validProd.push(data.produtos[i])
            } else {
                if (produto.insumosProdutos) {
                    insumosProdutos.map(async insProd => {
                        const qtdEstoque = loteService.findTotalQtdByInsumoId(insProd.insumoId)
                        if (qtdEstoque[0].sumQtd < insProd.qtd)
                            validInsProd.push(insProd)
                    })
                } else {
                    const qtdEstoque = loteService.findTotalQtdByProdutoId(produto.id)
                    if (qtdEstoque[0].sumQtd < produto.qtd)
                        validInsProd.push(produto)
                }
            }
        }
        if (!validProd)
            return {
                status: 404,
                error: "Produto(s) não cadastrado(s): \n" + validProd
            }

        if (!validInsProd)
            return {
                status: 409,
                error: "O estoque não possui insumos suficientes: \n" + validInsProd
            }

        return {
            status: 200,
            error: null
        }
    }

    async create(data) {
        try {
            const valid = await this.validaPedido(data)
            if (valid.status != 200)
                return valid

            data.produtos.map(async produto => {
                await loteService.consumirEstoque(produto)
            })
            const resultPedido = pedido.create(data)
            const result = await pedidoProdutoService.create(resultPedido.id, data.produtos)
            if (result.status === 200)
                return resultPedido
        } catch (error) {
            console.log(error)
            return {
                status: 500,
                error: error
            }
        }
    }

    // async delete(id) {
    //     try {
    //         const result = await this.find(id)
    //         if (result == null) {
    //             return { status: 404, error: "O pedido em questão não foi encontrado."}
    //         }
    //         if(result.insumos.length > 0){
    //             const insumosPedidos = await insumoPedidoService.delete(id)
    //             if(insumosPedidos.status === 500)
    //                 return insumosPedidos
    //         } else {
    //             const lotes = await loteService.findByPedidoId(id)
    //             lotes.map(async lote => {
    //                 await loteService.delete(lote.id)
    //             })
    //         }

    //         return await pedido.destroy({
    //             where: {
    //                 id: id
    //             }
    //         })
    //     } catch (error) {
    //         return { status: 500, error: error }
    //     }
    // }

    // async find(id) {
    //     try {
    //         const result = await pedido.findByPk(id, {
    //             include: [{
    //                 association: "insumos",
    //                 attributes: { exclude: ["createdAt", "updatedAt", "pedidoId"] }
    //             },{
    //                 association: "insumosPedidos",
    //                 attributes: { exclude: ["createdAt","updatedAt"] }
    //             }],
    //             attributes: { exclude: ["createdAt", "updatedAt"] }
    //         })
    //         return result
    //     } catch (error) {
    //         return { status: 500, error: error }
    //     }
    // }

    // async findAll() {
    //     try {
    //         const result = await pedido.findAll({
    //             include: [{
    //                 association: "insumos",
    //                 attributes: { exclude: ["createdAt", "updatedAt", "pedidoId"] }
    //             },{
    //                 association: "insumosPedidos",
    //                 attributes: { exclude: ["createdAt","updatedAt"] }
    //             }],
    //             attributes: { exclude: ["createdAt", "updatedAt"] }
    //         })
    //         return result
    //     } catch (error) {
    //         return { status: 500, error: error }
    //     }
    // }

    // async findByNome(pedidoNovo){
    //     try {
    //         const result =  await pedido.findAll({
    //             include: [{
    //                 association: "insumos",
    //                 attributes: { exclude: ["createdAt", "updatedAt", "pedidoId"] }
    //             }],
    //             where: {
    //                 nome: pedidoNovo.nome,
    //             }
    //         })
    //         return result
    //     } catch (error) {
    //         return { status: 500, error: error }
    //     }
    // }

    // async findByNomeAndTamanho(pedidoNovo){
    //     try {
    //         const result =  await pedido.findOne({
    //             include: [{
    //                 association: "insumos",
    //                 attributes: { exclude: ["createdAt", "updatedAt", "pedidoId"] }
    //             }],
    //             where: {
    //                 nome: pedidoNovo.nome,
    //                 tamanho: pedidoNovo.tamanho,
    //             }
    //         })
    //         return result
    //     } catch (error) {
    //         return { status: 500, error: error }
    //     }
    // }

    // async update(data) {
    //     try {
    //         const existePedido = await this.find(data.id)

    //         if (!existePedido)
    //             return { status: 404, error: 'Pedido não cadastrado.' }

    //         if(data.insumos){
    //             const existeInsumos = await insumoService.findInsumos(data.payload.insumos)

    //             if(!existeInsumos)
    //                 return { status: 404, error: 'Insumo não cadastrado.' }

    //             await pedido.update(data.payload, { where: { id: data.id } })

    //             const insumosPedidos = await insumoPedidoService.delete(data.id) // verificar se os lotes não estão sendo excluidos
    //             if(insumosPedidos.status === 500)
    //                 return insumosPedidos

    //             await insumoPedidoService.create(data.id, data.payload.insumos)

    //         } else {
    //             await pedido.update(data.payload, { where: { id: data.id } })
    //         }

    //         return { status: 200, error: null }   

    //     } catch (error) {
    //         console.log(error)
    //         return { status: 500, error: error }
    //     }
    // }

}

module.exports = new PedidoService();