import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let dbConnection;

function connectToDb() {
  if (dbConnection != undefined) {
    return dbConnection;
  }
  const client = new MongoClient(process.env.URI);

  dbConnection = client.db("hamsterwars");
  return dbConnection;
}

export function getCollection(name) {
  return connectToDb().collection(name);
}
