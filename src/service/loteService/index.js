const { lote } = require('../../models');

const insumoService = require('../insumoService')

class LoteService {

    async create(data) {
        try {
            const insumo = await insumoService.find(data.insumoId)
            if (!insumo){
                return { status: 404, error: "Insumo do lote em questão não foi encontrado."}
            }
            const result = await lote.create(data)
            return result
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

    async findAll() {
        try {
            const result = await lote.findAll()
            return result
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

    async update(data) {
        try {
            await lote.update(data.payload, { where: { id: data.id } })
            return { status: 204, error: null }
        } catch (error) {
            return { status: 500, error: error }
        }
    }

}

module.exports = new LoteService();