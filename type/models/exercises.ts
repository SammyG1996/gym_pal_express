import { createClient } from "../db";


export class Exercises {
    
    /**
     * This returns an object containing all the exercises 
     * I plan in this storing this on the client side. 
     * You should ever have to retreive this the first time you log in 
     * I would like to also see if I can take andantage of local storage. 
     */
    static async getExercises() {
        const client = await createClient();
        try {      
            await client.connect();  
            const db = await client.db('Gym_Pal')
            const collection = await db.collection("Exercises").find({}).toArray()
            const data: Record<string, any> = collection[0];
            if(data["_id"]) delete data["_id"]
            return data
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
       
     }
}