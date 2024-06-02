const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Pendencia extends Model {
  static init(sequelize) {
    super.init(
      { 
          title:  Sequelize.STRING,
          id_host: Sequelize.INTEGER,
          description: Sequelize.STRING,
          status: Sequelize.STRING,
          due_date: Sequelize.DATEONLY,
          total_value: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
        
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Hosts, { foreignKey: 'id_host', as: 'hosts', onDelete: 'CASCADE' });
  }
  
}

module.exports = Pendencia;


