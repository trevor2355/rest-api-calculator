'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    uuid: DataTypes.STRING,
    type: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Service.associate = function(models) {
    // associations can be defined here
  };
  return Service;
};