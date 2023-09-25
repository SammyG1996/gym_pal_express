import { createClient } from "../db";
import bcrypt from "bcrypt";
import { NotFoundError, UnauthorizedError } from "../expressError";
import { BCRYPT_WORK_FACTOR } from "../config";

export class Auth {
    static async authUser(usersname:string, password:string){
        const client = await createClient();
        try {      
            await client.connect();  
            const db = await client.db('Gym_Pal')
            const collection = await db.collection("Users").find({"username" : usersname}).toArray()
            const data: Record<string, any> = collection[0];
            if(!data) throw new NotFoundError();
            const isValid = await bcrypt.compare(password, data["password"]);
            if(!isValid) throw new UnauthorizedError("Invalid username/password")
            if(data["_id"]) delete data["_id"]
            if(data["password"]) delete data["password"]
            return data
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
}