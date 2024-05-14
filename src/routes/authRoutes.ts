import { Router } from "express";
import { checkUserInfo, register, signIn } from "../controllers/authController";
import verifyToken from "../middlewares/verifyTokenHanlder";

export const authRouter = Router();

authRouter.post("/signIn", signIn);
authRouter.post("/register", register);
authRouter.post("/checkUserInfo", verifyToken, checkUserInfo);
