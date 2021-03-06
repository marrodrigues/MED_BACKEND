const config = require('../../config/db.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

class RelatorioService {

    async findSellingsByClients(data){
        try {
            let sql = "select c.id, pes.cpf, pes.nome, count(ped.codigo) qtd_pedidos, " +
                                                            "sum(ped.valor_total) receita " +
                            "from heroku_f1d31755cbdc0e8.pedidos ped " +
                            "join heroku_f1d31755cbdc0e8.clientes c " +
                                "on c.id = ped.`clienteId` " +
                            "join heroku_f1d31755cbdc0e8.pessoas pes " +
                                "on pes.id = c.`PessoaId` " +
                            "where ped.status = 3 " +
                                "and ped.data_pedido between :startDate and :endDate "
            if(data.body && data.body.length > 0){
                sql = sql + "and c.id in ("
                for(let i = 0; i < data.body.length; i++){
                    sql = sql + "'" + data.body[i] + "'"
                    if(i < 4){
                        sql = sql + ", "
                    }
                }
                sql = sql + ") "
            }
            sql = sql + "group by c.id order by receita desc limit 5"
            let sellings = await sequelize.query(
                        sql, 
                        {
                            replacements: {
                                startDate: data.startDate, 
                                endDate: data.endDate,
                            }, 
                            type: sequelize.QueryTypes.SELECT
                        })

            if(!sellings || sellings.length == 0){
                return {status: 404}
            }
            return sellings
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findSellingsByEmployee(data){
        try {
            let sql = "select f.id, pes.cpf, pes.nome, count(ped.codigo) qtd_pedidos, " +
                                                            "sum(ped.valor_total) receita " +
                            "from heroku_f1d31755cbdc0e8.pedidos ped " +
                            "join heroku_f1d31755cbdc0e8.funcionarios f " +
                                "on f.id = ped.`funcionarioId` " +
                            "join heroku_f1d31755cbdc0e8.pessoas pes " +
                                "on pes.id = f.`PessoaId` " +
                            "where ped.status = 3 " +
                                "and ped.data_pedido between :startDate and :endDate "
            
            if(data.body && data.body.length > 0){
                sql = sql + "and f.id in ("
                for(let i = 0; i < data.body.length; i++){
                    sql = sql + "'" + data.body[i] + "'"
                    if(i < 4){
                        sql = sql + ", "
                    }
                }
                sql = sql + ") "
            }
            sql = sql + "group by f.id order by receita desc limit 5"

            let sellings = await sequelize.query(
                        sql, 
                        {
                            replacements: {
                                startDate: data.startDate, 
                                endDate: data.endDate,
                            }, 
                            type: sequelize.QueryTypes.SELECT
                        })

            if(!sellings || sellings.length == 0){
                return {status: 404}
            }
            return sellings
        } catch (error) {
            return { status: 500, error: error }
        }
    }

    async findSellingsByProducts(data){
        try {
            let sql = "select pr.id, pr.nome, count(ped.codigo) qtd_pedidos, sum(pp.qtd) qtd_vendido, " +
                    "sum(ped.valor_total) receita " +
                    "from heroku_f1d31755cbdc0e8.pedidos as ped " +
                    "join heroku_f1d31755cbdc0e8.pedidos_produtos as pp on ped.id = pp.`pedidoId` " +
                    "join heroku_f1d31755cbdc0e8.produtos as pr on pr.id = pp.`produtoId` " +
                    "where ped.data_pedido between :startDate and :endDate " +
                    "and ped.status = 3 and pr.tipo = :type "

            if(data.body && data.body.length > 0){
                sql = sql + "and pr.id in ("
                for(let i = 0; i < data.body.length; i++){
                    sql = sql + "'" + data.body[i] + "'"
                    if(i < 4){
                        sql = sql + ", "
                    }
                }
                sql = sql + ") "
            }
                    
            sql = sql + "group by pr.nome " +
            "order by receita desc limit 5"; 

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

            if(!sellings || sellings.length == 0){
                return {status: 404}
            }
            return sellings
        } catch (error) {
            return { status: 500, error: error }
        }
    }

}

module.exports = new RelatorioService();