import { db } from "../database/database.connection.js";

export async function newTransaction(req, res) {
  try {
    const { tipo } = req.params;
    const { valor, descricao } = req.body;
    const { _id } = res.locals.session;
    console.log("userId", _id);
    const data = Date.now();
    const transaction = {
      userId: _id,
      tipo,
      valor: Number(valor),
      descricao,
      data,
    };

    if (!tipo) {
      return res.sendStatus(422);
    }

    await db.collection("transactions").insertOne(transaction);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function showTransactions(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send("Não recebi token");
    }

    const user = await db.collection("sessions").findOne({ token });

    if (!user) {
      return res.status(401).send({ message: "Usuário não está logado!" });
    }

    console.log("user", user);
    const userInfo = await db.collection("users").find({ userId: user._id }).toArray();
    console.log("userInfo", user._id);

    const transactions = await db
      .collection("transactions")
      .find({ userId: user._id })
      .sort({ date: -1 })
      .toArray();

    res.send(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
