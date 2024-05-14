import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { constants } from "../constants";
import {
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "../models/userModel";

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const docs = await getAllUsers();
        if (!docs) {
            res.status(constants.NOT_FOUND);
            throw new Error("No Users found");
        }

        return res.status(200).json({
            title: "Get all users",
            message: "Get all users successfully",
            data: docs,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const getOne = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        let docs;
        const { email, id } = req.params;
        console.log(email);
        console.log(id);
        if (!id) {
            res.status(constants.VALIDATION_ERROR);
            throw new Error("User id is required to get one user.");
        }

        if (id) {
            docs = await getUserById(new mongoose.Types.ObjectId(id));
        }

        if (!docs) {
            res.status(constants.NOT_FOUND);
            throw new Error("No User found");
        }

        return res.status(200).json({
            title: "Get user",
            message: "Get users successfully",
            data: docs,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const update = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const doc = await updateUser(req.body, id);
        if (!doc) {
            res.status(constants.VALIDATION_ERROR);
            throw new Error("User updating failed.");
        }
        res.status(201).json({
            title: "Update user",
            message: "Updated user successfully",
            data: doc,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export const deleteAUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const doc = await deleteUser(id);
        if (!doc) {
            res.status(constants.VALIDATION_ERROR);
            throw new Error("User deleting failed.");
        }
        res.status(201).json({
            title: "Delete user",
            message: "Deleted user successfully",
            data: doc,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};
