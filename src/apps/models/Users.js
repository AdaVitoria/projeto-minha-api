const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const bcryptjs = require('bcryptjs');

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        user_name: Sequelize.STRING,
        email: Sequelize.STRING,
        gender: Sequelize.STRING,
        birth_date: Sequelize.DATEONLY,
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
}

module.exports = Users;



