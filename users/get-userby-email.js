'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getUserByEmail = async(email) => {
    let userDetail = null;
    try {
      if(!email) {
        console.log('email not found!!!');
        return userDetail;
      }
      const params = {
        TableName: 'users',
        KeyConditionExpression: '#email = :email',
        ExpressionAttributeNames: {
          "#email": "email"
        },
        ExpressionAttributeValues: {
          ':email' : `${email}`
        },
      };
      userDetail =  await dynamoDb.query(params).promise();
      if(userDetail?.Items?.length>0) {
        userDetail = userDetail?.Items[0];
      }
    } catch(ex) {
      console.log(`exception is: ${userDetail}`);
    } finally {
      return userDetail;
    }
}

module.exports = { 
  getUserByEmail
}