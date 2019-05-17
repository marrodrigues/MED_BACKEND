module.exports = (sequelize, DataTypes) => {
    const InsumoProduto = sequelize.define('insumos_produto', {
        insumoId: DataTypes.INTEGER,
        produtoId: DataTypes.INTEGER,
        qtd: DataTypes.INTEGER,
    })

    return InsumoProduto
}