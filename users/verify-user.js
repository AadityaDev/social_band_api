'use strict';

const AWS = require('aws-sdk');
const config = require("../config/auth.config");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const  { getUserByEmail } = require('../users/get-userby-email');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (event, callback) => {
  let userDetail;
  let token;
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

    //check if token is valid or not
    if(userDetail?.jwtToken) {
      // verify token is valid or not
      let tokenData = jwt.verify(token, config.secret);
      console.log(`token data is: ${tokenData}`);
    } else {
      // expiresIn: 86400 // 24 hours
      // expiresIn: 3600 // 1 hour
      // expiresIn: 60 // 1 min
      token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 60
      });
      console.log(`generated token is: ${token}`);

      // update token in dynamo
      userDetail.updatedAt = new Date().getTime();

      const params = {
        TableName : 'users',
        Item: { jwtToken: token, updatedAt: userDetail?.updatedAt }
      };
    
      let dada = await dynamoDb.put(params);

      console.log(`dad: ${dada}`);
    }


  } catch(ex) {
    console.log(`exceptio in verify is: ${ex}`);
    callback(error);
  } finally {
    callback(null, userDetail);
  }
};