const { produto } = require('../models');

const insumoService = require('./insumoService')
const insumoProdutoService = require('./insumoProdutoService')
const loteService = require('./loteService')

class ProdutoService {

    async create(data) {
        try {
            const existeProduto = await this.findByNomeAndTamanho(data)
            if (existeProduto)
                return { status: 409, error: 'Produto já cadastrado.' }

            if(data.tipo === 1) {
                const existeInsumos = await insumoService.insumosExist(data.insumos)
                if(!existeInsumos)
                    return { status: 404, error: 'Insumo não cadastrado.' }

                const resultProduto = await produto.create(data)
                const result = await insumoProdutoService.create(resultProduto.id, data.insumos)

                if(result.status === 200){
                    return resultProduto
                } else {
                    return result
                }
            } else if (data.tipo === 2) {
                const resultProduto = await produto.create(data)
                return resultProduto
            } else {
                return {status: 400, error: 'Tipo de produto inválido'}
            }
        } catch (error) {
            console.log(error)
            return { status: 500, error: error }
        }
    }

    async delete(id) {
        try {
            const result = await this.find(id)
            if (result == null) {
                return { status: 404, error: "O produto em questão não foi encontrado."}
            }
            if(result.tipo === 1) {
                const insumosProdutos = await insumoProdutoService.delete(id)
                if(insumosProdutos.status === 500)
                    return insumosProdutos
            } else if (result.tipo === 2) {
                const lotes = await loteService.findByProdutoId(id)
                lotes.map(async lote => {
                        await loteService.delete(lote.id)
                })
            } else {
                return {status: 400, error: 'Tipo de produto inválido'}
            }
            return await produto.destroy({ where: { id: id } })
        } catch (error) {
            return { status: 500, error: error }
        }
    }
    
    async find(id) {
        try {
            const result = await produto.findByPk(id, {
                include: [{
                    association: "insumos",
                    attributes: { exclude: ["createdAt", "updatedAt", "produtoId"] }
                },{
                    association: "insumosProdutos",
                    attributes: { exclude: ["createdAt","updatedAt"] }
                },{
                    association: "lote",
                    attributes: { exclude: ["createdAt","updatedAt"] }
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
            const result = await produto.findAll({
                include: [{
                    association: "insumosProdutos",
                    attributes: { exclude: ["id","createdAt","updatedAt","produtoId"] }
                },{
                    association: "lote",
                    attributes: { exclude: ["createdAt","updatedAt"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findByNome(produtoNovo){
        try {
            const result =  await produto.findAll({
                    include: [{
                        association: "insumosProdutos",
                        attributes: { exclude: ["id","createdAt","updatedAt","produtoId"] }
                    },{
                        association: "lote",
                        attributes: { exclude: ["createdAt","updatedAt"] }
                    }],
                    where: { nome: produtoNovo.nome }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findByNomeAndTamanho(produtoNovo) {
        try {
            const result =  await produto.findOne({
                    include: [{
                        association: "insumosProdutos",
                        attributes: { exclude: ["id","createdAt","updatedAt","produtoId"] }
                    },{
                        association: "lote",
                        attributes: { exclude: ["createdAt","updatedAt"] }
                    }],
                    where: {
                        nome: produtoNovo.nome,
                        tamanho: produtoNovo.tamanho
                    }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async update(data) {
        try {
            const existeProduto = await this.find(data.id)
            if (!existeProduto)
                return { status: 404, error: 'Produto não cadastrado.' }

            if(data.payload.tipo === 1) {
                const existeInsumos = await insumoService.insumosExist(data.payload.insumos)
                if(!existeInsumos)
                    return { status: 404, error: 'Insumo não cadastrado.' }

                await produto.update(data.payload, { where: { id: data.id } })

                const insumosProdutos = await insumoProdutoService.delete(data.id) // verificar se os lotes não estão sendo excluidos
                if(insumosProdutos.status === 500)
                    return insumosProdutos

                await insumoProdutoService.create(data.id, data.payload.insumos)
                return { status: 200, error: null }   
            } else if (data.payload.tipo === 2) {
                await produto.update(data.payload, { where: { id: data.id } })

                // let lotes = await loteService.findByProdutoId(data.id)

                // lotes.map(async lote => {
                //     await loteService.update(lote)
                // })
                return { status: 200, error: null }
            } else {
                return { status: 400, error: 'Tipo de produto inválido.' }   
            }
        } catch (error) {
            console.log(error)
            return { status: 500, error: error }
        }
    }
}
module.exports = new ProdutoService();