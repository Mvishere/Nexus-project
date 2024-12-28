import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        industry: {
            type: String,
            required: true,
            trim: true,
        },
        logo: {
            type: String,
        },
        website: {
            type: String,
            required: true,
            trim: true,
        },
    }, { timestamps: true }
)

export const Company = mongoose.model("Company", companySchema);