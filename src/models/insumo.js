module.exports = (sequelize, DataTypes) => {
    const Insumo = sequelize.define('insumo', {
        descricao:DataTypes.STRING,
        qtd_unid: DataTypes.INTEGER,
        unidade: DataTypes.STRING,
    })

    Insumo.associate = models => {
        Insumo.belongsToMany(models.produto, {through: "insumos_produtos", as: "produtos"})
        Insumo.hasMany(models.insumos_produto, {as: "insumosProdutos"})
        Insumo.hasMany(models.lote, {as: "lote"})
    }

    return Insumo
}