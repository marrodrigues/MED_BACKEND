const config = require('../../config/db.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

class RelatorioService {

    async findSellingsByProducts(data){
        try {
            let valorTotal = 0
            const sql = "select pr.id, pr.nome, count(ped.codigo) qtd_pedidos, sum(pp.qtd) qtd_vendido, sum(ped.valor_total) receita " + 
                            "from `pedidos` as ped " + 
                            "join `pedidos_produtos` as pp on ped.id = pp.`pedidoId` " + 
                            "join `produtos` as pr on pr.id = pp.`produtoId` " + 
                            "where ped.data_pedido between :startDate and :endDate " + 
                            "and ped.status = 1 and pr.tipo = :type " + 
                            "group by pr.nome"
            let sellings = await sequelize.query(
                        sql, 
                        {
                            replacements: {
                                startDate: data.startDate, 
                                endDate: data.endDate,
                                type: data.type
                            }, 
                            type: sequelize.QueryTypes.SELECT
                        })

            if(!sellings || sellings.lengh == 0){
                return {status: 404, error: 'Nenhuma venda do tipo ' + data.type + ' foi realizada no periodo em questão.'}
            }
            return sellings
        } catch (error) {
            return { status: 500, error: error }
        }
    }
}

module.exports = new RelatorioService();