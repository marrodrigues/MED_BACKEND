module.exports = (sequelize, DataTypes) => {
    const Telefone = sequelize.define('telefone', {
        DDD: DataTypes.INTEGER,
        numero_telefone: DataTypes.STRING,
        tipo: DataTypes.STRING,
    })

    return Telefone
}