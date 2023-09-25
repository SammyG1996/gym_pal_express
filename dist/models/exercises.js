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
exports.Exercises = void 0;
const db_1 = require("../db");
class Exercises {
    /**
     * This returns an object containing all the exercises
     * I plan in this storing this on the client side.
     * You should ever have to retreive this the first time you log in
     * I would like to also see if I can take andantage of local storage.
     */
    static getExercises() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, db_1.createClient)();
            try {
                yield client.connect();
                const db = yield client.db('Gym_Pal');
                const collection = yield db.collection("Exercises").find({}).toArray();
                const data = collection[0];
                if (data["_id"])
                    delete data["_id"];
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
exports.Exercises = Exercises;
