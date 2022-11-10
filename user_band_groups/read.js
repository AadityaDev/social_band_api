'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const  { getUserByEmail } = require('../users/get-userby-email');
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

module.exports = async (event, callback) => {

  let email;
  console.log(`inside band group`);
  const authorization = event?.headers?.['Authorization'];

  if(!authorization) {
    let error = {
      errorType : "Validation",
      errorMessage: "User token is missing!!!",
      trace : [ "User token is missing!!!" ]
    }
    callback(error);
  }

  try {
    var decoded = jwt.verify(authorization, config.secret);
    email = decoded?.email;
    console.log(`decoded is: ${decoded}`);
    console.log(`email is: ${email}`);
  } catch(err) {
    // err
    console.log(`error in decoding is: ${err}`);
  }

  console.log(`token and ${email}`);
  let da = await getUserByEmail(email);
  console.log(`user details are: ${JSON.stringify(da)}`);

  const params = {
    TableName: 'bandgroup',
    KeyConditionExpression: '#adminEmail = :email',
    ExpressionAttributeNames: {
      "#adminEmail": "adminEmail"
    },
    ExpressionAttributeValues: {
      ':email' : `${email}`
    },
  };

  return dynamoDb.query(params, (error, data) => {
    if (error) {
      callback(error);
    }
    console.log(`data item 2: ${data?.Items}`);
    callback(error, data?.Items);
  });
};