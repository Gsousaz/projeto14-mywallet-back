import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { schemaCadastro, schemaLogin } from "../schemas/userSchemas.js";
import { cadastro, login } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/cadastro", validateSchema(schemaCadastro), cadastro);
userRouter.post("/", validateSchema(schemaLogin), login);

export default userRouter;
