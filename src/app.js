import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import joi from "joi";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const app = express(); // App do servidor
const PORT = 5000;

app.use(cors());
app.use(express.json());
dotenv.config();


const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;
mongoClient
  .connect()
  .then(() => (db = mongoClient.db()) && console.log("O mongo está rodando"))
  .catch((err) => console.log(err.message));

  //--------------------------SCHEMAS (validação com Joi)--------------------------//

const schemaCadastro = joi.object({
    user: joi.string().required(),
    password: joi.string().required().min(3),
    email: joi.string().required().email()
})


  //-----------------------INICIO DA ROTA POST "/CADASTRO"-----------------------//

  app.post('/sign-up', async (req, res) => {
    try{

        const {user, password, email} = req.body;
        const userAlreadyExists = await db.collection('users').findOne({email})
        const validation = schemaCadastro.validate(req.body, {abortEarly: false});
        
        if (validation.error) {
            const errors = validation.error.details.map ((detail) => detail.message);
            return res.status(422).send(errors);
        }

        const passwordHash = bcrypt.hashSync(password, 10);
        console.log(passwordHash)

        if (userAlreadyExists) if (userAlreadyExists) return res.sendStatus(409);

        await db.collection('users').insertOne({user, passwordHash, email});
        res.sendStatus(201);

    } catch (err){
        res.send(err);
    }

  })


app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));