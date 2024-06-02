module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hostUsers', {
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
      host_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'hosts', 
          key: 'id',
          onDelete: 'CASCADE',  
        },
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
    await queryInterface.dropTable('hostUsers');
  },
};