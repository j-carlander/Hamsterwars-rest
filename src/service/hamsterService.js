import { MongoClient, ObjectId } from "mongodb";
import { getCollection } from "../database/mongoDB.js";

export function updateHamster(hamster) {
  const criteria = { _id: new ObjectId(hamster.votedOn) }; // finns title redan i databasen?
  const data = { $inc: { votes: 1 } };

  return getCollection("hamsters").updateOne(criteria, data, { upsert: true }); // update-insert (om ej finns, skapa)
}

export function fetchAllHamsters() {
  return getCollection("hamsters").find().toArray();
}

export function createHamster(hamster) {
  return getCollection("hamsters").insertOne(hamster);
}

export function deleteTodo(title) {
  return getCollection("todo").deleteOne({ title: title });
}
