import { Router } from "express";
import {
    deleteAUser,
    getAll,
    getOne,
    update,
} from "../controllers/userController";

export const userRouter = Router();

userRouter.route("/").get(getAll);

userRouter.route("/:id").get(getOne).put(update).delete(deleteAUser);
