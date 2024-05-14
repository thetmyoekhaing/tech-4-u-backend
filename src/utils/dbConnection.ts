import mongoose from "mongoose";

export const connect = () => {
    return mongoose.connect(process.env.CONNECTION_STRING!);
};
