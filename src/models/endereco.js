module.exports = (sequelize, DataTypes) => {
    const Endereco = sequelize.define('endereco', {
        logradouro: DataTypes.STRING,
        numero: DataTypes.STRING,
        complemento: DataTypes.STRING,
        CEP: DataTypes.STRING,
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        UF: DataTypes.STRING
    })

    return Endereco
}