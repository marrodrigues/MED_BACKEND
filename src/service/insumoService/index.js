const { insumo } = require('../../models');

class InsumoService {

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
                    attributes: { exclude: ["updatedAt", "insumoId"] }
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
                    attributes: { exclude: ["updatedAt", "insumoId"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findInsumos(insumos) {
        let res = true
        for(var insumo in insumos){
            const result = await this.find(insumo.id)
            if(!result){
                res = result
            }
        }
        return res
    }

    async update(data) {
        try {
            await insumo.update(data.payload, { where: { id: data.id } })
            return { status: 204, error: null}
        } catch (error) {
            return { status: 500, error: error }
        }
    }

}

module.exports = new InsumoService();