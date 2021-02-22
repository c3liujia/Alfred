
var AWS = require('aws-sdk');
// you shouldn't hardcode your keys in production! See http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html
AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});

export function sendEmail(userId:string): void {
  var lambda = new AWS.Lambda();
  var params = {
    FunctionName: 'SendAlertEmail',
    Payload: `{ "userId": ${JSON.stringify(userId)} }`
  };
  lambda.invoke(params, function(err:any, data:any) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log ('email sent')
    }    
  });
};
