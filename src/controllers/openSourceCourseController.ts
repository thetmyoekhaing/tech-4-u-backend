import { NextFunction, Request, Response } from "express";

import mongoose from "mongoose";
import { constants } from "../constants";
import {
    OpenSourceCourse,
    createCourse,
    deleteCourse,
    getCourse,
    getCourses,
    getCreatedBy,
    updateCourse,
} from "../models/openSourceCourseModel";
import { User } from "../models/userModel";

export const getAllOpenSourceCourses = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const docs = await getCourses();
        return res.status(200).json({
            title: "Get Courses",
            message: "Get Courses Successfully",
            data: docs,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const getOneOpenSourceCourse = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const objId = new mongoose.Types.ObjectId(req.params.id);
        const doc = await getCourse(objId);
        console.log(doc);
        if (!doc) {
            console.log("here");
            res.status(constants.NOT_FOUND);
            throw new Error("Not found course with that id");
        }

        return res.status(200).json({
            title: "Get Course",
            message: "Get Course Successfully",
            data: doc,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const createOpenSourceCourse = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const doc = await createCourse(req.body);

        return res.status(200).json({
            title: "Create Course",
            message: "Created Course Successfully",
            data: doc,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const updateOpenSourceCourse = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const objId = new mongoose.Types.ObjectId(req.params.id);
        const doc = await updateCourse(objId, req.body);
        if (!doc) {
            res.status(constants.NOT_FOUND);
            throw new Error("Course not found");
        }

        return res.status(201).json({
            title: "Update Course Course",
            message: "Updated Course Successfully",
            data: doc,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const deleteOpenSourceCourse = async (
    err: ErrorCallback,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const objId = new mongoose.Types.ObjectId(req.params.id);
        const doc = await deleteCourse(objId);
        if (!doc) {
            res.status(constants.NOT_FOUND);
            throw new Error("Not found course with that id");
        }

        return res.status(201).json({
            title: "Delete Course",
            message: "Deleted Course Successfully",
            data: doc,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const acceptCourse = async (
    err: ErrorCallback,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { courseId, adminId } = req.body;

        if (!courseId) {
            console.log(courseId);
            res.status(constants.VALIDATION_ERROR);
            throw new Error("Course Id is required to accpet course.");
        }
        const courseObjId = new mongoose.Types.ObjectId(courseId);
        console.log(courseObjId);
        if (adminId) {
            const updatedDoc = await OpenSourceCourse.findOneAndUpdate(
                { _id: courseObjId },
                { $set: { status: "accepted" } },
                { new: true },
            )
                .lean()
                .exec();

            if (!updateCourse) {
                res.status(constants.VALIDATION_ERROR);
                throw new Error("Error Acepting Course");
            }
            await User.findByIdAndUpdate(await getCreatedBy(courseObjId), {
                $push: { courses: courseObjId },
            });

            return res.status(200).json({
                title: "Course Accepted",
                message: "Course Accepted Successfully",
                data: updatedDoc,
            });
        }

        return res.json({ title: "Authorization Failed", message: err });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};
