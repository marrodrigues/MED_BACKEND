module.exports = (sequelize, DataTypes) => {
    const Lote = sequelize.define('lote', {
        lote: DataTypes.STRING,
        qtd:  DataTypes.INTEGER,
        validade: DataTypes.DATEONLY,
        valor_unitario: DataTypes.DOUBLE,
    })

    return Lote
}