import { createClient } from "../db";
import bcrypt from "bcrypt";
import { NotFoundError, UnauthorizedError, AccountExistsError, BadRequestError } from "../expressError";
import { BCRYPT_WORK_FACTOR } from "../config";
import { CreateUserDoc } from "../helpers/dbSchemas";
import { NextFunction } from "express";

export class Auth {
    static async authUser(username:string, password:string, next:NextFunction){
        const client = await createClient();
        try {      
            await client.connect();  
            const db = await client.db('Gym_Pal')
            const collection = await db.collection("Users").find({"username" : username.toLowerCase()}).toArray()
            const data: Record<string, any> = collection[0];
            if(!data) throw new NotFoundError();
            const isValid = await bcrypt.compare(password, data["password"]);
            if(!isValid) throw new UnauthorizedError("Invalid username/password")
            if(data["_id"]) delete data["_id"]
            if(data["password"]) delete data["password"]
            return data
        } catch (e) {
            return next(e)
        } finally {
            await client.close();
        }
    }

    static async getUserDataAfterOAuth(email:string, next:NextFunction) {

            const client = await createClient();
            try {      
                await client.connect();  
                const db = await client.db('Gym_Pal')
                const collection = await db.collection("Users").find({"email" : email}).toArray()
                const data: Record<string, any> = collection[0];
                if(!data) throw new NotFoundError();
                if(data["_id"]) delete data["_id"]
                if(data["password"]) delete data["password"]
                return data
            } catch (e) {
                return next(e)
            } finally {
                await client.close();
            }
       }

       static async register(userData:{username:string, password:string, firstName:string, lastName:string, email:string}, next:NextFunction) {
            const {username, password, firstName, lastName, email} = userData;
            const client = await createClient();
            try {      
                await client.connect();  
                const db = await client.db('Gym_Pal')
                const usersCollection = await db.collection("Users");
                const userCheck = await usersCollection.find({"username" : username.toLowerCase()}).toArray()
                const userCheckData: Record<string, any> = userCheck[0];
                if(userCheckData) throw new AccountExistsError();
                const emailCheck = await usersCollection.find({"email" : email.toLowerCase()}).toArray()
                const emailCheckData: Record<string, any> = emailCheck[0];
                if(emailCheckData) throw new AccountExistsError();
                /**
                 * YOU NEED TO CREATE THE LOGIC HERE NOW TO HASH THE PW USING BCRYPT THEN CREATE A NEW USER. I SHOULD CREATE A JSON 
                 * TEMPLATE TO BASE THE NEW DOCUMENT ON. NEED TO DO RESEARCH ON THAT
                 */
                console.log("BEFORE HASHED PW")
                console.log(typeof BCRYPT_WORK_FACTOR)
                const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
                console.log("HASHED PW", hashedPassword)
                const submitData = CreateUserDoc(firstName, lastName, email, username, hashedPassword)
                const res = await usersCollection.insertOne(submitData);
                if(!res) throw new BadRequestError()
                return username
            } catch (e) {
                console.log(e)
                return next(e)
            } finally {
                await client.close();
            }

        }
    

}