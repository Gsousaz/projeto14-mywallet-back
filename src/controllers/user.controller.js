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


export async function login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await db.collection("users").findOne({ email });
      if (!user) return res.status(404).send("Email não encontrado");
  
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        await db.collection("sessions").insertOne({ user: user.user, token });
        res.status(200).send({ token, user: user.user });
      } else {
        res.status(401).send("Senha incorreta");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }