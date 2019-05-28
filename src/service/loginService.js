const clienteService = require('./clienteService')
const funcionarioService = require('./funcionarioService')

class LoginService {

    async getRole(id) {
        try {
            const cliente = await clienteService.findByPessoaId(id)
            if (cliente) {
                return { role: 'Cliente' }
            } else {
                const funcionario = await funcionarioService.findByPessoaId(id)
                if (!funcionario) return { role: 'Erro na busca' }
                if (funcionario.cargo === 'Admin') {
                    return { role: 'Admin' }
                } else if (funcionario.cargo === 'Funcionario') {
                    return { role: 'Funcionario' }
                } else {
                    return { role: 'Erro na busca' }
                }
            }
        } catch (error) {
            return { status: 500, error: error }
        }
    }

}

module.exports = new LoginService();