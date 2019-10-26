const {
    pedido
} = require('../models');

const produtoService = require('./produtoService')
const loteService = require('./loteService')
const pedidoProdutoService = require('./pedidoProdutoService')

class PedidoService {

    async validaPedido(data) {
        let invalidProd = []
        let invalidInsProd = []
        for (var i = 0; i < data.produtos; i++) {
            const produto = await produtoService.find(data.produtos[i].id)
            if (!produto) {
                invalidProd.push(data.produtos[i])
            } else {
                if (produto.insumosProdutos) {
                    insumosProdutos.map(async insProd => {
                        const qtdEstoque = loteService.findTotalQtdByInsumoId(insProd.insumoId)
                        if (qtdEstoque[0].sumQtd < insProd.qtd)
                            invalidInsProd.push(insProd)
                    })
                } else {
                    const qtdEstoque = loteService.findTotalQtdByProdutoId(produto.id)
                    if (qtdEstoque[0].sumQtd < produto.qtd)
                        invalidInsProd.push(produto)
                }
            }
        }
        if (invalidProd.length > 0)
            return {
                status: 404,
                error: "Produto(s) não cadastrado(s): \n" + invalidProd
            }

        if (invalidInsProd.length > 0)
            return {
                status: 409,
                error: "O estoque não possui insumos suficientes: \n" + invalidInsProd
            }

        return {
            status: 200,
            error: null
        }
    }

    async consumirEstoque (data){
        let updateList = []
        let updateLote = {}
        let updated = false
        let valorPedido = 0
        for(let i = 0; i < data.length; i++){
            const resultProduto = await produtoService.find(data[i].id)
            if(!resultProduto || resultProduto.status == 500){
                return {status: 404, error: 'O produto ' + data[i].nome + ' não foi encontrado.'}
            }
            if(resultProduto.tipo == 1) {
                for(let j = 0; j < resultProduto.insumosProdutos.length ; j++){
                    const lotes = await loteService.findByInsumoId(resultProduto.insumosProdutos[j].insumoId)
                    for(let k = 0; k < lotes.length ; k++) {
                        if(lotes[k].qtd > resultProduto.insumosProdutos[j].qtd && !updated){
                            updateLote = {
                                lote: lotes[k].lote,
                                qtd:  lotes[k].qtd - resultProduto.insumosProdutos[j].qtd,
                                validade: lotes[k].validade,
                                valor_unitario: lotes[k].valor_unitario,
                                insumoId: lotes[k].insumoId,
                                produtoId: lotes[k].produtoId
                            }
                            updated = true
                        } 
                    }
                    if(!updated){
                        return {status: 400, error: 'Não existe lote para o produto: ' + resultProduto.nome}
                    }
                    updateList.push(updateLote)
                    updated = false
                }
            } else {
                const lotes = await loteService.findByProdutoId(resultProduto.id)
                for(let j = 0; j < lotes.length ; j++) {
                    if(lotes[j].qtd >  data[i].qtd && !updated){
                        updateLote = {
                            lote: lotes[j].lote,    
                            qtd:  lotes[j].qtd - data[i].qtd,
                            validade: lotes[j].validade,
                            valor_unitario: lotes[j].valor_unitario,
                            insumoId: lotes[j].insumoId,
                            produtoId: lotes[j].produtoId
                        }
                        updated = true
                    } 
                }
                if(!updated){
                    return {status: 400, error: 'Não existe lote para o produto: ' + resultProduto.nome}
                }
                updateList.push(updateLote)
            }
        
            valorPedido += resultProduto.valor * data[i].qtd
        }
        for(let i = 0; i < updateList.length ; i++) {
            loteService.update(updateList[i]) 
        }
        // updateList.map(async lote => { await loteService.update(lote) })
        return {status: 200, valorPedido: valorPedido}
    }

    async create(data) {
        try {
            const valid = await this.validaPedido(data)
            if (valid.status != 200)
                return valid

            const resultConsumo = await this.consumirEstoque(data.produtos)
            if(resultConsumo.status != 200)
                return resultConsumo

            const novoPedido = {
                "clienteId": data.clienteId,
                "funcionarioId": data.funcionarioId,
                "codigo": data.codigo,
                "forma_pagamento": data.forma_pagamento,
                "observacao": data.observacao,
                "produtos": data.produtos,
                "status": 1,
                "data_pedido": new Date(),
                "valor_total": resultConsumo.valorPedido
            }

            const resultPedido = await pedido.create(novoPedido)
            
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

    // async cancelar(id) {
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

    async find(id) {
        try {
            const result = await pedido.findByPk(id, {
                include: [{
                    association: "pedidosProdutos",
                    attributes: { exclude: ["id","createdAt", "updatedAt", "pedidoId"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findAll() {
        try {
            const result = await pedido.findAll({
                include: [{
                    association: "pedidosProdutos",
                    attributes: { 
                        exclude: ["id","createdAt", "updatedAt", "pedidoId"] 
                    }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findByCodigo(codigo){
        try {
            const result =  await pedido.findAll({
                include: [{
                    association: "pedidosProdutos",
                    attributes: { 
                        exclude: ["id","createdAt", "updatedAt", "pedidoId"] 
                    }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] },
                where: {
                    codigo: codigo,
                }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

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
    //             const existeInsumos = await insumoService.insumosExist(data.payload.insumos)

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