import mongoose from "mongoose";
import { Course } from "./courseModel";

const openSourceCourseSchema = new mongoose.Schema(
    {
        platformImage: {
            type: String,
        },
    },
    { discriminatorKey: "type" },
);

export const OpenSourceCourse = Course.discriminator(
    "OpenSourceCourse",
    openSourceCourseSchema,
);

export const getCreatedBy = (id: mongoose.Types.ObjectId) =>
    Course.findById(id)
        .exec()
        .then((course) => course?.createdBy);
export const getCourses = () => OpenSourceCourse.find();

export const getCourse = (id: mongoose.Types.ObjectId) =>
    OpenSourceCourse.findById(id);

export const createCourse = (course: Record<string, any>) =>
    OpenSourceCourse.create(course);

export const updateCourse = (
    id: mongoose.Types.ObjectId,
    course: Record<string, any>,
) => OpenSourceCourse.findOneAndUpdate(id, course);

export const deleteCourse = (id: mongoose.Types.ObjectId) =>
    OpenSourceCourse.deleteOne(id);
