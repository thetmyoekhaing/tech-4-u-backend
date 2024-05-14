import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        lecturer: {
            type: String,
            required: true,
        },

        org: String,

        coursePhoto: {
            type: String,
            required: true,
        },

        desc: {
            type: String,
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "accepted"],
            default: "pending",
            lowercase: true,
        },
    },
    { timestamps: true },
);

export const Course = mongoose.model("Course", courseSchema);
