const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class PendenciaUsers extends Model {
  static init(sequelize) {
    super.init(
      { 
          user_id: Sequelize.INTEGER,
          pendencia_id:Sequelize.INTEGER,
          total_value: Sequelize.DECIMAL(10, 2),
          status: Sequelize.BOOLEAN,  
      },
      {
        sequelize,
        
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Users, { foreignKey: 'user_id', as: 'users', onDelete: 'CASCADE' });
    this.hasMany(models.Pendencia, { foreignKey: 'pendencia_id', as: 'pendencias', onDelete: 'CASCADE' });
  }
  
}

module.exports = PendenciaUsers;