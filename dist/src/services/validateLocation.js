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
const isWithinGeofence_1 = require("../helpers/isWithinGeofence");
const sendEmail_1 = require("../helpers/sendEmail");
function validateLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.sendStatus(200);
        let checkWithinGeofence = true;
        try {
            checkWithinGeofence = yield isWithinGeofence_1.isWithinGeofence(req.body.rideId, req.body.coordinates);
        }
        catch (err) {
            console.log("error checking if within geofence. try again later...");
        }
        if (!checkWithinGeofence) {
            sendEmail_1.sendEmail(req.body.userId);
        }
    });
}
exports.default = validateLocation;
;
//# sourceMappingURL=validateLocation.js.map