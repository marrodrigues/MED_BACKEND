module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('pessoas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      cpf: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      login: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      senha: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      dataNascimento: {
        allowNull: false,
        type: DataTypes.DATEONLY,
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
      queryInterface.createTable('funcionarios', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        cargo: {
          allowNull: false,
          type: DataTypes.STRING,
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
        PessoaId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'pessoas',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      })
    }).then(() => {
      queryInterface.createTable('clientes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        flag_bloqueado: {
          allowNull: false,
          defaultValue: 0,
          type: DataTypes.INTEGER,
        },
        motivo_bloqueio: {
          type: DataTypes.STRING,
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
        PessoaId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'pessoas',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      })
    }).then(() => {
      queryInterface.createTable('enderecos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        logradouro: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        numero: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        complemento: {
          type: DataTypes.STRING,
        },
        CEP: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        bairro: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        cidade: {
          allowNull: false,
          type: DataTypes.STRING,
          defaultValue: 'Rio de Janeiro'
        },
        UF: {
          allowNull: false,
          type: DataTypes.STRING,
          defaultValue: 'RJ'
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
        PessoaId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'pessoas',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      })
    }).then(() => {
      queryInterface.createTable('telefones', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        DDD: {
          allowNull: false,
          type: DataTypes.INTEGER,
          defaultValue: 21
        },
        numero_telefone: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        tipo: {
          type: DataTypes.STRING,
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
        PessoaId: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: 'pessoas',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      })
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('clientes')
          .then(() => {queryInterface.dropTable('pessoas')})
          .then(() => {queryInterface.dropTable('enderecos')})
          .then(() => {queryInterface.dropTable('telefones')});
  }
};
