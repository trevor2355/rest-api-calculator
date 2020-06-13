const servicesModel = require('../models/servicesModels.js');
const axios = require('axios');
const helpers = require('../helpers/helpers.js');

const getAllServices = (req, res) => {
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchTerm = req.query.searchTerm
  let filterFields = helpers.collectFilterFields([], 1, req.query);
  servicesModel.selectAllServices(page, pageSize, searchTerm, filterFields)
    .then(services => {
      res.status(200).json(services)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })
}

const getService = (req, res) => {
  let serviceId = req.params.serviceId;
  servicesModel.selectService(serviceId)
  .then(service => {
    res.status(200).json(service)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const postService = (req, res) => {
  let service = req.body;
  servicesModel.insertService(service)
  .then(result => {
    res.status(201).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const updateService = (req, res) => {
  let serviceId = req.params.serviceId;
  let update = req.body;
  servicesModel.updateService(serviceId, update)
  .then(result => {
    res.status(201).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const deleteService = (req, res) => {
  let serviceId = req.params.serviceId;
  servicesModel.deleteService(serviceId)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const requestRandomString = (req, res) => {
  let length = req.body;
  let request = {
    jsonrpc: '2.0',
    method: 'generateStrings',
    params: {
      apiKey: process.env.RANDOM_API_KEY,
      n: 1,
      length: length.length,
      characters: 'abcdefghijklmnopqrstuvwxyz',
      replacement:true
    },
    id: 1
  }
  axios.post('https://api.random.org/json-rpc/2/invoke', request)
    .then(function (response) {
      if (response.data.error) {
        throw new Error(response.data.error.message)
      }
      let string = response.data.result.random.data[0];
      res.status(200).json({ string })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })
}

module.exports = {
  getAllServices,
  getService,
  postService,
  updateService,
  deleteService,
  requestRandomString
}