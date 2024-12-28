import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        profilePicture: {
            type: String,
        },
        bio: {
            type: String,
            trim: true,
        }
    }, { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, process.env.SALT_ROUNDS);
        return next();
    } catch (error) {
        return next(error);
    }
})

export const User = mongoose.model("User", userSchema);