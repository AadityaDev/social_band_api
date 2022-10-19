'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const  { getUserByEmail } = require('../users/get-userby-email');

module.exports = async (event, callback) => {
  let admins = [];
  const email = event?.headers?.['x-auth'];

  if(!email) {
    let error = {
      errorType : "Validation",
      errorMessage: "User email is missing!!!",
      trace : [ "User details are missing!!!" ]
    }
    callback(error);
  }
  
  let data = {...JSON.parse(event.body), admins, adminEmail: email };

  if(!data?.bandName || !data?.latitude || !data?.latitude || !data?.description) {
    let error = {
      errorType : "Validation",
      errorMessage: "Band name, latitude, latitude, description or admin details are missing is missing!!!",
      trace : [ "Band details are missing!!!" ]
    }
    callback(error);
  }

  let userDetail = await getUserByEmail(email);
  console.log(`user details: ${JSON.stringify(userDetail)}`);
  console.log(`${userDetail?.id} and ${userDetail?.email} => ${!userDetail?.id && !userDetail?.email}`);
  if(userDetail?.id && userDetail?.email) {
    let item = {
      id: userDetail?.id,
      name: userDetail?.name,
      email: userDetail?.email,
      approved: true
    };
    data.admins.push(item);
    console.log(`after push: ${data?.admins?.length}`);
  }
  console.log(`user details: ${JSON.stringify(data)}`);

  data.id = uuid.v1();
  data.createdAt = new Date().getTime();
  data.updatedAt = new Date().getTime();

  const params = {
    TableName: 'bandgroup',
    Item: { id: data?.id, bandName: data?.bandName, latitude: data?.latitude, longitude: data?.longitude, adminEmail: data?.adminEmail, description: data?.description, admins: data?.admins, participants: data?.participants, createdAt: data?.createdAt, updatedAt: data.updatedAt }
  };

  return dynamoDb.put(params, (error, data) => {
    if (error) {
      callback(error);
    }
    callback(error, params.Item);
  });
};