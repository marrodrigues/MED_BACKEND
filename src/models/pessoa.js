module.exports = (sequelize, DataTypes) => {
    const Pessoa = sequelize.define('Pessoa', {
        nome: DataTypes.STRING,
        login: DataTypes.STRING,
        senha: DataTypes.STRING,
        email: DataTypes.STRING,
        dataNascimento: DataTypes.DATE
    })

    return Pessoa
}