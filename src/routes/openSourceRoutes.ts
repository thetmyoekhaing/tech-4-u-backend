import express from "express";
import {
    acceptCourse,
    createOpenSourceCourse,
    deleteOpenSourceCourse,
    getAllOpenSourceCourses,
    getOneOpenSourceCourse,
    updateOpenSourceCourse,
} from "../controllers/openSourceCourseController";
import { checkIsAdmin } from "../middlewares/isAdminHandler";

export const openSourceRouter = express.Router();

// /api/courses

openSourceRouter
    .route("/")
    .get(getAllOpenSourceCourses)
    .post(createOpenSourceCourse);

openSourceRouter.route("/accept").put(checkIsAdmin, acceptCourse);

openSourceRouter
    .route("/:id")
    .get(getOneOpenSourceCourse)
    .put(checkIsAdmin, updateOpenSourceCourse)
    .delete(checkIsAdmin, deleteOpenSourceCourse);
