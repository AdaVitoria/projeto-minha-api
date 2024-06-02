module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pendenciaUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id',
          onDelete: 'CASCADE',  
        },
      },
      pendencia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pendencias', 
          key: 'id',
          onDelete: 'CASCADE',  
        },
      },
      total_value: {
        type: Sequelize.DECIMAL(10, 2)
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pendenciaUsers');
  },
};