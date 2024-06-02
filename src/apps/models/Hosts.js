const bcryptjs = require('bcryptjs');
const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Hosts extends Model {
  static init(sequelize) {
    super.init(
      {
        server_name: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
        hooks: {
          beforeSave: async (user) => {
            if (user.password) {
              user.password_hash = await bcryptjs.hash(user.password, 8);
            }
          },
        },
      },
    );

    return this;
  }
  
  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Users, { foreignKey: 'user_id', as: 'users', onDelete: 'CASCADE' });
  }

  
}

module.exports = Hosts;


