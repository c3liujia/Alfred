"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: 'AKIAJWEOOMXNZC6VGYIA', secretAccessKey: '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' });
function sendEmail(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var lambda = new AWS.Lambda();
        var params = {
            FunctionName: 'SendAlertEmail',
            Payload: `{ "userId": ${JSON.stringify(userId)} }`
        };
        yield lambda.invoke(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
            }
            else {
                console.log('email sent');
            }
        });
    });
}
exports.default = sendEmail;
;
//# sourceMappingURL=sendEmail.js.map