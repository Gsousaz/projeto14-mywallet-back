import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import schemaTransacao from "../schemas/transactionsSchemas.js";
import { newTransaction, showTransactions } from "../controllers/transactions.controller.js";
import { validateSession } from "../middlewares/validateSession.middleware.js";


const transactionRouter = Router();

transactionRouter.post("/nova-transacao/:tipo", validateSession, validateSchema(schemaTransacao), newTransaction);
transactionRouter.get("/transactions", validateSession, showTransactions);

export default transactionRouter;
