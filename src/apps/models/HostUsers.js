const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class HostUsers extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        host_id: Sequelize.INTEGER,
      
      },
      {
        sequelize,
        modelName: 'hostUsers', 
        tableName: 'hostUsers',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });
    this.belongsTo(models.Hosts, { foreignKey: 'host_id', as: 'host', onDelete: 'CASCADE' });
  }
  
}

module.exports = HostUsers;