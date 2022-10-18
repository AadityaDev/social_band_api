'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const {getUserDetail} = require('../utils/utils');
const  { getUserByEmail } = require('../users/get-userby-email');
const { PinpointEmail } = require('aws-sdk');

module.exports = async (event, callback) => {

  console.log(`inside band group`);
  const email = event?.headers?.['x-auth'];

  if(!email) {
    let error = {
      errorType : "Validation",
      errorMessage: "User email is missing!!!",
      trace : [ "User details are missing!!!" ]
    }
    callback(error);
  }

  console.log(`token and ${email}`);
  let da = await getUserByEmail(email);
  console.log(`user details are: ${JSON.stringify(da)}`);

  const params = {
    TableName: 'bandgroup',
    KeyConditionExpression: '#email = :email',
    ExpressionAttributeNames: {
      "#email": "email"
    },
    ExpressionAttributeValues: {
      ':email' : `${email}`
    },
  };

  return dynamoDb.query(params2, (error, data) => {
    if (error) {
      callback(error);
    }
    console.log(`data item 2: ${data?.Items}`);
    callback(error, data?.Items);
  });
  return da;
};