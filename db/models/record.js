'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    uuid: DataTypes.STRING,
    service_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    user_balance: DataTypes.INTEGER,
    service_response: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Record.associate = function(models) {
    // associations can be defined here
  };
  return Record;
};