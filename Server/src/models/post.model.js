import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments: {
            type: [
                {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                    },
                    content: {
                        type: String,
                        required: true,
                        trim: true,
                    },
                },
            ],
            default: [],
        }
    }, { timestamps: true }
)

// stipend, off campus/on campus, 2 month 6 month placement

export const Post = mongoose.model("Post", postSchema);