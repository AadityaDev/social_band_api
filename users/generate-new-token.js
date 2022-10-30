'use strict';

const AWS = require('aws-sdk');
const config = require("../config/auth.config");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const  { getUserByEmail } = require('./get-userby-email');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (event, callback) => {
  let userDetail;
  let token, tokenData;
  try{  
    let params; 
    // = {
    //   TableName: 'users',
    // };
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
    // console.log(`data: ${JSON.stringify(userDetail)}`);
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
    // if(userDetail?.jwtToken) {
    //   console.log(`jwt token found!!!`);
    //   // verify token is valid or not
    //   // tokenData = jwt.verify(userDetail?.jwtToken, config.secret);
    //   tokenData = await jwt.verify(userDetail?.jwtToken, config.secret).promise();
    //   console.log(`token data is: ${tokenData}`);
    // } else {
      console.log(`${userDetail.id} token found!!!`);
      // expiresIn: 86400 // 24 hours
      // expiresIn: 3600 // 1 hour
      // expiresIn: 60 // 1 min
      token = jwt.sign({ id: userDetail.id }, config.secret, {
        expiresIn: 60
      });
      console.log(`generated token is: ${token} and ${userDetail?.email}`);

      // update token in dynamo
      // let updatedTime = new Date().getTime();
      // params = {
      //   TableName : 'users',
      //   Item: { email: userDetail?.email, jwtToken: token, updatedAt: updatedTime },
      //   Key: {
      //     email: userDetail?.email
      //   }
      // };
      // case 2
      // let updatedTime = new Date().getTime();
      // params = {
      //   TableName : 'users',
      //   Key: {
      //     email: userDetail?.email
      //   },
      //   Item: { email: userDetail?.email, name: userDetail?.name, jwtToken: token, updatedAt: updatedTime }
      // };
      // case 3
      let updatedTime = new Date().getTime();
      params = {
        TableName : 'users',
        Key: {
          pk: `${userDetail?.email}`
        },
        Item: { id: userDetail?.id, name: userDetail?.name, email: userDetail?.email , password: userDetail?.password, jwtToken: token, createdAt: userDetail?.createdAt, updatedAt: updatedTime },
        ReturnValues: "ALL_OLD"
      };
      // let dada = await dynamoDb.put(params).promise();
      // console.log(`dad: ${dada}`);
      // case 4
      // let updatedTime = new Date().getTime();
      // params = {
      //   TableName : 'users',
      //   Key: {
      //     pk: userDetail?.email
      //   },
      //   UpdateExpression: 'set #jwtToken = :v_token, #updatedAt = :v_time',
      //   ExpressionAttributeNames: {
      //     '#jwtToken': 'jwtToken',
      //     '#updatedAt': 'updatedAt'
      //   },
      //   ExpressionAttributeValues: {
      //     ':v_token': token,
      //     ':v_time': updatedTime
      //   },
      //   ReturnValues: "ALL_NEW"
      // };
      console.log(`result: ${params}`);
      // Item: { email: userDetail?.email, name: userDetail?.name, jwtToken: token, updatedAt: updatedTime }
      let dada = await dynamoDb.put(params).promise();
      if(dada && dada?.Attributes && dada?.Attributes?.id && dada?.Attributes?.jwtToken) {
        userDetail?.jwtToken = token;
      }
      console.log(`dad: ${dada}`);

      // console.log(`dad: ${JSON.stringify(dada)}`);
      // for (var key in dada){
      //   console.log( key + ": " + dada[key]);
      // }
    // }
  } catch(ex) {
    console.log(`exceptio in verify is: ${ex?.message}`);
    callback(ex);
  } finally {
    callback(null, userDetail);
  }
};