'use strict';

const AWS = require('aws-sdk');
const config = require("../config/auth.config");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const  { getUserByEmail } = require('../users/get-userby-email');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (event, callback) => {
  let userDetail;
  let token, tokenData;
  try{  
    let params; 
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
    console.log(`data: ${userDetail?.jwtToken}`);
    // console.log(`token value is: ${JSON.stringify(userDetail)} and ${data?.email}`);
    console.log(`password: ${data?.password} and ${userDetail?.password} and => ${data?.password === userDetail?.password}`);
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
      console.log(`jwt token found!!!`);
      // verify token is valid or not
      // tokenData = jwt.verify(userDetail?.jwtToken, config.secret);
      tokenData = jwt.verify(userDetail?.jwtToken, config.secret);
      console.log(`token data is: ${tokenData}`);
    } 
    console.log(`${userDetail?.id} token found!!!`);
  } catch(ex) {
    console.log(`exception in verify is: ${ex?.message}`);
    callback(ex);
  } finally {
    callback(null, userDetail);
  }
};