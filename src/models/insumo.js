module.exports = (sequelize, DataTypes) => {
    const Insumo = sequelize.define('insumo', {
        descricao:DataTypes.STRING,
        qtd_unid: DataTypes.INTEGER,
        unidade: DataTypes.STRING,
        valor_unitario: DataTypes.DOUBLE
    })

    Insumo.associate = models => {
        Insumo.hasMany(models.lote, {as: "lote"})
        Insumo.hasMany(models.insumos_produto, {as: "insumosProdutos"})
        Insumo.belongsToMany(models.produto, {through: "insumos_produtos", as: "produtos"})
    }

    return Insumo
}