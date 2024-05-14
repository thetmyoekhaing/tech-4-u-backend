import mongoose from "mongoose";
import { Course } from "./courseModel";

const udemyDailySchema = new mongoose.Schema(
    {
        udemyCoupon: {
            type: String,
            required: true,
        },
    },
    { discriminatorKey: "type" },
);

export const UdemyDailyCourse = Course.discriminator(
    "UdemyDailyCourse",
    udemyDailySchema,
);

export const getAcceptedUdemyCourse = () =>
    UdemyDailyCourse.find({ status: "accepted" }).select("-accepted");

export const getUdemyCourses = () => UdemyDailyCourse.find();

export const getUdemyCourse = (id: mongoose.Types.ObjectId) =>
    UdemyDailyCourse.findById(id);

export const createUdemyCourse = (course: Record<string, any>) =>
    UdemyDailyCourse.create(course);

export const updateUdemyCourse = (
    id: mongoose.Types.ObjectId,
    course: Record<string, any>,
) => UdemyDailyCourse.findByIdAndUpdate(id, course);

export const deleteUdemyCourse = (id: mongoose.Types.ObjectId) =>
    UdemyDailyCourse.findByIdAndDelete(id);
