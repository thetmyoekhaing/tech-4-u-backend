import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { constants } from "../constants";
import { User, createUser, getUserByEmail } from "../models/userModel";

export const checkUserInfo = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log(req.body);
    res.status(200).json({
        title: "Current user",
        message: "Successfully logged in",
        data: req.body,
    });
};

export const signIn = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        let doc;
        const { userName, email, password } = req.body;
        if (!userName && !email) {
            res.status(constants.VALIDATION_ERROR);
            throw new Error("username and email are required");
        }

        if (!password) {
            res.status(constants.VALIDATION_ERROR);
            throw new Error("password is required");
        }

        if (userName) {
            doc = await User.findOne({ userName }).select("+password");

            if (!doc) {
                res.status(constants.NOT_FOUND);
                throw new Error(
                    `User not found with that username : ${userName}`,
                );
            }
        }

        if (email) {
            doc = await getUserByEmail(email).select("+password");

            if (!doc) {
                res.status(constants.NOT_FOUND);
                throw new Error(`User not found with that email : ${email}`);
            }
        }

        console.log(password);
        console.log(doc?.password);

        if (doc && (await bcrypt.compare(password, doc.password))) {
            const token = jwt.sign(
                {
                    user: {
                        _id: doc._id,
                        email: doc.email,
                        username: doc.userName,
                    },
                },
                process.env.ACCESS_TOKEN_SECERT as string,
                {
                    expiresIn: "30d",
                },
            );
            return res.status(201).json({
                title: "Sign In User",
                message: "User sigin in successfully",
                data: { ...doc.toObject(), authToken: token },
            });
        } else {
            res.status(constants.VALIDATION_ERROR);
            throw new Error("password is not correct");
        }
    } catch (error) {
        res.status(constants.FORBIDDEN);
        next(error);
    }
};

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.body["isAdmin"]) {
        req.body["isAdmin"] = false;
    }

    try {
        const doc = await createUser(req.body);

        const token = jwt.sign(
            {
                _id: doc._id,
                email: doc.email,
                username: doc.userName,
            },
            process.env.ACCESS_TOKEN_SECERT as string,
            {
                expiresIn: "30d",
            },
        );
        res.status(201).json({
            title: "Create user",
            message: "Created user successfully",
            data: doc,
            authToken: token,
        });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};
