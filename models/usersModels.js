const sequelize = require('../db/connection.js')
const Sequelize = require('sequelize');

const Model = Sequelize.Model;
class User extends Model {}
User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  uuid: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  balance: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {
  sequelize,
  modelName: 'User'
})

const selectAllUsers = async () => {
  const users = await User.findAll();
  console.log("All Users:", JSON.stringify(users, null, 4));
  return users;
}

const selectUser = async (id) => {
  const user = await User.findAll({
    where: {
      id
    }
  });
  console.log("user:", JSON.stringify(user, null, 4));
  return user;
}

const insertUser = async (user) => {
  const insert = await User.create(user);
  console.log("Response:", JSON.stringify(insert, null, 4));
  return insert;
}

const updateUser = async (id, update) => {
  const user = await User.update(update, {
    where: {
      id
    }
  });
  console.log("Result:", JSON.stringify(user, null, 4));
  return user;
}

const deleteUser = async (id) => {
  const user = await User.destroy({
    where: {
      id
    }
  });
  console.log("Result:", JSON.stringify(user, null, 4));
  return user;
}

const validateUser = async (username) => {
  const user = await User.findAll({
    where: {
      username
    }
  });
  return user;
}

module.exports = {
  selectAllUsers,
  selectUser,
  insertUser,
  updateUser,
  deleteUser,
  validateUser
}