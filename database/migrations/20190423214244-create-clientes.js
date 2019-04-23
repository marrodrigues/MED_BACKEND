module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Clientes', {
      cpf: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      flag_bloqueado: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      motivo_bloqueio: {
        type: DataTypes.STRING,
      },
      idPessoa: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Clientes');
  }
};
