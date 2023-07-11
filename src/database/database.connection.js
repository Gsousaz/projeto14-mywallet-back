import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
  await mongoClient.connect();
  console.log("O mongo está rodando");
  db = mongoClient.db();
} catch (err) {
  console.log(err.message);
}

export { db };
