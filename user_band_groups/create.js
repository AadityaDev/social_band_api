'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const  { getUserByEmail } = require('../users/get-userby-email');

module.exports = async (event, callback) => {
    // const data = JSON.parse(event.body);
  
    // const email = event?.headers?.['x-auth'];

    // if(!email) {
    //   let error = {
    //     errorType : "Validation",
    //     errorMessage: "User email is missing!!!",
    //     trace : [ "User details are missing!!!" ]
    //   }
    //   callback(error);
    // }

    // if(!data?.name || !data?.latitude || !data?.latitude || !data?.description) {
    //   let error = {
    //     errorType : "Validation",
    //     errorMessage: "Band name, latitude, latitude, description or admin details are missing is missing!!!",
    //     trace : [ "Band details are missing!!!" ]
    //   }
    //   callback(error);
    // }
  
    // let userDetail = await getUserByEmail(email);
    // data?.admin = [];
    // data?.participants = [];
    // if(!userDetail?.id && !userDetail?.email) {
    //   data?.admin?.push({
    //     id: userDetail?.id,
    //     name: userDetail?.name,
    //     email: userDetail?.email,
    //     approved: true
    //   });
    // }

    // data.id = uuid.v1();
    // data.createdAt = new Date().getTime();
    // data.updatedAt = new Date().getTime();
  
    // const params = {
    //   TableName: 'bandgroup',
    //   Item: { data: data?.name, latitude: data?.latitude, longitude: data?.longitude, data: data?.description, admin: data?.admin, participants: data?.participants, createdAt: data?.createdAt, updatedAt: data.updatedAt }
    // };
  
    // return dynamoDb.put(params, (error, data) => {
    //   if (error) {
    //     callback(error);
    //   }
    //   callback(error, params.Item);
    // });
  };