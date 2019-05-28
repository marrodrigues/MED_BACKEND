module.exports = (sequelize, DataTypes) => {
    const Lote = sequelize.define('lote', {
        lote: DataTypes.STRING,
        qtd:  DataTypes.INTEGER,
        validade: DataTypes.DATEONLY,
        valor_total: DataTypes.DOUBLE,
    })

    return Lote
}