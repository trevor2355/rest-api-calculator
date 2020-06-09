const servicesModel = require('../models/servicesModels.js');

const getAllServices = (req, res) => {
  console.log('getAllServices')
  servicesModel.selectAllServices()
    .then(services => {
      console.log(services)
      res.status(200).json(services)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })
}

const getService = (req, res) => {
  console.log('getService')
  let serviceId = req.params.serviceId;
  servicesModel.selectService(serviceId)
  .then(service => {
    console.log(service)
    res.status(200).json(service)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const postService = (req, res) => {
  console.log('postService')
  console.log(req.body)
  let service = req.body;
  servicesModel.insertService(service)
  .then(result => {
    console.log(result)
    res.status(201).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const updateService = (req, res) => {
  console.log('updateService')
  let serviceId = req.params.serviceId;
  let update = req.body;
  servicesModel.updateService(serviceId, update)
  .then(result => {
    console.log(result)
    res.status(201).json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err })
  })
}

const deleteService = (req, res) => {
  console.log('deleteService')
  let serviceId = req.params.serviceId;
  servicesModel.deleteService(serviceId)
  .then(result => {
    console.log(result)
    res.status(200).json(result)
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
  deleteService
}