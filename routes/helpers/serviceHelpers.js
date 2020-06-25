const axios = require('axios');

const addition = async (body) => {
  console.log('addition');
  return {
    result: await parseFloat(body.additionVal1) + parseFloat(body.additionVal2)
  };
}

const subtraction = async (body) => {
  console.log('subtraction');
  return {
    result: await body.subtractionVal1 - body.subtractionVal2
  };
}

const multiplication = async (body) => {
  console.log('multiplication');
  return {
    result: await body.multiplicationVal1 * body.multiplicationVal2
  };
}

const division = async (body) => {
  console.log('division');
  return {
    result: await body.divisionVal1 / body.divisionVal2
  };
}

const square_root = async (body) => {
  console.log('squareRoot');
  if (body.squareRootVal || body.squareRootVal === 0) {
    return {
      result: await Math.sqrt(body.squareRootVal)
    };
  } else {
    throw new Error
  }
}

const random_string = async (body) => {
  let length = body.randomStringGeneratorVal
  console.log('lengthy: ', length)
  let request = {
    jsonrpc: '2.0',
    method: 'generateStrings',
    params: {
      apiKey: process.env.RANDOM_API_KEY,
      n: 1,
      length: length,
      characters: 'abcdefghijklmnopqrstuvwxyz',
      replacement:true
    },
    id: 1
  }
  let string = await axios.post('https://api.random.org/json-rpc/2/invoke', request)
    .then(function (response) {
      if (response.data.error) {
        throw new Error(response.data.error.message)
      }
      let string = response.data.result.random.data[0];
      return {
        result: string
      }
    })
    .catch(err => {
      console.log(err)
      // res.status(500).json({ err })
    })
  return string
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  square_root,
  random_string
}