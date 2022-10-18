'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);

  if(!data?.name || !data?.latitude || data?.longitude || data?.description) {
    let error = {
      errorType : "Validation",
      errorMessage: "Band name, latitude, latitude or description is missing!!!",
      trace : [ "Band details are missing!!!" ]
    }
    callback(error);
  }

  data.id = event.pathParameters.id;
  data.updatedAt = new Date().getTime();

  const params = {
    TableName : 'bandgroup',
    Item: { data: data?.name, latitude: data?.latitude, longitude: data?.longitude, data: data?.description, updatedAt: data.updatedAt }
  };

  return dynamoDb.put(params, (error, data) => {
    if (error) {
      callback(error);
    }
    callback(error, params.Item);
  });
};