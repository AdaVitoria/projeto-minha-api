'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('hosts', 'hosts_ibfk_1');

    await queryInterface.addConstraint('hosts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'hosts_user_id_fk', 
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('hosts', 'hosts_user_id_fk');

    await queryInterface.addConstraint('hosts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'hosts_ibfk_1', 
      references: {
        table: 'users',
        field: 'id',
      },
    });
  }
};
