import { NextFunction, Request, Response } from "express";
import { constants } from "../constants";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = res.statusCode ?? 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
            });
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
            });
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
            });
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
            });
        default:
            break;
    }
};
