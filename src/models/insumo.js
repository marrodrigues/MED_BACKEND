module.exports = (sequelize, DataTypes) => {
    const Insumo = sequelize.define('insumo', {
        descricao:DataTypes.STRING,
        qtd_unid: DataTypes.INTEGER,
        unidade: DataTypes.STRING,
        valor_unitario: DataTypes.DOUBLE
    })

    Insumo.associate = models => {
        Insumo.hasMany(models.lote, {as: "lote"})
        Insumo.belongsToMany(models.produto, {through: "insumo_produto"})
    }

    return Insumo
}