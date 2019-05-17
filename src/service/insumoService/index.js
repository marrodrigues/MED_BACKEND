const { insumo } = require('../../models');

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
                },{
                    association: "insumosProdutos",
                    attributes: { exclude: ["createdAt","updatedAt"] }
                }],
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            return result
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findInsumos(insumos) {
        let res = true;
        for (var i=0 ; i < insumos.length; i++){
            const result = await this.find(insumos[i].id)
                if(!result){
                    res = false
                }
            }
        console.log(res)
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