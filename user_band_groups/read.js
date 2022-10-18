'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const {getUserDetail} = require('../utils/utils');

module.exports = async (event, callback) => {
  const params = {
    TableName: 'bandgroup',
  };
  console.log(`inside band group`);
  const email = event?.headers?.['x-auth'];
  console.log(`token and ${JSON.stringify(email)}`);
  let da = await getUserDetail(email);

  return dynamoDb.scan(params, (error, data) => {
    if (error) {
      callback(error);
    }
    callback(error, data?.Items);
  });
};