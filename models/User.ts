import db  from '../src/config/Database';
import Sequelize from 'sequelize';
 const User = db.define('User', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    },
    {
        freezeTableName: true,
        underscored: true,
        timestamps: true
    }
);

User.sync().
    then(() => {
        console.log("Customer table created")
    })
    .catch(error =>
        console.error(error))

export default User;