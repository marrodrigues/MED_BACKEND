module.exports = (sequelize, DataTypes) => {
    const Lote = sequelize.define('lote', {
        lote: DataTypes.STRING,
        qtd:  DataTypes.INTEGER,
        validade: DataTypes.DATEONLY,
        valor_unitario: DataTypes.DOUBLE,
    })

    Lote.associate = models => {
        Lote.belongsTo(models.produto, {as: "produto", constraints: false})
        Lote.belongsTo(models.insumo, {as: "insumo", constraints: false})
    }

    return Lote
}