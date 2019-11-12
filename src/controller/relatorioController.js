const relatorioService = require('../service/relatorioService')

class RelatorioController {

    findSellingsByProducts(req, res) {
        let startDate = req.params.startDate + ' 00:00:01';
        let endDate = req.params.endDate + ' 23:59:59';
        let type = req.params.type;
        if (!startDate || !endDate)
            res.status(400).send('Dados inconsistentes ao tentar excluir pedido.')
        let data = {
            "startDate": startDate,
            "endDate": endDate,
            "type": type
        }
        relatorioService.findSellingsByProducts(data).then(result => {
            if (!result || result.status === 404) {
                res.status(404).send('Sem dados de vendas no período.')
            } else {
                res.status(200).send(result)
            }
        })
    }

}

module.exports = new RelatorioController();