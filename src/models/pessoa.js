module.exports = (sequelize, DataTypes) => {
    const Pessoa = sequelize.define('pessoa', {
        cpf: DataTypes.STRING,
        nome: DataTypes.STRING,
        login: DataTypes.STRING,
        senha: DataTypes.STRING,
        email: DataTypes.STRING,
        dataNascimento: DataTypes.DATEONLY
    })

    Pessoa.associate = models => {
        Pessoa.hasMany(models.endereco, {as: "endereco"})
        Pessoa.hasMany(models.telefone, {as: "telefone"})
    }

    return Pessoa
}