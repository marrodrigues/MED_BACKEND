module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('insumos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      descricao: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      qtd_unid: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      unidade: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      valor_unitario: {
        allowNull: false,
        type: DataTypes.DOUBLE,
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
    }).then(() => {
      queryInterface.createTable('lotes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        qtd: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        lote: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true
        },
        validade: {
          allowNull: false,
          type: DataTypes.DATEONLY,
        },
        valor_total: {
          allowNull: false,
          type: DataTypes.DOUBLE,
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
        InsumoId: {
          type: DataTypes.INTEGER,
        },
        ProdutoId: {
          type: DataTypes.INTEGER,
        }
      })
    }).then(() => {
      queryInterface.createTable('produtos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        nome: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        tamanho: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        valor: {
          type: DataTypes.DOUBLE,
          allowNull: false
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
      })
    }).then(() => {
      queryInterface.createTable('pedidos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        status: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        forma_pagamento: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        motivo_cancelamento: {
          type: DataTypes.STRING,
        },
        data_pedido: {
          allowNull: false,
          type: DataTypes.DATEONLY,
        },
        valor_total: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        observacao: {
          type: DataTypes.STRING,
        },
        funcionarioId: {
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
        ClienteId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'clientes',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      })
    }).then(() => {
      queryInterface.createTable('insumos_produtos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        insumoId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        produtoId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        qtd: {
          type: DataTypes.INTEGER,
          allowNull: false
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
      })
    }).then(() => {
      queryInterface.createTable('pedidos_produtos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
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
        pedidosId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'pedidos',
            key: 'id'
          },
        },
        produtoId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'produtos',
            key: 'id'
          },
        },
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('insumos_produtos')
          .then(() => {queryInterface.dropTable('pedidos_produtos')})
          .then(() => {queryInterface.dropTable('pedidos')})
          .then(() => {queryInterface.dropTable('produtos')})
          .then(() => {queryInterface.dropTable('lotes')})
          .then(() => {queryInterface.dropTable('insumos')})
  }
};
