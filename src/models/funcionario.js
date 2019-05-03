module.exports = (sequelize, DataTypes) => {
    const Funcionario = sequelize.define('funcionario', {
        cpf: DataTypes.STRING,
        cargo: DataTypes.STRING,
    })

    Funcionario.associate = models => {
        Funcionario.belongsTo(models.pessoa, {as: "pessoa"})
    }

    return Funcionario
}