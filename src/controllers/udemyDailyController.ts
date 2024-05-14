import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { constants } from "../constants";
import {
    createUdemyCourse,
    deleteUdemyCourse,
    getAcceptedUdemyCourse,
    getUdemyCourse,
    getUdemyCourses,
    updateUdemyCourse,
} from "../models/udemyDailyCourseModel";

export const getAcceptedCourses = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const docs = await getAcceptedUdemyCourse();
        return res.status(200).json({
            title: "Get Udemy Daily Courses",
            message: "Get Udemy Daily Courses Successfully",
            data: docs,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const getAllUdemyDailyCourses = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const docs = await getUdemyCourses();
        return res.status(200).json({
            title: "Get Udemy Daily Courses",
            message: "Get Udemy Daily Courses Successfully",
            data: docs,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const getOneUdemyDailyCourse = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const objId = new mongoose.Types.ObjectId(req.params.id);
        const doc = await getUdemyCourse(objId);
        if (!doc) {
            res.status(constants.NOT_FOUND);
            throw new Error("Not found udemy daily course with that id");
        }

        return res.status(200).json({
            title: "Get Udemy Daily Course",
            message: "Get Udemy Daily Course Successfully",
            data: doc,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const createUdemyDailyCourse = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const doc = await createUdemyCourse(req.body);

        return res.status(200).json({
            title: "Create Udemy Daily Course",
            message: "Created Udemy Daily Course Successfully",
            data: doc,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const updateUdemyDailyCourse = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const objId = new mongoose.Types.ObjectId(req.params.id);
        const doc = await updateUdemyCourse(objId, req.body);
        if (!doc) {
            res.status(constants.NOT_FOUND);
            throw new Error("Course not found");
        }

        return res.status(201).json({
            title: "Update Udemy Daily Course",
            message: "Updated Udemy Daily Course Successfully",
            data: doc,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const deleteUdemyDailyCourse = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const objId = new mongoose.Types.ObjectId(req.params.id);
        const doc = await deleteUdemyCourse(objId);
        if (!doc) {
            res.status(constants.NOT_FOUND);
            throw new Error("Not found udemy daily course with that id");
        }

        return res.status(201).json({
            title: "Delete Udemy Daily Course",
            message: "Deleted Udemy Daily Course Successfully",
            data: doc,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};
