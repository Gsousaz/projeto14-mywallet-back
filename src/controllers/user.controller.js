import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";
import { v4 as uuid } from "uuid";

export async function cadastro(req, res) {
  try {
    const { user, password, email } = req.body;
    const userAlreadyExists = await db.collection("users").findOne({ email });
    if (userAlreadyExists) return res.sendStatus(409);

    const passwordHash = bcrypt.hashSync(password, 10);
    console.log(passwordHash);

    await db
      .collection("users")
      .insertOne({ user, password: passwordHash, email });
    res.sendStatus(201);
  } catch (err) {
    res.send(err);
  }
}


