module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('pedido', {
        codigo: DataTypes.STRING,
        status: DataTypes.INTEGER,
        forma_pagamento: DataTypes.INTEGER,
        motivo_cancelamento: DataTypes.STRING,
        data_pedido: DataTypes.DATE,
        valor_total: DataTypes.DOUBLE,
        observacao: DataTypes.STRING,
        funcionarioId: DataTypes.INTEGER
    })

    Pedido.associate = models => {
        Pedido.belongsToMany(models.produto, {through: "pedidos_produtos", as: "produtos", constraints: false})
        Pedido.hasMany(models.pedidos_produto, {as: "pedidosProdutos"})
        Pedido.belongsTo(models.cliente, {as: "cliente"})
    }

    return Pedido
}