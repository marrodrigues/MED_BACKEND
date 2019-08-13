module.exports = (sequelize, DataTypes) => {
    const PedidoProduto = sequelize.define('pedidos_produto', {
        pedidoId: DataTypes.INTEGER,
        produtoId: DataTypes.INTEGER,
        qtd: DataTypes.INTEGER
    })

    return PedidoProduto
}