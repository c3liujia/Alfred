"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
// const validRideGeofenceCodes: Array<string> =  [ 'E05000001', 'E05000002' ]
function getValidGeofenceCodes(rideId) {
    return __awaiter(this, void 0, void 0, function* () {
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
function retrieveCoordinatesFromGeofencecode(geofenceCode) {
    if (geofenceCode === 'E05000001') {
        return [
            {
                longitude: '-0.095394832160021',
                latitude: '51.517491306045144'
            },
            {
                longitude: '-0.096046026058087',
                latitude: '51.516081044816744'
            },
            {
                longitude: '-0.096927792680624',
                latitude: '51.5164002076909'
            },
            {
                longitude: '-0.097049051920761',
                latitude: '51.516049660138869'
            },
            {
                longitude: '-0.098474511361909',
                latitude: '51.516152799573234'
            },
            {
                longitude: '-0.098600737884154',
                latitude: '51.517275338998012'
            },
            {
                longitude: '-0.096933138293403',
                latitude: '51.517965901988596'
            },
            {
                longitude: '-0.097624091740084',
                latitude: '51.521031858261807',
            },
            {
                longitude: '-0.097403207318649',
                latitude: '51.52159302466719'
            },
            {
                longitude: '-0.096660730040646',
                latitude: '51.520247386106497'
            },
            {
                longitude: '-0.094388991202381',
                latitude: '51.520662852060532'
            },
            {
                longitude: '-0.094469215985314',
                latitude: '51.519811662786886'
            },
            {
                longitude: ' -0.095294633393381',
                latitude: '51.518925798438573'
            },
            {
                longitude: '-0.095344708811703',
                latitude: '51.518347478625714'
            },
            {
                longitude: '-0.094926821811354',
                latitude: '51.518171607768139'
            },
            {
                longitude: '-0.095394832160021',
                latitude: '51.517491306045144'
            }
        ];
    }
    else if (geofenceCode === 'E05000002') {
        return [
            {
                longitude: '-0.077855364684864',
                latitude: '51.515806829716553'
            },
            {
                longitude: '-0.075776905921068',
                latitude: '51.514646874466912',
            },
            {
                longitude: '-0.078115074036395',
                latitude: '51.513608804896727'
            },
            {
                longitude: '-0.077608980007734',
                latitude: '51.513374812831024'
            },
            {
                longitude: '-0.076766208032662',
                latitude: '51.513845652773583'
            },
            {
                longitude: '-0.076128845745836',
                latitude: '51.513750684936362'
            },
            {
                longitude: '-0.078329420294162',
                latitude: '51.512796673738684'
            },
            {
                longitude: '-0.077143733792801',
                latitude: '51.511861814836053'
            },
            {
                longitude: '-0.077508571229223',
                latitude: '51.511481134857661',
            },
            {
                longitude: '-0.079193826136147',
                latitude: '51.511809972430285'
            },
            {
                longitude: '-0.07959105770819',
                latitude: '51.512302957213315'
            },
            {
                longitude: '-0.080237803145178',
                latitude: '51.512104919705841'
            },
            {
                longitude: '-0.080324336965357',
                latitude: '51.512583865294552',
            },
            {
                longitude: '-0.082223101002232',
                latitude: '51.512669773467884'
            },
            {
                longitude: '-0.079946574754141',
                latitude: '51.515432800607798'
            },
            {
                longitude: '-0.079454464422567',
                latitude: '51.515789856384991'
            },
            {
                longitude: '-0.079054611862318',
                latitude: '51.515564774582131'
            },
            {
                longitude: '-0.078430174232964',
                latitude: '51.516052756932041'
            }, {
                longitude: ' -0.077855364684864',
                latitude: '51.515806829716553'
            }
        ];
    }
    else if (geofenceCode === 'E05000003') {
        return [
            {
                longitude: '-0.091098116369973',
                latitude: '51.518044623265801'
            },
            {
                longitude: '-0.089509648987822',
                latitude: '51.517495411057027'
            },
            {
                longitude: '-0.089901141599253',
                latitude: '51.51578689186038'
            },
            {
                longitude: '-0.091020707847026',
                latitude: '51.515862671615231'
            },
            {
                longitude: '-0.091035232487955',
                latitude: '51.515411494705376'
            },
            {
                longitude: '-0.091930715404046',
                latitude: '51.515435919033578'
            },
            {
                longitude: '-0.091747675590292',
                latitude: '51.515953656696517'
            },
            {
                longitude: '-0.092275213851733',
                latitude: '51.515952330201586'
            },
            {
                longitude: '-0.092841190722306',
                latitude: '51.515238529413963'
            },
            {
                longitude: '-0.096046026058087',
                latitude: '51.516081044816744'
            },
            {
                longitude: '-0.095394832160021',
                latitude: '51.517491306045144'
            },
            {
                longitude: '-0.093295029357865',
                latitude: '51.517347462745285'
            },
            {
                longitude: '-0.093530864363341',
                latitude: '51.517705616235816'
            },
            {
                longitude: '-0.093079603375164',
                latitude: '51.518502226937692'
            },
            {
                longitude: '-0.091098116369973',
                latitude: '51.518044623265801'
            }
        ];
    }
    else {
        return [];
    }
}
const geolib = __importStar(require("geolib"));
function checkCoordinatesWithinBoundary(boundary, coordinates) {
    const isCoordinatesWithinBoundary = geolib.isPointInPolygon(coordinates, boundary);
    return isCoordinatesWithinBoundary;
}
function isWithinGeofence(rideId, coordinates) {
    return __awaiter(this, void 0, void 0, function* () {
        const validGeofenceCodes = yield getValidGeofenceCodes(rideId);
        // const validGeofenceCodes: Array<string> =  [ 'E05000001', 'E05000002' ]
        let isCoordinatesWithinBoundary = false;
        Boolean(validGeofenceCodes.length) && validGeofenceCodes.forEach((geofenceCode) => {
            const boundary = retrieveCoordinatesFromGeofencecode(geofenceCode);
            isCoordinatesWithinBoundary = isCoordinatesWithinBoundary || checkCoordinatesWithinBoundary(boundary, coordinates);
        });
        return Boolean(isCoordinatesWithinBoundary);
    });
}
exports.isWithinGeofence = isWithinGeofence;
;
//# sourceMappingURL=isWithinGeofence.js.map