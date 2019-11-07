const {pedido} = require('../models');

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
                status: 400,
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
        let sobra = 0
        for(let i = 0; i < data.length; i++){
            const resultProduto = await produtoService.find(data[i].id)
            if(!resultProduto || resultProduto.status == 500){
                return {status: 404, error: 'O produto ' + data[i].nome + ' não foi encontrado.'}
            }
            if(resultProduto.tipo == 1) {
                for(let j = 0; j < resultProduto.insumosProdutos.length ; j++){
                    const lotes = await loteService.findByInsumoId(resultProduto.insumosProdutos[j].insumoId)
                    for(let k = 0; k < lotes.length ; k++) {
                        lotes[k].qtd += sobra
                        if(lotes[k].qtd > resultProduto.insumosProdutos[j].qtd && !updated){
                            updateLote = {
                                lote: lotes[k].lote,
                                qtd:  lotes[k].qtd - resultProduto.insumosProdutos[j].qtd * data[i].qtd,
                                validade: lotes[k].validade,
                                valor_unitario: lotes[k].valor_unitario,
                                insumoId: lotes[k].insumoId,
                                produtoId: lotes[k].produtoId
                            }
                            updated = true
                        } else {
                            sobra += lotes[k].qtd
                        }

                    }
                    if(!updated){
                        return {status: 404, error: 'Não existe lote para o produto: ' + resultProduto.nome}
                    }
                    updateList.push(updateLote)
                    updated = false
                }
            } else {
                const lotes = await loteService.findByProdutoId(resultProduto.id)
                for(let j = 0; j < lotes.length ; j++) {
                    lotes[j].qtd += sobra
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
                    } else [
                        sobra += lotes[j].qtd
                    ] 
                }
                if(!updated){
                    return {status: 404, error: 'Não existe lote para o produto: ' + resultProduto.nome}
                }
                updateList.push(updateLote)
            }
        
            valorPedido += resultProduto.valor * data[i].qtd
        }
        for(let i = 0; i < updateList.length ; i++) {
            loteService.update(updateList[i]) 
        }
        return {status: 200, valorPedido: valorPedido}
    }

    async retornarEstoque (data){
        let updateList = []
        let updateLote = {}
        for(let i = 0; i < data.length; i++) {
            const resultProduto = await produtoService.find(data[i].produtoId)
            if(!resultProduto || resultProduto.status == 500){
                return {status: 404, error: 'O produto ' + data[i].nome + ' não foi encontrado.'}
            }
            if(resultProduto.tipo == 1) {
                for(let j = 0; j < resultProduto.insumosProdutos.length ; j++){
                    const lotes = await loteService.findByInsumoId(resultProduto.insumosProdutos[j].insumoId)
                    if(lotes.length == 0)
                        return {status: 404, error: 'Não foi encontrado lote cadastrado para o insumo com o identificador: ' + resultProduto.insumosProdutos[j].insumoId + '.'}
                    updateLote = {
                        lote: lotes[0].lote,
                        qtd:  lotes[0].qtd + resultProduto.insumosProdutos[j].qtd * data[i].qtd,
                        validade: lotes[0].validade,
                        valor_unitario: lotes[0].valor_unitario,
                        insumoId: lotes[0].insumoId,
                        produtoId: lotes[0].produtoId
                    }
                    updateList.push(updateLote)
                }
            } else {
                const lotes = await loteService.findByProdutoId(resultProduto.id)
                if(lotes.length == 0)
                        return {status: 404, error: 'Não foi encontrado lote cadastrado para o produto: ' + resultProduto.nome + '.'}
                updateLote = {
                    lote: lotes[0].lote,    
                    qtd:  lotes[0].qtd + data[i].qtd,
                    validade: lotes[0].validade,
                    valor_unitario: lotes[0].valor_unitario,
                    insumoId: lotes[0].insumoId,
                    produtoId: lotes[0].produtoId
                }
                updateList.push(updateLote)
            }
        }
        for(let i = 0; i < updateList.length ; i++) {
            await loteService.update(updateList[i]) 
        }
        return {status: 200}
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

    async cancelar(data) { // TESTAR
        try {
            const result = await this.find(data.id)
            if (result == null) 
                return { status: 404, error: "O pedido em questão não foi encontrado."}
            
            if(result.status != 1)
                return { status: 400, error: "Status do pedido diferente de em confecção (1)"}

            const updatePedido = {
                "id": result.id,
                "clienteId": result.clienteId,
                "funcionarioId": result.funcionarioId,
                "codigo": result.codigo,
                "forma_pagamento": result.forma_pagamento,
                "observacao": result.observacao,
                "produtos": result.produtos,
                "status": 4,
                "valor_total": result.valorPedido,
                "motivo_cancelamento": data.motivo_cancelamento
            }
            
            const updateResult = await pedido.update(updatePedido, {where: {id: result.id}})
            if(updateResult > 0)
                return {status: 200}
        } catch (error) {
            return { status: 500, error: error }
        }
    }

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

    async update(data) { 
        try {
            const valid = await this.validaPedido(data)
            if (valid.status != 200)
                return valid

            const existePedido = await this.find(data.id)
            if (!existePedido)
                return { status: 404, error: 'Pedido não cadastrado.' }
            
            const resultRetorno = await this.retornarEstoque(existePedido.pedidosProdutos)
            if(resultRetorno.status != 200)
                return resultRetorno

            const resultConsumo = await this.consumirEstoque(data.produtos)
            if(resultConsumo.status != 200)
                return resultConsumo

            const novoPedido = {
                "id": data.id,
                "clienteId": data.clienteId,
                "funcionarioId": data.funcionarioId,
                "codigo": existePedido.codigo,
                "forma_pagamento": data.forma_pagamento,
                "observacao": data.observacao,
                "produtos": data.produtos,
                "status": 1,
                "data_pedido": new Date(),
                "valor_total": resultConsumo.valorPedido
            }

            await pedido.update(novoPedido, {where: {id:novoPedido.id}})
            
            const resultDelete = await pedidoProdutoService.deleteByPedidoId(data.id)
            
            if (resultDelete.status != 200)
                return resultDelete

            const result = await pedidoProdutoService.create(data.id, data.produtos)
            
            if (result.status === 200)
                return { status: 204, error: null }   
        } catch (error) {
            console.log(error)
            return { status: 500, error: error }
        }
    }

}

module.exports = new PedidoService();