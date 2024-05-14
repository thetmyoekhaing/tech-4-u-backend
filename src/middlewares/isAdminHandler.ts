import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { constants } from "../constants";
import { isAdmin } from "../models/userModel";
export const checkIsAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log("called");
    let token;
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.toString().startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }

    console.log(token + "a");

    if (!token) {
        res.status(constants.VALIDATION_ERROR);
        next("User is not authorized or token is missing");
        return;
    }
    console.log("token -> " + token);

    try {
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECERT as string,
            async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: err });
                }
                const adminId = (decoded as any)["user"]["_id"];
                const checkIsAdmin = await isAdmin(adminId);
                console.log("check is admin " + checkIsAdmin);
                if (checkIsAdmin) {
                    req.body["adminId"] = adminId;
                    next();
                    return;
                }
                res.status(constants.VALIDATION_ERROR);
                next("This action needs to be an admin to handle.");
                return;
            },
        );
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};
