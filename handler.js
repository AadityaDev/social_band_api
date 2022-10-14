'use strict';

const usersCreate = require('./users/create.js');
const usersReadAll = require('./users/read.js');
// const usersReadOne = require('./users/read-one.js');
const usersUpdate = require('./users/update.js');
const usersDelete = require('./users/delete.js');

// band group
const bandGroupCreate = require('./band_group/create.js');
const bandGroupReadAll = require('./band_group/read.js');
const bandGroupUpdate = require('./band_group/update.js');
const bandGroupDelete = require('./band_group/delete.js');

// user band group


// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

module.exports.createUser = (event, context, callback) => {
  usersCreate(event, (error, result) => {
    console.log(`error is: ${error} and result is: ${result}`);
    let response = {
      statusCode: null,
      body: null,
    };
    if(error) {
      response.statusCode = 500;
      response.body = JSON.stringify(error);
    } else {
      response.statusCode = 200;
      response.body = JSON.stringify(result);
    }
    context.succeed(response);
  });
};

module.exports.readUser = (event, context, callback) => {
  usersReadAll(event, (error, result) => {
    console.log(`error is: ${error} and result is: ${result}`);
    let response = {
      statusCode: null,
      body: null,
    };
    if(error) {
      response.statusCode = 500;
      response.body = JSON.stringify(error);
    } else {
      response.statusCode = 200;
      response.body = JSON.stringify(result);
    }
    context.succeed(response);
  });
};

module.exports.updateUser = (event, context, callback) => {
  usersUpdate(event, (error, result) => {
    console.log(`error is: ${error} and result is: ${result}`);
    let response = {
      statusCode: null,
      body: null,
    };
    if(error) {
      response.statusCode = 500;
      response.body = JSON.stringify(error);
    } else {
      response.statusCode = 200;
      response.body = JSON.stringify(result);
    }
    context.succeed(response);
  });
};

module.exports.deleteUser = (event, context, callback) => {
  usersDelete(event, (error, result) => {
    console.log(`error is: ${error} and result is: ${result}`);
    let response = {
      statusCode: null,
      body: null,
    };
    if(error) {
      response.statusCode = 500;
      response.body = JSON.stringify(error);
    } else {
      response.statusCode = 200;
      response.body = JSON.stringify(result);
    }
    context.succeed(response);
  });
};


// Band Group

module.exports.createBandGroup = (event, context, callback) => {
  bandGroupCreate(event, (error, result) => {
    console.log(`error is: ${error} and result is: ${result}`);
    let response = {
      statusCode: null,
      body: null,
    };
    if(error) {
      response.statusCode = 500;
      response.body = JSON.stringify(error);
    } else {
      response.statusCode = 200;
      response.body = JSON.stringify(result);
    }
    context.succeed(response);
  });
};

module.exports.readBandGroup = (event, context, callback) => {
  bandGroupReadAll(event, (error, result) => {
    console.log(`error is: ${error} and result is: ${result}`);
    let response = {
      statusCode: null,
      body: null,
    };
    if(error) {
      response.statusCode = 500;
      response.body = JSON.stringify(error);
    } else {
      response.statusCode = 200;
      response.body = JSON.stringify(result);
    }
    context.succeed(response);
  });
};

module.exports.updateBandGroup = (event, context, callback) => {
  bandGroupUpdate(event, (error, result) => {
    console.log(`error is: ${error} and result is: ${result}`);
    let response = {
      statusCode: null,
      body: null,
    };
    if(error) {
      response.statusCode = 500;
      response.body = JSON.stringify(error);
    } else {
      response.statusCode = 200;
      response.body = JSON.stringify(result);
    }
    context.succeed(response);
  });
};

module.exports.deleteBandGroup = (event, context, callback) => {
  bandGroupDelete(event, (error, result) => {
    console.log(`error is: ${error} and result is: ${result}`);
    let response = {
      statusCode: null,
      body: null,
    };
    if(error) {
      response.statusCode = 500;
      response.body = JSON.stringify(error);
    } else {
      response.statusCode = 200;
      response.body = JSON.stringify(result);
    }
    context.succeed(response);
  });
};