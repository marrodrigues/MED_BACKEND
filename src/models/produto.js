module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('produto', {
        nome:DataTypes.STRING,
        descricao:DataTypes.STRING,
        tamanho: DataTypes.STRING,
        valor: DataTypes.DOUBLE,
        lote: DataTypes.STRING,
        validade: DataTypes.DOUBLE
    })

    Produto.associate = models => {
        Produto.belongsToMany(models.insumo, {through: "insumos_produtos", as: "insumos", constraints: false})
        Produto.belongsToMany(models.pedido, {through: "pedidos_produtos"})
        Produto.hasMany(models.insumos_produto, {as: "insumosProdutos"})
    }

    return Produto
}