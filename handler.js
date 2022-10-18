'use strict';

const jwt = require('jsonwebtoken');

const usersCreate = require('./users/create.js');
const usersReadAll = require('./users/read.js');
// const usersReadOne = require('./users/read-one.js');
const usersUpdate = require('./users/update.js');
const usersDelete = require('./users/delete.js');
const usersVerify = require('./users/verify-user');

// band group
const bandGroupCreate = require('./user_band_groups/create.js');
const bandGroupReadAll = require('./user_band_groups/read.js');
const bandGroupUpdate = require('./user_band_groups/update.js');
const bandGroupDelete = require('./user_band_groups/delete.js');

// import {addRequiredHeaders} from './utils/utils';

// user band group
const AWS = require('aws-sdk');
const { addRequiredHeaders } = require('./utils/utils');

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

module.exports.private = async(event, context, callback) => {
  // return sendResponse(200, {
  //   message: `Email ${event.requestContext.authorizer.claims.email} has been authorized`
  // });

  // if (!event?.authorizationToken) {
  //   return callback('Unauthorized');
  // }

  // const tokenParts = event?.authorizationToken.split(' ');
  // const tokenValue = tokenParts[1];
  // const tokenPart = event?.['x-auth'];

  // console.log(`token value is: ${tokenValue}`);
  // console.log(`email value is: ${event?.requestContext?.authorizer?.claims?.email}`);
  // console.log(`token part is: ${tokenPart}`);

  // const decoded = jwt.decode(tokenValue, { complete: true });
  // console.log(`decoded value is: ${JSON.stringify(decoded)}`);



  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: `Email ${event?.requestContext?.authorizer?.claims?.email} has been authorized`,
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };
};

module.exports.createUser = (event, context, callback) => {
  usersCreate(event, (error, result) => {
    console.log(`error is: ${error} and result is: ${result}`);
    let response = {
      statusCode: null,
      body: null,
      headers: null,
    };
    response.headers = addRequiredHeaders();
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
    console.log(`email: ${event}`);
    let response = {
      statusCode: null,
      body: null,
      headers: null,
    };
    response.headers = addRequiredHeaders();
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
      headers: null,
    };
    response.headers = addRequiredHeaders();
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

module.exports.verifyUser = (event, context, callback) => {
  usersVerify(event, (error, result) => {
    console.log(`error is: ${error} and result is: ${result}`);
    let response = {
      statusCode: null,
      body: null,
      headers: null,
    };      
    response.headers = addRequiredHeaders();
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
      headers: null,
    };      
    response.headers = addRequiredHeaders();
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
      headers: null,
    };
    response.headers = addRequiredHeaders();
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
    // console.log(`error is: ${error} and result is: ${result}`);
    // let s = event?.headers?.Authorization?.split(/(\s+)/);
    // console.log(`auth: ${event?.headers?.Authorization} and ${s[1]}`);
    
    // console.log(`email: ${event?.requestContext?.authorizer?.claims?.email}`);
    // let provide = new AWS.CognitoIdentityServiceProvider();
    // let da = provide.getUser({ AccessToken: s?.[1] }).promise();
    // console.log(`da is: ${JSON.stringify(da)}`);
    // Object.keys(da)
    // .forEach(function eachKey(key) { 
    //   console.log(`key: ${key} val: ${da[key]}`); // alerts key 
    //   // console.log(da[key]); // alerts value
    // });
    // console.log(`service => ${JSON.stringify(da?.['service'])}`);
    // console.log(`params => ${JSON.stringify(da?.['params'])}`);
    // console.log(`response => ${JSON.stringify(da?.['response'])}`);
    // console.log(`service => ${JSON.stringify(da['service'])}`);

    let response = {
      statusCode: null,
      body: null,
      headers: null,
    };
    response.headers = addRequiredHeaders();
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
      headers: null,
    };
    response.headers = addRequiredHeaders();
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
      headers: null,
    };
    response.headers = addRequiredHeaders();
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