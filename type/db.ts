import { MongoClient, ServerApiVersion } from 'mongodb';



export async function createClient(){
    // const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.DB_PW}@${process.env.CLUSTER}.mongodb.net/test?retryWrites=true&w=majority&appName=AtlasApp`;
    const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.DB_PW}@cluster0.ceskqgm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      return client
}

