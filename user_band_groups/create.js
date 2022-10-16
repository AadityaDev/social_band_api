'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const {getUserDetail} = require('../utils/utils');

module.exports = async (event, callback) => {
    const data = JSON.parse(event.body);
  
    if(!data?.name || !data?.latitude || data?.latitude || data?.description) {
      let error = {
        errorType : "Validation",
        errorMessage: "Band name, latitude, latitude or description is missing!!!",
        trace : [ "Band details are missing!!!" ]
      }
      callback(error);
    }
  
    let da = await getUserDetail(email);

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