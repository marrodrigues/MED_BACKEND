module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('cliente', {
        cpf: DataTypes.INTEGER,
        flag_bloqueado: DataTypes.INTEGER,
        motivo_bloqueio: DataTypes.STRING,
    })

    Cliente.associate = models => {
        Cliente.belongsTo(models.pessoa, {as: "pessoa"})
    }

    return Cliente
}