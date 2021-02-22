"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
var AWS = require('aws-sdk');
// you shouldn't hardcode your keys in production! See http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html
AWS.config.update({ accessKeyId: process.env.accessKeyId, secretAccessKey: process.env.secretAccessKey });
function sendEmail(userId) {
    var lambda = new AWS.Lambda();
    var params = {
        FunctionName: 'SendAlertEmail',
        Payload: `{ "userId": ${JSON.stringify(userId)} }`
    };
    lambda.invoke(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log('email sent');
        }
    });
}
exports.sendEmail = sendEmail;
;
//# sourceMappingURL=sendEmail.js.map