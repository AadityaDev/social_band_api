'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const {getUserDetail} = require('../utils/utils');

module.exports = async (event, callback) => {
  const params = {
    TableName: 'users',
  };

  const tokenPart = event?.['x-auth'];
  const email = event?.headers?.['x-auth'];
  console.log(`token value is: ${tokenPart} and ${JSON.stringify(email)}`);

  // let da = await getUserDetail(email);
  // console.log(`user details: ${JSON.stringify(da)}`);
  // console.log(`data is: ${da}`);

  return dynamoDb.scan(params, (error, data) => {
    if (error) {
      callback(error);
    }
    callback(error, data?.Items);
  });
};