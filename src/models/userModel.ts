import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
        },
        userPhoto: String,
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
        isAdmin: {
            immutable: true,
            type: Boolean,
            default: false,
            select: false,
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
    },
    { timestamps: true },
);
export const isAdmin = (id: mongoose.Types.ObjectId) =>
    User.findById(id)
        .select("isAdmin")
        .exec()
        .then((user) => user?.isAdmin);

export const getUserById = (id: mongoose.Types.ObjectId) => User.findById(id);

export const getAllUsers = () => User.find().populate("courses");

export const getUserByEmail = (email: string) => User.findOne({ email });

export const createUser = (user: Record<string, any>) => User.create(user);

export const updateUser = (
    user: Record<string, any>,
    id: mongoose.Types.ObjectId,
) => User.findByIdAndUpdate(id, user, { new: true });

export const deleteUser = (id: mongoose.Types.ObjectId) =>
    User.findByIdAndDelete(id);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }

        this.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = function (password: string) {
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err);
            }

            resolve(same);
        });
    });
};

export const User = mongoose.model("User", userSchema);
