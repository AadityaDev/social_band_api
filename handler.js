'use strict';

const usersCreate = require('./users/create.js');
const usersReadAll = require('./users/read.js');
// const usersReadOne = require('./users/read-one.js');
const usersUpdate = require('./users/update.js');
const usersDelete = require('./users/delete.js');

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
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.readUser = (event, context, callback) => {
  usersReadAll(event, (error, result) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.updateUser = (event, context, callback) => {
  usersUpdate(event, (error, result) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.deleteUser = (event, context, callback) => {
  usersDelete(event, (error, result) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};