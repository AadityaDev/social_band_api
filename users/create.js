'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = (event, callback) => {
    const data = JSON.parse(event?.body);
  
    if(!data?.email) {
      let error = {
        errorType : "Validation",
        errorMessage: "User email is missing!!!",
        trace : [ "User details are missing!!!" ]
      };
      callback(error);
    }

    console.log(`second level reached!!!`);
    data.id = uuid.v1();
    data.createdAt = new Date().getTime();
    data.updatedAt = new Date().getTime();
  
    console.log(`data is: ${data?.id}, ${data?.email}, ${bcrypt.hashSync(data?.password)}, ${data?.createdAt}, ${data?.updatedA}`);

    const params = {
      TableName: 'users',
      Item: { id: data?.id, name: data?.name, email: data?.email, password: bcrypt.hashSync(data?.password), createdAt: data?.createdAt, updatedAt: data?.updatedAt }
    };
  
    return dynamoDb.put(params, (error, data) => {
      if (error) {
        callback(error);
      }
      callback(error, params.Item);
    });
  };