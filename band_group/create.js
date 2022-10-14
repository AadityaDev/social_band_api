'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (event, callback) => {
    const data = JSON.parse(event.body);

    console.log(`details: name :${data?.name}, longitude: ${data?.longitude}, latitude: ${data?.latitude}, description: ${data?.description}`);
    console.log(`details: ${!data?.name || !data?.longitude || data?.latitude || data?.description}`);
    if(!data?.name || !data?.latitude || !data?.longitude || !data?.description) {
      let error = {
        errorType : "Validation",
        errorMessage: "Band name, latitude, latitude or description is missing!!!",
        trace : [ "Band details are missing!!!" ]
      }
      callback(error);
    }
  
    data.id = uuid.v1();
    data.createdAt = new Date().getTime();
    data.updatedAt = new Date().getTime();
  
    const params = {
      TableName: 'band_groups',
      Item: { data: data?.name, latitude: data?.latitude, longitude: data?.longitude, data: data?.description, createdAt: data?.createdAt, updatedAt: data.updatedAt }
    };
  
    return dynamoDb.put(params, (error, data) => {
      if (error) {
        callback(error);
      }
      callback(error, params.Item);
    });
  };