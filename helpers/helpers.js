const { Sequelize, Op } = require('sequelize');
const sequelize = require('../db/connection.js')

// This function performs the calculations needed for pagination

const paginate = ({ page, pageSize }) => {
  if (!page) {
    page = 0
  }
  if (!pageSize) {
    pageSize = 200
  }
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};

// This function will use the filterFields and searchTerm to create the sequelize object needed to perform the database query

const filter = ( searchTerm, fields, modelString ) => {
  //if there is no search term return an empty object
  if (!searchTerm) {
    return {}
  }

  let filterBy = [];
  
  for (var i = 0; i < fields.length; i++) {
    let fieldfunc = sequelize.where( sequelize.cast(sequelize.col(`${modelString}.${fields[i]}`), 'varchar'), {[Op.like]: `%${searchTerm}%`})
    filterBy.push(fieldfunc)
  }
  
  return {
    [Op.or]: filterBy
  }
}

// This function will parse through the query on the GET request to extract all of the filterFields into an array

const collectFilterFields = (array, num, queryObj) => {
  let currentFilterField = 'filterField' + num;
  if (queryObj[currentFilterField] || queryObj[currentFilterField] === 0) {
    array.push(queryObj[currentFilterField])
    return collectFilterFields(array, num + 1, queryObj);
  } else {
    return array;
  }
}

// This function will eliminate filterFields that contain sensitive information or are unnecessary

const acceptedAttributes = (attributes) => {
  let acceptableAtrributes = [];
  for (var i = 0; i < attributes.length; i++) {
    let atr = attributes[i];
    if (atr === 'hash' || atr === 'salt' || atr === 'createdAt' || atr === 'updatedAt') {
      continue
    } else {
      acceptableAtrributes.push(atr);
    }
  }
  return acceptableAtrributes;
}

// This function will elimate any filterFields that are not fileds of the requested entity

const validateFields = (fields, attributes) => {
  let validatedFields = fields.filter(field => attributes.includes(field));
  return validatedFields
}

module.exports = {
  paginate,
  filter,
  collectFilterFields,
  acceptedAttributes,
  validateFields
}