'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const  { getUserByEmail } = require('../users/get-userby-email');
const bcrypt = require("bcryptjs");

module.exports = async (event, callback) => {
  let userDetail;
  try{  
    const params = {
      TableName: 'users',
    };
    console.log(`token 11`);
    // const email = event?.headers?.['x-auth'];
    const data = JSON.parse(event?.body);
    if(!data?.email || !data?.password) {
      let error = {
        errorType : "Validation",
        errorMessage: "User email or password is missing!!!",
        trace : [ "User details are missing!!!" ]
      }
      callback(error);
    }
    userDetail = await getUserByEmail(data?.email);
    console.log(`token value is: ${JSON.stringify(userDetail)} and ${data?.email}`);
    var passwordIsValid = bcrypt.compareSync(
      data?.password,
      userDetail?.password
    );

    console.log(`data is: ${passwordIsValid}`)
    if (!passwordIsValid) {
      console.log(`password is invalid!!!`);
      let error = {
        errorType : "Validation",
        errorMessage: "User credentials are invalid!!!",
        trace : [ "User credentials are invalid!!!" ]
      }
      callback(error);
    }
  } catch(ex) {
    console.log(`exceptio in verify is: ${ex}`);
    callback(error);
  } finally {
    callback(null, userDetail);
  }
};