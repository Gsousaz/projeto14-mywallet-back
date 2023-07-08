import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import joi from "joi";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

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

const schemaLogin = joi.object({
    password: joi.string().required(),
    email: joi.string().required().email()
})

const schemaTransacao = joi.object({
  valor: joi.number().positive().precision(2).required(),
  descricao: joi.string().required()
})



  //-----------------------INICIO DA ROTA POST "/CADASTRO"-----------------------//

  app.post('/cadastro', async (req, res) => {
    try{

        const {user, password, email} = req.body;
        const userAlreadyExists = await db.collection('users').findOne({email})
        const validation = schemaCadastro.validate(req.body, {abortEarly: false});
        
        if (validation.error) {
            const errors = validation.error.details.map ((detail) => detail.message);
            return res.status(422).send(errors);
        }10

        const passwordHash = bcrypt.hashSync(password, 10);
        console.log(passwordHash)

        if (userAlreadyExists) return res.sendStatus(409);

        await db.collection('users').insertOne({user, passwordHash, email});
        res.sendStatus(201);

    } catch (err){
        res.send(err);
    }

  })

  //-----------------------INICIO DA ROTA POST "/LOGIN"-----------------------//

  app.post("/", async (req, res) => {

    try { 

      const {email, password} = req.body;
      const user = await db.collection('users').findOne({email})
      if (!user) return res.status(404).send('Email não encontrado')

      const validation = schemaLogin.validate(req.body, {abortEarly: false});
        
        if (validation.error) {
            const errors = validation.error.details.map ((detail) => detail.message);
            return res.status(422).send(errors);
        }

      if(user && bcrypt.compareSync(password, user.passwordHash)) {
        const token = uuid();
        await db.collection('sessions').insertOne({userId: user._id, token});
        res.status(200).send(token);
        
      } else {
        res.status(401).send("Senha incorreta")
      }
    } catch (err){
      res.status(500).send(err.message)
    }
  })



    //-----------------------INICIO DA ROTA POST "/nova-transacao/"-----------------------//

    app.post("/nova-transacao/:tipo", async (req, res) => {
      
      try {

        const {authorization} = req.headers;
        const token = authorization?.replace('Bearer: ', '');
        if (!token) return res.sendStatus(401);

        const validation = schemaTransacao.validate(req.body, {abortEarly: false});
        if (validation.error) {
            const errors = validation.error.details.map ((detail) => detail.message);
            return res.status(422).send(errors);
        }

        const { tipo } = req.params;
        const {valor, descricao} =  req.body;
        const transaction = { tipo: tipo, valor: valor, descricao: descricao };

        await db.collection('transactions').insertOne( transaction );
        res.sendStatus(200);
      } catch (err){
        res.status(500).send(err.message)
      }
    }) 








    
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));