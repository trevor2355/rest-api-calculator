const sequelize = require('../db/connection.js')
const Sequelize = require('sequelize');

const Model = Sequelize.Model;
class Record extends Model {}
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
  modelName: 'Record'
})

const selectAllRecords = async () => {
  const records = await Record.findAll();
  return records;
}

const selectRecord = async (id) => {
  const record = await Record.findAll({
    where: {
      id
    }
  });
  return record;
}

const selectAllRecordsOfUser = async (user_id) => {
  const record = await Record.findAll({
    where: {
      user_id
    }
  });
  return record;
}

const insertRecord = async (record) => {
  const insert = await Record.create(record);
  return insert;
}

const updateRecord = async (id, update) => {
  const record = await Record.update(update, {
    where: {
      id
    }
  });
  return record;
}

const deleteRecord = async (id) => {
  const record = await Record.destroy({
    where: {
      id
    }
  });
  return record;
}

module.exports = {
  selectAllRecords,
  selectRecord,
  selectAllRecordsOfUser,
  insertRecord,
  updateRecord,
  deleteRecord
}