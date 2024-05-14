import * as dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import verifyToken from "./middlewares/verifyTokenHanlder";
import { authRouter } from "./routes/authRoutes";
import { openSourceRouter } from "./routes/openSourceRoutes";
import { udemyRouter } from "./routes/udemyDailyRoutes";
import { userRouter } from "./routes/userRoutes";
import { connect } from "./utils/dbConnection";

export const env = dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/udemy-courses", verifyToken, udemyRouter);
app.use("/api/courses", openSourceRouter);
app.use("/api/users", userRouter);
app.use("/api/user", authRouter);

app.use(errorHandler);

const port = process.env.PORT || 3001;

const start = async () => {
    try {
        await connect();
        app.listen(port, () => {
            console.log("server listening on port " + port);
        });
    } catch (err) {
        console.error(err);
    }
};

start();
