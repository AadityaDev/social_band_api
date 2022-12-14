'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);

  if(!data?.name || !data?.mobile || data?.bandInstrument) {
    let error = {
      errorType : "Validation",
      errorMessage: "User name, mobile or instrument is missing!!!",
      trace : [ "User details are missing!!!" ]
    }
    callback(error);
  }

  data.id = event.pathParameters.id;
  data.updatedAt = new Date().getTime();

  const params = {
    TableName : 'users',
    Item: { name: data?.name, mobile: data?.mobile, bandInstrument: data?.bandInstrument, updatedAt: data?.updatedAt }
  };

  return dynamoDb.put(params, (error, data) => {
    if (error) {
      callback(error);
    }
    callback(error, params.Item);
  });
};