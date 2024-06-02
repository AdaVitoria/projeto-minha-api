module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pendencias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_host: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'hosts', 
          key: 'id', 
          onDelete: 'CASCADE', 
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING
      },
      due_date: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('pendencias');
  },
};