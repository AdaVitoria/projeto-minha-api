'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'birth_date', {
      type: Sequelize.DATEONLY,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'birth_date', {
      type: Sequelize.DATE,
    });
  },
};
