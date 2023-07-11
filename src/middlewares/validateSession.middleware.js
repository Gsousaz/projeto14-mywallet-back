import { db } from "../database/database.connection.js";

export async function validateSession(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send("Não recebi token");
    }

    console.log("token", token);

    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
      return res.status(401).send("Não achei o token no banco");
    }

    res.locals.session = session


    console.log("session", res.locals.session)


    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
