import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { constants } from "../constants";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let token;
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.toString().startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("User is not authorized or token is missing");
    }

    if (!token) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("User is not authorized or token is missing");
    }
    console.log("token -> " + token);

    try {
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECERT as string,
            (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: err });
                }
                req.body = (decoded as any)["user"];
                req.body["authToken"] = token;
                next();
            },
        );
    } catch (error) {
        res.status(constants.VALIDATION_ERROR);
        next(error);
    }
};

export default verifyToken;
