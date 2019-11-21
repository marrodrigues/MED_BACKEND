const relatorioService = require('../service/relatorioService')

class RelatorioController {

    findSellingsByClients(req, res) {
        const mes = req.params.mes
        const ano = req.params.ano + '-'
        const mesSeguinte = Number(mes) + 1
        const startDate = ano + mes + '-01 00:00:00'
        const endDate = ano + mesSeguinte + '-01 00:00:00'
        let body = []
        if(req.body && Array.isArray(req.body)){
            body = req.body 
        }
        if (!startDate || !endDate)
            res.status(400).send('Dados inconsistentes ao tentar excluir pedido.')
        let data = {
            "startDate": startDate,
            "endDate": endDate,
            "body": body
        }
        relatorioService.findSellingsByClients(data).then(result => {
            if (!result || result.status === 404) {
                res.status(404).send('Sem dados de vendas no período.')
            } else {
                res.status(200).send(result)
            }
        })
    }

    findSellingsByEmployee(req, res) {
        const mes = req.params.mes
        const ano = req.params.ano + '-'
        const mesSeguinte = Number(mes) + 1
        const startDate = ano + mes + '-01 00:00:00'
        const endDate = ano + mesSeguinte + '-01 00:00:00'
        let body = []
        if(req.body && Array.isArray(req.body)){
            body = req.body 
        }
        if (!startDate || !endDate)
            res.status(400).send('Dados inconsistentes ao tentar excluir pedido.')
        let data = {
            "startDate": startDate,
            "endDate": endDate,
            "body": body
        }
        relatorioService.findSellingsByEmployee(data).then(result => {
            if (!result || result.status === 404) {
                res.status(404).send('Sem dados de vendas no período.')
            } else {
                res.status(200).send(result)
            }
        })
    }

    findSellingsByProducts(req, res) {
        const mes = req.params.mes
        const ano = req.params.ano + '-'
        const mesSeguinte = Number(mes) + 1
        const startDate = ano + mes + '-01 00:00:00'
        const endDate = ano + mesSeguinte + '-01 00:00:00'
        const type = req.params.type;
        let body = []
        if(req.body && Array.isArray(req.body)){
            body = req.body 
        }
        if (!startDate || !endDate || !type)
            res.status(400).send('Dados inconsistentes ao tentar excluir pedido.')
        let data = {
            "startDate": startDate,
            "endDate": endDate,
            "type": type,
            "body": body
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