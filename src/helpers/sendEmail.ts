var AWS = require('aws-sdk');
AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});

export default async function sendEmail(userId:string) {
  var lambda = new AWS.Lambda();
  var params = {
    FunctionName: 'SendAlertEmail',
    Payload: `{ "userId": ${JSON.stringify(userId)} }`
  };

  await lambda.invoke(params, function(err: Error, data:any) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log('email sent');
    }    
  });
};
