module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('produto', {
        nome:DataTypes.STRING,
        tamanho: DataTypes.STRING,
        valor: DataTypes.DOUBLE,
    })

    Produto.associate = models => {
        Produto.belongsToMany(models.insumo, {through: "insumos_produtos", as: "insumos", constraints: false})
        Produto.hasMany(models.insumos_produto, {as: "insumosProdutos"})
        Produto.hasMany(models.lote, {as: "lote"})
        Produto.belongsToMany(models.pedido, {through: "pedidos_produtos", as: "pedidos", constraints: false})
        Produto.hasMany(models.pedidos_produto, {as: "pedidosProdutos"})
    }

    return Produto
}