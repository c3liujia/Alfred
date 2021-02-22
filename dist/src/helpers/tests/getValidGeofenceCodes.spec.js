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
const getValidGeofenceCodes_1 = __importDefault(require("../getValidGeofenceCodes"));
const AWS = __importStar(require("aws-sdk"));
const utils_1 = require("ts-jest/utils");
jest.mock('aws-sdk', () => {
    const documentClientInstance = {
        query: jest.fn()
    };
    const mockDocumentClient = jest.fn(() => documentClientInstance);
    return {
        config: {
            update: jest.fn()
        },
        DynamoDB: {
            DocumentClient: mockDocumentClient
        }
    };
});
describe('getValidGeofenceCodes', () => {
    const mockRideId = 'Ride1';
    const mockQueryResponse = {
        Items: [
            {
                geofenceCodes: ["Code1", "Code2"]
            },
            {
                geofenceCodes: ["Code3", "Code4"]
            }
        ]
    };
    test('when query returns data, then geofence of first data item is returned', () => __awaiter(void 0, void 0, void 0, function* () {
        const documentClientInstance = new AWS.DynamoDB.DocumentClient();
        utils_1.mocked(documentClientInstance.query).mockImplementationOnce(() => {
            return {
                promise: () => mockQueryResponse
            };
        });
        const geofenceCodes = yield getValidGeofenceCodes_1.default(mockRideId);
        expect(geofenceCodes).toEqual(mockQueryResponse.Items[0].geofenceCodes);
    }));
    test('when query fails, then empty list is returned', () => __awaiter(void 0, void 0, void 0, function* () {
        const documentClientInstance = new AWS.DynamoDB.DocumentClient();
        utils_1.mocked(documentClientInstance.query).mockImplementationOnce(() => {
            throw (new Error("whoopsie"));
        });
        const geofenceCodes = yield getValidGeofenceCodes_1.default(mockRideId);
        expect(geofenceCodes).toEqual([]);
    }));
});
//# sourceMappingURL=getValidGeofenceCodes.spec.js.map