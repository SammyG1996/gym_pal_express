import { MongoClient } from "mongodb";


async function listDatabases(client: MongoClient){
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


async function main() {
    // we'll add code here soon
    const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.DB_PW}@<your-cluster-url>/sample_airbnb?retryWrites=true&w=majority`;    

    const client = new MongoClient(uri);
   
    try {
        await client.connect();
    
        await listDatabases(client);
    
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
   
 }

