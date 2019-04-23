module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
        cpf: DataTypes.INTEGER,
        flag_bloqueado: DataTypes.INTEGER,
        motivo_bloqueio: DataTypes.STRING,
    })

    Cliente.associate = models => {
        Cliente.belongsTo(models.Pessoa)
    }

    return Cliente
}