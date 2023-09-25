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
exports.createClient = void 0;
const mongodb_1 = require("mongodb");
function createClient() {
    return __awaiter(this, void 0, void 0, function* () {
        // const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.DB_PW}@${process.env.CLUSTER}.mongodb.net/test?retryWrites=true&w=majority&appName=AtlasApp`;
        const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.DB_PW}@cluster0.ceskqgm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;
        const client = new mongodb_1.MongoClient(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        return client;
    });
}
exports.createClient = createClient;
// export async function getExercises() {
//     const client = await createClient();
//     try {      
//         await client.connect();  
//         const db = await client.db('Gym_Pal')
//         const collection = await db.collection("Exercises").find({}).toArray()
//         const data: Record<string, any> = collection[0];
//         if(data["_id"]) delete data["_id"]
//         return data
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
//  }
