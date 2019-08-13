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
    }).then(() => {
      queryInterface.createTable('insumos', {
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
          type: DataTypes.INTEGER
        },
        unidade: {
          allowNull: false,
          type: DataTypes.STRING
        },
        createdAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        }
      })
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
          type: DataTypes.INTEGER
        },
        lote: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true
        },
        validade: {
          allowNull: false,
          type: DataTypes.DATEONLY
        },
        valor_unitario: {
          allowNull: false,
          type: DataTypes.DOUBLE
        },
        createdAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        },
        InsumoId: {
          type: DataTypes.INTEGER
        },
        ProdutoId: {
          type: DataTypes.INTEGER
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
          type: DataTypes.STRING
        },
        tamanho: {
          allowNull: false,
          type: DataTypes.STRING
        },
        valor: {
          allowNull: false,
          type: DataTypes.DOUBLE
        },
        tipo: {
          allowNull: false,
          type: DataTypes.STRING
        },
        createdAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        }
      })
    }).then(() => {
      queryInterface.createTable('pedidos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        codigo:{
          allowNull: false,
          type: DataTypes.STRING
        },
        status: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        forma_pagamento: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        motivo_cancelamento: {
          type: DataTypes.STRING
        },
        data_pedido: {
          allowNull: false,
          type: DataTypes.DATEONLY
        },
        valor_total: {
          allowNull: false,
          type: DataTypes.DOUBLE
        },
        observacao: {
          type: DataTypes.STRING
        },
        funcionarioId: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        createdAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        },
        clienteId: {
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
          type: DataTypes.INTEGER
        },
        produtoId: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        qtd: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        createdAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        }
      })
    }).then(() => {
      queryInterface.createTable('pedidos_produtos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        pedidoId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        produtoId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        qtd: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        createdAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          defaultValue: DataTypes.NOW,
          type: DataTypes.DATE
        }
      })
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('insumos_produtos')
          .then(() => {queryInterface.dropTable('pedidos_produtos')})
          .then(() => {queryInterface.dropTable('pedidos')})
          .then(() => {queryInterface.dropTable('produtos')})
          .then(() => {queryInterface.dropTable('lotes')})
          .then(() => {queryInterface.dropTable('insumos')})
          .then(() => {queryInterface.dropTable('clientes')})
          .then(() => {queryInterface.dropTable('funcionarios')})
          .then(() => {queryInterface.dropTable('enderecos')})
          .then(() => {queryInterface.dropTable('telefones')})
          .then(() => {queryInterface.dropTable('pessoas')})
  }
};