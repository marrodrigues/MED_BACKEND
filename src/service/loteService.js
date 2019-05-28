const { lote, insumo, produto } = require('../models');

class LoteService {

    async calculaValorLote(data){
        if(data.insumoId){
            const insumoResult = await insumo.findByPk(data.insumoId)
            if (!insumoResult){
                return { status: 404, error: "O insumo do lote em questão não foi encontrado."}
            }
            data.valor_total = insumoResult.valor_unitario * data.qtd
            return {
                id: data.id,
                lote: data.lote,
                qtd: data.qtd,
                validade: data.validade,
                valor_total: data.valor_total,
                insumoId: data.insumoId
            }
        } else if (data.produtoId) {
            const produtoResult = await produto.findByPk(data.produtoId)
            if (!produtoResult){
                return { status: 404, error: "O produto do lote em questão não foi encontrado."}
            }
            data.valor_total = produtoResult.valor * data.qtd
            return {
                id: data.id,
                lote: data.lote,
                qtd: data.qtd,
                validade: data.validade,
                valor_total: data.valor_total,
                produtoId: data.produtoId
            }
        } else {
            return { status: 400, error: "É necessário referênciar um produto ou um insumo para criação de um lote."}
        }
    }

    async create(data) {
        try {
            const result = await this.calculaValorLote(data)

            const valid = this.findByLote(result.lote)
            if(!valid){
                return { status: 409, error: "O lote em questão já foi cadastrado."}
            }

            const created = await lote.create(result)
            return created
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async delete(id) {
        try {
            const result = await this.find(id)
            if (result == null) {
                return { status: 404, error: "O lote em questão não foi encontrado."}
            }
            return await lote.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            return { status: 500, error: error }
        }
    }
    
    async find(id) {
        try {
            const result = await lote.findByPk(id)
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findAll() {
        try {
            const result = await lote.findAll()
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findByInsumoId(id) {
        try {
            const result = await lote.findAll( 
                {
                    where: {
                        insumoId: id
                    }
                }
            )
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findByLote(data) {
        try {
            const result = await lote.findOne( 
                {
                    where: {
                        lote: data
                    }
                }
            )
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findByProdutoId(id) {
        try {
            const result = await lote.findAll( 
                {
                    where: {
                        produtoId: id
                    }
                }
            )
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async update(data) {
        try {
            const result = await this.calculaValorLote(data)
            const r = await lote.update(result, { where: { id: data.id } })
            console.log(r)
            return { status: 204, error: null }
        } catch (error) {
            return { status: 500, error: error }
        }
    }

}

module.exports = new LoteService();