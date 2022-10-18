const AWS = require('aws-sdk');

const getUserDetail = async (email) => {
    let userDetail = null;
    try {
        if (email) {
            var lambda = new AWS.Lambda();
            var params = {
                FunctionName: 'social-band-api-dev-readUser', /* required */
                InvocationType: 'RequestResponse',
                // Payload: PAYLOAD_AS_A_STRING
            };
            userDetail = await lambda.invoke(params).promise();
            console.log(`user detail da: ${JSON.stringify(userDetail)}`);
            // lambda.invoke(params, function(err, data) {
            //     if (err) console.log(err, err.stack); // an error occurred
            //     else     console.log(data);           // successful response
            // });
        }
    } catch(ex) {
        console.log(`exception is: ${ex}`);
    } finally{
        return userDetail;
    }
}

const addRequiredHeaders = () => {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
    };
}

module.exports = {
    getUserDetail,
    addRequiredHeaders

}