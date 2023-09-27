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
const auth_1 = require("../models/auth");
const express_1 = __importDefault(require("express"));
const tokens_1 = require("../helpers/tokens");
const expressError_1 = require("../expressError");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const router = express_1.default.Router();
const auth_2 = require("../middleware/auth");
router.post('/token', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield auth_1.Auth.authUser(username, password, next);
        if (!user)
            throw new expressError_1.NotFoundError();
        const token = (0, tokens_1.createToken)(user.username);
        return res.json({ token, user });
    }
    catch (err) {
        return next(err);
    }
}));
/** POST /auth/oauth:  { Google JWT } => { token, username }
*
* After verifying Googles JWT the user is found and then a new JWT token is return with the username
* which can be used to authenticate further requests
*
* Authorization required: none
*
*/
router.post("/oauth", auth_2.verifyGoogleToken, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { credential } = req.body;
            const decodedJWT = (0, jwt_decode_1.default)(credential);
            const { email } = decodedJWT;
            const user = yield auth_1.Auth.getUserDataAfterOAuth(email, next);
            if (!user)
                throw new expressError_1.NotFoundError();
            const token = (0, tokens_1.createToken)(user.username);
            return res.json({ token, user });
        }
        catch (err) {
            return next(err);
        }
    });
});
/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */
router.post("/register", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield auth_1.Auth.register(Object.assign(Object.assign({}, req.body), { isAdmin: false }), next);
            if (!newUser)
                throw new expressError_1.BadRequestError();
            const token = (0, tokens_1.createToken)(newUser);
            return res.status(201).json({ token });
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.default = router;
