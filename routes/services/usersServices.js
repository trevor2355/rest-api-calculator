const sequelize = require('../../db/connection.js');
const { Sequelize, Op } = require('sequelize');
const helpers = require('../helpers/helpers.js');

const Model = Sequelize.Model;
class User extends Model {};
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
  hash: {
    type: Sequelize.STRING
  },
  salt: {
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
  modelName: 'User',
  paranoid: true,
  timestamps: true,
  deletedAt: 'deleted_At'
});


const selectAllUsers = async (page, pageSize, searchTerm, filterFields, sortBy, order) => {
  let attributes = helpers.acceptedAttributes(Object.keys(User.rawAttributes));
  let validatedFilterFields;
  if (filterFields.length === 0) {
    validatedFilterFields = attributes;
  } else {
    validatedFilterFields = helpers.validateFields(filterFields, attributes);
  }
  if (!sortBy) {
    sortBy = 'id';
  };
  if (!order) {
    order = 'ASC';
  };
  const users = await User.findAndCountAll({
    where: {
      ...helpers.filter(searchTerm, validatedFilterFields, 'User')
    },
    order: [
      [sortBy, order]
    ],
    ...helpers.paginate({ page, pageSize })
  });
  return users;
};

const selectUser = async (id) => {
  const user = await User.findOne({
    where: {
      id
    }
  });
  return user;
};

const insertUser = async (user) => {
  const insert = await User.create(user);
  return insert;
};

const updateUser = async (id, update) => {
  const user = await User.update(update, {
    where: {
      id
    }
  });
  return user;
};

const deleteUser = async (id) => {
  const user = await User.destroy({
    where: {
      id
    }
  });
  return user;
};

// This is used to look up a user by username (used when logging in)

const validateUser = async (username) => {
  const user = await User.findAll({
    where: {
      username
    }
  });
  return user;
};

module.exports = {
  selectAllUsers,
  selectUser,
  insertUser,
  updateUser,
  deleteUser,
  validateUser,
  User
};