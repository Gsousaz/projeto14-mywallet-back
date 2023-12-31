import { Router } from "express"
import userRouter from "./user.routes.js";
import transactionRouter from "./transactions.routes.js"

const router = Router();
router.use(userRouter);
router.use(transactionRouter)

export default router;