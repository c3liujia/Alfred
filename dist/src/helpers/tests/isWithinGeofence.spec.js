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
const isWithinGeofence_1 = __importDefault(require("../isWithinGeofence"));
const getValidGeofenceCodes_1 = __importDefault(require("../getValidGeofenceCodes"));
const retrieveCoordinatesFromGeofenceCode_1 = __importDefault(require("../retrieveCoordinatesFromGeofenceCode"));
jest.mock('../getValidGeofenceCodes');
jest.mock('../retrieveCoordinatesFromGeofenceCode');
const getValidGeofenceCodesMock = getValidGeofenceCodes_1.default;
const retrieveCoordinatesFromGeofencecodeMock = retrieveCoordinatesFromGeofenceCode_1.default;
describe('isWithinGeofence', () => {
    beforeEach(() => {
        getValidGeofenceCodesMock.mockClear();
        retrieveCoordinatesFromGeofencecodeMock.mockClear();
    });
    const boundary = [
        {
            longitude: '0',
            latitude: '0'
        },
        {
            longitude: '0',
            latitude: '1'
        },
        {
            longitude: '1',
            latitude: '0'
        },
        {
            longitude: '0',
            latitude: '0'
        }
    ];
    test('returns truthy when rideId is within boundary', () => __awaiter(void 0, void 0, void 0, function* () {
        const coordinate = {
            longitude: '0',
            latitude: '0'
        };
        getValidGeofenceCodesMock.mockResolvedValue(["E05000001"]);
        retrieveCoordinatesFromGeofencecodeMock.mockReturnValue(boundary);
        const res = yield isWithinGeofence_1.default('rideId1', coordinate);
        expect(res).toBe(true);
    }));
    test('returns falsy when rideId is outside boundary', () => __awaiter(void 0, void 0, void 0, function* () {
        const coordinate = {
            longitude: '-0.5',
            latitude: '-0.5'
        };
        getValidGeofenceCodesMock.mockResolvedValue(["E05000001"]);
        retrieveCoordinatesFromGeofencecodeMock.mockReturnValue(boundary);
        const res = yield isWithinGeofence_1.default('rideId1', coordinate);
        expect(res).toBe(false);
    }));
});
//# sourceMappingURL=isWithinGeofence.spec.js.map