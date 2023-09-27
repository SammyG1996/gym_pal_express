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
exports.Auth = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const expressError_1 = require("../expressError");
const config_1 = require("../config");
const dbSchemas_1 = require("../helpers/dbSchemas");
class Auth {
    static authUser(username, password, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, db_1.createClient)();
            try {
                yield client.connect();
                const db = yield client.db('Gym_Pal');
                const collection = yield db.collection("Users").find({ "username": username.toLowerCase() }).toArray();
                const data = collection[0];
                if (!data)
                    throw new expressError_1.NotFoundError();
                const isValid = yield bcrypt_1.default.compare(password, data["password"]);
                if (!isValid)
                    throw new expressError_1.UnauthorizedError("Invalid username/password");
                if (data["_id"])
                    delete data["_id"];
                if (data["password"])
                    delete data["password"];
                return data;
            }
            catch (e) {
                return next(e);
            }
            finally {
                yield client.close();
            }
        });
    }
    static getUserDataAfterOAuth(email, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, db_1.createClient)();
            try {
                yield client.connect();
                const db = yield client.db('Gym_Pal');
                const collection = yield db.collection("Users").find({ "email": email }).toArray();
                const data = collection[0];
                if (!data)
                    throw new expressError_1.NotFoundError();
                if (data["_id"])
                    delete data["_id"];
                if (data["password"])
                    delete data["password"];
                return data;
            }
            catch (e) {
                return next(e);
            }
            finally {
                yield client.close();
            }
        });
    }
    static register(userData, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, firstName, lastName, email } = userData;
            const client = yield (0, db_1.createClient)();
            try {
                yield client.connect();
                const db = yield client.db('Gym_Pal');
                const usersCollection = yield db.collection("Users");
                const userCheck = yield usersCollection.find({ "username": username.toLowerCase() }).toArray();
                const userCheckData = userCheck[0];
                if (userCheckData)
                    throw new expressError_1.AccountExistsError();
                const emailCheck = yield usersCollection.find({ "email": email.toLowerCase() }).toArray();
                const emailCheckData = emailCheck[0];
                if (emailCheckData)
                    throw new expressError_1.AccountExistsError();
                /**
                 * YOU NEED TO CREATE THE LOGIC HERE NOW TO HASH THE PW USING BCRYPT THEN CREATE A NEW USER. I SHOULD CREATE A JSON
                 * TEMPLATE TO BASE THE NEW DOCUMENT ON. NEED TO DO RESEARCH ON THAT
                 */
                console.log("BEFORE HASHED PW");
                console.log(typeof config_1.BCRYPT_WORK_FACTOR);
                const hashedPassword = yield bcrypt_1.default.hash(password, config_1.BCRYPT_WORK_FACTOR);
                console.log("HASHED PW", hashedPassword);
                const submitData = (0, dbSchemas_1.CreateUserDoc)(firstName, lastName, email, username, hashedPassword);
                const res = yield usersCollection.insertOne(submitData);
                if (!res)
                    throw new expressError_1.BadRequestError();
                return username;
            }
            catch (e) {
                console.log(e);
                return next(e);
            }
            finally {
                yield client.close();
            }
        });
    }
}
exports.Auth = Auth;
