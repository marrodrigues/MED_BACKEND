module.exports = (sequelize, DataTypes) => {
    const Pedido = sequelize.define('pedido', {
        descricao:DataTypes.STRING,
        qtd_unid: DataTypes.INTEGER,
        unidade: DataTypes.STRING,
        valor_unitario: DataTypes.DOUBLE
    })

    Pedido.associate = models => {
        Pedido.belongsToMany(models.produto, {through: "pedido_produto"})
    }

    return Pedido
}