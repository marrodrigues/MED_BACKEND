const { lote, insumo, produto } = require('../models');
const sequelize = require('sequelize');


class LoteService {

    async consumirEstoque (data){
        if(data.insumosProdutos){
            data.insumosProdutos.map(async insProd =>{
                const lotes = await this.findByInsumoId(insProd.insumoId)
                let updateLote = {
                    lote: lotes[0].lote,
                    qtd:  lotes[0].qtd - insProd.valor_unitario,
                    validade: lotes[0].validade,
                    valor_unitario: lotes[0].valor_unitario,
                    insumoId: lotes[0].insumoId,
                    produtoId: lotes[0].produtoId
                }
                await this.update(updateLote)
            })
        } else{
            const lotes = await this.findByProdutoId(data.id)
            let updateLote = {
                lote: lotes[0].lote,    
                qtd:  lotes[0].qtd - 1,
                validade: lotes[0].validade,
                valor_unitario: lotes[0].valor_unitario,
                insumoId: lotes[0].insumoId,
                produtoId: lotes[0].produtoId
            }
            await this.update(updateLote)
        }
        
    }

    async validaLote(data){
        const valid = await this.findByLote(data.lote)
        if(valid)
            return { status: 409, error: "O lote em questão já possui cadastro."}

        if(data.insumoId){
            const insumoResult = await insumo.findByPk(data.insumoId)
            if (!insumoResult){
                return { status: 404, error: "O insumo do lote em questão não foi encontrado."}
            }
            // data.valor_total = insumoResult.valor_unitario * data.qtd
            // return {
            //     id: data.id,
            //     lote: data.lote,
            //     qtd: data.qtd,
            //     validade: data.validade,
            //     valor_total: data.valor_total,
            //     insumoId: data.insumoId
            // }
        } else if (data.produtoId) {
            const produtoResult = await produto.findByPk(data.produtoId)
            if (!produtoResult){
                return { status: 404, error: "O produto do lote em questão não foi encontrado."}
            }
            // data.valor_total = produtoResult.valor * data.qtd
            // return {
            //     id: data.id,
            //     lote: data.lote,
            //     qtd: data.qtd,
            //     validade: data.validade,
            //     valor_total: data.valor_total,
            //     produtoId: data.produtoId
            // }
        } else {
            return { status: 400, error: "É necessário referênciar um produto ou um insumo para criação de um lote."}
        }
    }

    async create(data) {
        try {
            let valid = await this.validaLote(data)

            if(valid) 
                return valid

            valid = this.findByLote(data.lote)
            if(!valid){
                return { status: 409, error: "O lote em questão já foi cadastrado."}
            }

            const created = await lote.create(data)
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

    async findTotalQtdByInsumoId(id){
        return await lote.findAll({
            where: {
                insumoId: id,
                validade: {
                    [sequelize.Op.gte]: new Date()
                }
            },
            attributes: [[sequelize.fn('sum', sequelize.col('qtd')), 'sumQtd']],
            raw: true
        });
    }

    async findTotalQtdByProdutoId(id){
        return await lote.findAll({
            where: {
                produtoId: id,
                validade: {
                    [sequelize.Op.gte]: new Date()
                }
            },
            attributes: [[sequelize.fn('sum', sequelize.col('qtd')), 'sumQtd']],
            raw: true
        });
    }

    async findByInsumoId(id) {
        try {
            const result = await lote.findAll( 
                {
                    where: {
                        insumoId: id,
                        validade: {
                            [sequelize.Op.gte]: new Date()
                        }
                    },
                    order:[
                        ['validade','ASC']
                    ]
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
                    },
                    order:[
                        ['validade','ASC']
                    ]
                }
            )
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async update(data) {
        try {
            let valid = await this.validaLote(data)

            if(valid) 
                return valid

            await lote.update(data, { where: { id: data.id } })
            return { status: 204, error: null }
        } catch (error) {
            return { status: 500, error: error }
        }
    }

}

module.exports = new LoteService();