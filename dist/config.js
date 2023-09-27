"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCRYPT_WORK_FACTOR = exports.PORT = exports.CLIENT_ID = exports.SECRET_KEY = void 0;
/** Shared config for application; can be required many places. */
const dotenv_1 = __importDefault(require("dotenv"));
require("colors");
dotenv_1.default.config();
exports.SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
exports.CLIENT_ID = process.env.CLIENT_ID;
exports.PORT = process.env.PORT || 3001;
// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
exports.BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR ? parseInt(process.env.BCRYPT_WORK_FACTOR) : 13;
console.log("gym_pal Config:".green);
console.log("SECRET_KEY:".yellow, exports.SECRET_KEY);
console.log("PORT:".yellow, exports.PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, exports.BCRYPT_WORK_FACTOR);
console.log("---");
