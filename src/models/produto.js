module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('produto', {
        descricao:DataTypes.STRING,
        qtd_unid: DataTypes.INTEGER,
        unidade: DataTypes.STRING,
        valor_unitario: DataTypes.DOUBLE
    })

    Produto.associate = models => {
        Produto.belongsToMany(models.insumo, {through: "insumo_produto"})
        Produto.belongsToMany(models.pedido, {through: "pedido_produto"})
    }

    return Produto
}