'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = (event, callback) => {
    // const data = JSON.parse(event?.body);
  
    // if(!data?.email || !data?.password) {
    //   let error = {
    //     errorType : "Validation",
    //     errorMessage: "User email or password is missing!!!",
    //     trace : [ "User details are missing!!!" ]
    //   }
    //   callback(error);
    // }

    // var passwordIsValid = bcrypt.compareSync(
    //     req.body.password,
    //     user.password
    // );

    // console.log(`second level reached!!!`);
    // data.id = uuid.v1();
    // data.createdAt = new Date().getTime();
    // data.updatedAt = new Date().getTime();
  
    // if (!passwordIsValid) {
    //     let error = {
    //         errorType : "Validation",
    //         errorMessage: "User email or password or password is invalid!!!",
    //         trace : [ "User details are invalid!!!" ]
    //       }
    //       callback(error);
    // }

    // const params = {
    //   TableName: 'users',
    //   Item: { id: data?.id, email: data?.email, password: bcrypt.hashSync(data?.password, createdAt: data?.createdAt, updatedAt: data?.updatedAt }
    // };
  
    // return dynamoDb.put(params, (error, data) => {
    //   if (error) {
    //     callback(error);
    //   }
    //   callback(error, params.Item);
    // });
  };