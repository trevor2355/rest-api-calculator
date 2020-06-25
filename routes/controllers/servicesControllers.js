const recordsServices = require('../services/recordsServices.js');
const servicesServices = require('../services/servicesServices.js');
const usersServices = require('../services/usersServices.js');
const axios = require('axios');
const helpers = require('../helpers/helpers.js');
const requests = require('../helpers/serviceHelpers.js');

const getAllServices = (req, res) => {
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  let searchTerm = req.query.searchTerm;
  let filterFields = helpers.collectFilterFields([], 1, req.query);
  let sortBy = req.query.sortBy;
  let order = req.query.order;
  servicesServices.selectAllServices(page, pageSize, searchTerm, filterFields, sortBy, order)
    .then(services => {
      res.status(200).json(services);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
};

const getService = (req, res) => {
  let serviceId = req.params.serviceId;
  servicesServices.selectService(serviceId)
  .then(service => {
    res.status(200).json(service);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ err });
  });
};

const postService = (req, res) => {
  let service = req.body;
  servicesServices.insertService(service)
  .then(result => {
    res.status(201).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ err });
  });
};

const updateService = (req, res) => {
  let serviceId = req.params.serviceId;
  let update = req.body;
  servicesServices.updateService(serviceId, update)
  .then(result => {
    res.status(201).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ err });
  });
};

const deleteService = (req, res) => {
  let serviceId = req.params.serviceId;
  servicesServices.deleteService(serviceId)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ err });
  });
};

//This controller handles requests from the user to generate a random string

// const requestRandomString = (req, res) => {
//   let length = req.body;
//   let request = {
//     jsonrpc: '2.0',
//     method: 'generateStrings',
//     params: {
//       apiKey: process.env.RANDOM_API_KEY,
//       n: 1,
//       length: length.length,
//       characters: 'abcdefghijklmnopqrstuvwxyz',
//       replacement:true
//     },
//     id: 1
//   };
//   axios.post('https://api.random.org/json-rpc/2/invoke', request)
//     .then(function (response) {
//       if (response.data.error) {
//         throw new Error(response.data.error.message);
//       }
//       let string = response.data.result.random.data[0];
//       res.status(200).json({ string });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ err });
//     });
// };

const request = (req, res) => {
  let serviceId = req.params.serviceId;
  let user = req.user;
  servicesServices.selectService(serviceId)
  .then(service => {
    requests[service.type](req.body)
    .then(serviceResponse => {
      let cost = service.cost;
      let newBalance = user.balance - cost;
      usersServices.updateUser(user.id, { balance: newBalance })
      .then(update => {
        if (!update[0]) {
          throw new Error;
        };
        let record = {
          user_id: user.id,
          service_id: serviceId,
          user_balance: newBalance,
          cost: cost,
          service_response: serviceResponse.result,
          date: new Date()
        };
        recordsServices.insertRecord(record)
        .then(record => {
          res.status(200).json(serviceResponse);
        })
        .catch(err => {
          res.status(500).json({ message: 'error inserting new record into records table'});
        });
      })
      .catch(err => {
        res.status(500).json({ message: 'error updating the user balance' });
      });
    })
    .catch(err => {
      res.status(500).json({message: 'error completing the requested service' });
    });
  })
  .catch(err => {
    res.status(500).json({ message: 'error selecting the service from the database' });
  });
};

module.exports = {
  getAllServices,
  getService,
  postService,
  updateService,
  deleteService,
  request
};