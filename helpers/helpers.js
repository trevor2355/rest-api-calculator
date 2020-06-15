const { Sequelize, Op } = require('sequelize');

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

const filter = ( searchTerm, fields) => {
  //if there is no search term return an empty object
  if (!searchTerm) {
    return {}
  }

  let filterBy = [];
  
  //for each field create a new object that has the field as the key with the value of an object with
  // an [Op.like] key set to the value of the search term surronded by percents`
  for (var i = 0; i < fields.length; i++) {
    if (fields[i] !== 'id' || fields[i] !== 'password') {
      let fieldObj = {
        [fields[i]]: {
          [Op.like]: `%${searchTerm}%`
        }
      }
      filterBy.push(fieldObj)
    }
  }
  
  return {
    [Op.or]: filterBy
  }
}

const collectFilterFields = (array, num, queryObj) => {
  let currentFilterField = 'filterField' + num;
  if (queryObj[currentFilterField] || queryObj[currentFilterField] === 0) {
    array.push(queryObj[currentFilterField])
    return collectFilterFields(array, num + 1, queryObj);
  } else {
    return array;
  }
}

const acceptedAttributes = (attributes) => {
  let acceptableAtrributes = [];
  for (var i = 0; i < attributes.length; i++) {
    let atr = attributes[i];
    if (atr === 'id' || atr === 'password' || atr === 'createdAt' || atr === 'updatedAt') {
      continue
    } else {
      acceptableAtrributes.push(atr);
    }
  }
  return acceptableAtrributes;
}

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