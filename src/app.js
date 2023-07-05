import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

mongoClient
  .connect()
  .then(() => (db = mongoClient.db()) && console.log("O mongo está rodando"))
  .catch((err) => console.log(err.message));




app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));