import express from "express";
import {
    createUdemyDailyCourse,
    deleteUdemyDailyCourse,
    getAcceptedCourses,
    getOneUdemyDailyCourse,
    updateUdemyDailyCourse,
} from "../controllers/udemyDailyController";

export const udemyRouter = express.Router();

// /api/udemy-courses

udemyRouter.route("/").get(getAcceptedCourses).post(createUdemyDailyCourse);

udemyRouter
    .route("/:id")
    .get(getOneUdemyDailyCourse)
    .put(updateUdemyDailyCourse)
    .delete(deleteUdemyDailyCourse);
