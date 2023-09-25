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
class Auth {
    static authUser(usersname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, db_1.createClient)();
            try {
                yield client.connect();
                const db = yield client.db('Gym_Pal');
                const collection = yield db.collection("Users").find({ "username": usersname }).toArray();
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
                console.error(e);
            }
            finally {
                yield client.close();
            }
        });
    }
}
exports.Auth = Auth;
