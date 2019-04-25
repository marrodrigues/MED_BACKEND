module.exports = (sequelize, DataTypes) => {
    const Telefone = sequelize.define('telefone', {
        DDD: DataTypes.INTEGER,
        numero: DataTypes.STRING,
        tipo: DataTypes.STRING,
    })

    return Telefone
}