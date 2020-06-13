const sequelize = require('../db/connection.js')
const { Sequelize, Op } = require('sequelize');
const helpers = require('../helpers/helpers.js')

const Model = Sequelize.Model;
class Service extends Model {}
Service.init({
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
  type: {
    type: Sequelize.STRING
  },
  cost: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.STRING
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
  modelName: 'Service'
})

const selectAllServices = async (page, pageSize, searchTerm, filterFields) => {
  let attributes = helpers.acceptedAttributes(Object.keys(Service.rawAttributes));
  let validatedFilterFields;
  if (filterFields.length === 0) {
    validatedFilterFields = attributes;
  } else {
    validatedFilterFields = helpers.validateFields(filterFields, attributes)
  }
  const services = await Service.findAll({
    where: {
      ...helpers.filter(searchTerm, validatedFilterFields)
    },
    ...helpers.paginate({ page, pageSize })
  });
  return services;
}

const selectService = async (id) => {
  const service = await Service.findAll({
    where: {
      id
    }
  });
  return service;
}

const insertService = async (service) => {
  const insert = await Service.create(service);
  return insert;
}

const updateService = async (id, update) => {
  const service = await Service.update(update, {
    where: {
      id
    }
  });
  return service;
}

const deleteService = async (id) => {
  const service = await Service.destroy({
    where: {
      id
    }
  });
  return service;
}

module.exports = {
  selectAllServices,
  selectService,
  insertService,
  updateService,
  deleteService
}