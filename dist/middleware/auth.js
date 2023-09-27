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
exports.verifyGoogleToken = void 0;
const config_1 = require("../config");
const expressError_1 = require("../expressError");
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(config_1.CLIENT_ID); // Replace CLIENT_ID with your actual client ID
/**
 * Middleware to use when you need to authenticate a Google JWT token
 *
 */
function verifyGoogleToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body)
                throw new expressError_1.UnauthorizedError();
            const token = req.body.credential;
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: config_1.CLIENT_ID, // Replace CLIENT_ID with your actual client ID
            });
            const payload = ticket.getPayload();
            // Check if the user's email is verified and any other necessary checks
            if (!payload)
                throw new expressError_1.UnauthorizedError();
            if (payload.email_verified) {
                return next();
            }
            else {
                throw new expressError_1.UnauthorizedError();
            }
        }
        catch (err) {
            return next(err);
        }
    });
}
exports.verifyGoogleToken = verifyGoogleToken;
