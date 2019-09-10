const { insumo } = require('../models');

const loteService = require('./loteService')

class InsumoService {

    constructor() {
        this.find = this.find.bind(this) 
    }

    async create(data) {
        try {
            const result = await insumo.create(data)
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async delete(id) {
        try {
            const result = await this.find(id)
            if (result == null) {
                return { status: 404, error: "O insumo em questão não foi encontrado."}
            }
            return await insumo.destroy({
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
            const result = await insumo.findByPk(id, {
                include: [{
                    association: "lote",
                    attributes: { exclude: ["updatedAt", "insumoId", "produtoId"] }
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
            const result = await insumo.findAll({
                include: [{
                    association: "lote",
                    attributes: { exclude: ["updatedAt", "insumoId", "produtoId"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findByDescricao(data) {
        try {
            const result = await insumo.findOne({
                where: {
                    descricao: data
                }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async insumosExist(insumos) {
        let res = true;
        insumos.map(async i =>{
            const result = await this.find(insumos[i].id)
            if(!result){
                res = false
            }
        })
        console.log(res)
        return res
    }

    async update(data) {
        try {
            const existeInsumo = await this.find(data.id)

            if (!existeInsumo)
                return { status: 404, error: 'Insumo não cadastrado.' }

            await insumo.update(data.payload, { where: { id: data.id } })
            let lotes = await loteService.findByInsumoId(data.id)
                lotes.map(async lote => {
                    await loteService.update(lote)
                })
            return { status: 204, error: null}
        } catch (error) {
            return { status: 500, error: error }
        }
    }

}

module.exports = new InsumoService();