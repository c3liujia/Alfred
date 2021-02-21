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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWithinGeofence = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    region: "us-east-1"
});
aws_sdk_1.default.config.logger = console;
const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
// const validRideGeofenceCodes: Array<string> =  [ 'E05000001', 'E05000002' ]
function getValidGeofenceCodes(rideId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Querying for geofences for rideId ", rideId);
        var params = {
            TableName: "RideToGeofences",
            KeyConditionExpression: 'rideId = :id',
            ExpressionAttributeValues: {
                ':id': rideId
            }
        };
        try {
            const data = yield docClient.query(params).promise();
            return data.Items[0] && data.Items[0].geofenceCodes;
        }
        catch (e) {
            return [];
        }
    });
}
function isWithinGeofence(rideId, coordinates) {
    return __awaiter(this, void 0, void 0, function* () {
        const validGeofenceCodes = yield getValidGeofenceCodes(rideId);
        console.log('results: ', validGeofenceCodes);
        return Boolean(validGeofenceCodes);
    });
}
exports.isWithinGeofence = isWithinGeofence;
;
//# sourceMappingURL=isWithinGeofence.js.map