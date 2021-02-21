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
const isWithinGeofence_1 = require("../../helpers/isWithinGeofence");
const sendEmail_1 = require("../../helpers/sendEmail");
const validatelocation_1 = __importDefault(require("../validatelocation"));
jest.mock('../../helpers/isWithinGeofence');
jest.mock('../../helpers/sendEmail');
const isWithinGeofenceMock = isWithinGeofence_1.isWithinGeofence;
const sendEmailMock = sendEmail_1.sendEmail;
describe('validateLocation', () => {
    const req = {
        userId: 'user1',
        rideId: 'rideNo1',
        coordinates: '0 0'
    };
    const res = {
        sendStatus: jest.fn()
    };
    beforeEach(() => {
        isWithinGeofenceMock.mockClear();
        sendEmailMock.mockClear();
    });
    test('responds with 200 code', () => __awaiter(void 0, void 0, void 0, function* () {
        yield validatelocation_1.default(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(200);
    }));
    test('POST: when validating geofence passes, sendEmail is not triggered', () => __awaiter(void 0, void 0, void 0, function* () {
        isWithinGeofenceMock.mockResolvedValue(true);
        yield validatelocation_1.default(req, res);
        expect(sendEmailMock).not.toHaveBeenCalled();
    }));
    test('POST: when validating geofence fails, sendEmail is triggered', () => __awaiter(void 0, void 0, void 0, function* () {
        isWithinGeofenceMock.mockRejectedValue(false);
        yield validatelocation_1.default(req, res);
        expect(sendEmailMock).toHaveBeenCalledWith('user1');
    }));
});
//# sourceMappingURL=validateLocation.spec.js.map