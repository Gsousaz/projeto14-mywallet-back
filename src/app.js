import express from "express";
import cors from "cors";
import router from "./routes/index.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


// import express from "express";
// import cors from "cors";
// import { MongoClient, ObjectId } from "mongodb";
// import dotenv from "dotenv";
// import bcrypt from "bcrypt";
// import { v4 as uuid } from "uuid";
// import { schemaCadastro, schemaLogin } from "./schemas/userSchemas.js";
// import schemaTransacao from "./schemas/transactionsSchemas.js";
// import router from "./routes/index.router.js";

// const app = express(); // App do servidor
// const PORT = 5000;
// app.use(router);
// app.use(cors());
// app.use(express.json());





// //--------------------------SCHEMAS (validação com Joi)--------------------------//

// //-----------------------INICIO DA ROTA POST "/CADASTRO"-----------------------//



// //-----------------------INICIO DA ROTA POST "/LOGIN"-----------------------//

// app.post("/", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await db.collection("users").findOne({ email });
//     if (!user) return res.status(404).send("Email não encontrado");
//     const validation = schemaLogin.validate(req.body, { abortEarly: false });

//     if (validation.error) {
//       const errors = validation.error.details.map((detail) => detail.message);
//       return res.status(422).send(errors);
//     }

//     if (user && bcrypt.compareSync(password, user.passwordHash)) {
//       const token = uuid();
//       await db.collection("sessions").insertOne({ userId: user._id, token });
//       res.status(200).send(token);
//     } else {
//       res.status(401).send("Senha incorreta");
//     }
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// //-----------------------INICIO DA ROTA POST "/nova-transacao/"-----------------------//

// app.post("/nova-transacao/:tipo", async (req, res) => {
//   try {
//     const { authorization } = req.headers;
//     const token = authorization?.replace("Bearer: ", "");
//     if (!token) return res.sendStatus(401);
//     console.log("token", token);
//     const validation = schemaTransacao.validate(req.body, {
//       abortEarly: false,
//     });
//     if (validation.error) {
//       const errors = validation.error.details.map((detail) => detail.message);
//       return res.status(422).send(errors);
//     }

//     const user = await db.collection("sessions").findOne({ token: token });

//     const { tipo } = req.params;
//     const { valor, descricao } = req.body;
//     const transaction = { tipo: tipo, valor: valor, descricao: descricao };

//     await db.collection("transactions").insertOne(transaction);
//     res.sendStatus(200);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// //-----------------------INICIO DA ROTA GET "/home/"-----------------------//

// app.get("/home", async (req, res) => {
//   try {
//     const { authorization } = req.headers;
//     const token = authorization?.replace("Bearer ", "");
//     if (!token) return res.sendStatus(401);

//     const user = await db.collection("sessions").findOne({ token: token });

//     const transactions = await db
//       .collection("transactions")
//       .find({ _id: new ObjectId(user.id) })
//       .toArray();

//     console.log("token", token);
//     console.log("userID", user._id);
//     console.log("transactions", transactions);

//     res.sendStatus(200);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// //---------------------------ROTA DE TESTE "/TEST" -----------------------------//

// app.get("/testget", async (req, res) => {
//   try {
//     const users = await db.collection("users").find().toArray();
//     res.status(200).send(users);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
