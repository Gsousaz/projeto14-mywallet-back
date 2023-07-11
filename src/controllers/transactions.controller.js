import { db } from "../database/database.connection.js";

export async function newTransaction(req, res) {
  try {
    const { tipo } = req.params;
    const { valor, descricao } = req.body;
    const { userId } = res.locals.session;

    const transaction = { tipo, valor: Number(valor), descricao, userI };

    if (!tipo) return res.sendStatus(422);
    await db.collection("transactions").insertOne(transaction);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function showTransactions(req, res) {
  try {
    const transactions = await db.collection("transactions").find().toArray();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
