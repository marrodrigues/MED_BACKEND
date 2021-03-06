const relatorioService = require('../service/relatorioService')

class RelatorioController {

    findSellingsByClients(req, res) {
        let ano = Number(req.params.ano)
        let mes = Number(req.params.mes)
        let mesSeguinte = 0
        let startDate = ''
        let endDate = ''
        if(mes >= 12){
            let anoSeguinte = ano + 1
            mesSeguinte = '01'
            startDate = ano + '-' + mes + '-01 00:00:00'
            endDate = anoSeguinte + '-' + mesSeguinte + '-01 00:00:00'
        } else {
            mesSeguinte = mes + 1
            if(mes < 10) mes = '0' + mes
            if(mesSeguinte < 10) mesSeguinte = '0' + mesSeguinte
            startDate = ano + '-' + mes + '-01 00:00:00'
            endDate = ano + '-' + mesSeguinte + '-01 00:00:00'
        }
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
        let ano = Number(req.params.ano)
        let mes = Number(req.params.mes)
        let mesSeguinte = 0
        let startDate = ''
        let endDate = ''
        if(mes >= 12){
            let anoSeguinte = ano + 1
            mesSeguinte = '01'
            startDate = ano + '-' + mes + '-01 00:00:00'
            endDate = anoSeguinte + '-' + mesSeguinte + '-01 00:00:00'
        } else {
            mesSeguinte = mes + 1
            if(mes < 10) mes = '0' + mes
            if(mesSeguinte < 10) mesSeguinte = '0' + mesSeguinte
            startDate = ano + '-' + mes + '-01 00:00:00'
            endDate = ano + '-' + mesSeguinte + '-01 00:00:00'
        }
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
        let ano = Number(req.params.ano)
        let mes = Number(req.params.mes)
        let type = req.params.type
        let mesSeguinte = 0
        let startDate = ''
        let endDate = ''
        if(mes >= 12){
            let anoSeguinte = ano + 1
            mesSeguinte = '01'
            startDate = ano + '-' + mes + '-01 00:00:00'
            endDate = anoSeguinte + '-' + mesSeguinte + '-01 00:00:00'
        } else {
            mesSeguinte = mes + 1
            if(mes < 10) mes = '0' + mes
            if(mesSeguinte < 10) mesSeguinte = '0' + mesSeguinte
            startDate = ano + '-' + mes + '-01 00:00:00'
            endDate = ano + '-' + mesSeguinte + '-01 00:00:00'
        }
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