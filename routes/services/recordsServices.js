const sequelize = require('../../db/connection.js');
const { Sequelize, Op } = require('sequelize');
const helpers = require('../helpers/helpers.js');

const Model = Sequelize.Model;
class Record extends Model {};
Record.init({
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
  service_id: {
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  cost: {
    type: Sequelize.INTEGER
  },
  user_balance: {
    type: Sequelize.INTEGER
  },
  service_response: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
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
  modelName: 'Record',
  paranoid: true,
  timestamps: true,
  deletedAt: 'deleted_At'
});

const selectAllRecords = async (page, pageSize, searchTerm, filterFields, sortBy, order) => {
  let attributes = helpers.acceptedAttributes(Object.keys(Record.rawAttributes));
  let validatedFilterFields;
  if (filterFields.length === 0) {
    validatedFilterFields = attributes;
  } else {
    validatedFilterFields = helpers.validateFields(filterFields, attributes);
  };
  if (!sortBy) {
    sortBy = 'id';
  };
  if (!order) {
    order = 'ASC';
  };
  const records = await Record.findAndCountAll({
    where: {
      ...helpers.filter(searchTerm, validatedFilterFields, 'Record')
    },
    order: [
      [sortBy, order]
    ],
    ...helpers.paginate({ page, pageSize })
  });
  return records;
};

const selectRecord = async (id) => {
  const record = await Record.findAll({
    where: {
      id
    }
  });
  return record;
};

const selectAllRecordsOfUser = async (user_id, page, pageSize, searchTerm, filterFields, sortBy, order) => {
  let attributes = helpers.acceptedAttributes(Object.keys(Record.rawAttributes));
  let validatedFilterFields;
  if (filterFields.length === 0) {
    validatedFilterFields = attributes;
  } else {
    validatedFilterFields = helpers.validateFields(filterFields, attributes);
  };
  if (!sortBy) {
    sortBy = 'id';
  };
  if (!order) {
    order = 'ASC';
  };
  const records = await Record.findAndCountAll({
    where: {
      user_id,
      ...helpers.filter(searchTerm, validatedFilterFields, 'Record')
    },
    order: [
      [sortBy, order]
    ],
    ...helpers.paginate({ page, pageSize })
  });
  return records;
};

const insertRecord = async (record) => {
  const insert = await Record.create(record);
  return insert;
};

const updateRecord = async (id, update) => {
  const record = await Record.update(update, {
    where: {
      id
    }
  });
  return record;
};

const deleteRecord = async (id) => {
  const record = await Record.destroy({
    where: {
      id
    }
  });
  return record;
};

module.exports = {
  selectAllRecords,
  selectRecord,
  selectAllRecordsOfUser,
  insertRecord,
  updateRecord,
  deleteRecord
};