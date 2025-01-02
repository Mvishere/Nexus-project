import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs';

const registerUser = asyncHandler(async (req, res, next) => {

    // user details from frontend
    const { username, email, password, bio, fullName } = req.body;

    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path;
    }

    if (
        [username, email, password, fullName].some((field) => {
            return field?.trim() === "";
        })
    ) {
        if (avatarLocalPath) {
            fs.unlinkSync(avatarLocalPath);
        }
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        if (avatarLocalPath) {
            fs.unlinkSync(avatarLocalPath);
        }
        throw new ApiError(409, "User with this email already exists");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const user = await User.create({
        username,
        profilePicture: avatar?.url || "",
        email,
        password,
        bio,
        fullName,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        if (avatarLocalPath) {
            fs.unlinkSync(avatarLocalPath);
        }
        throw new ApiError(500, "Failed to register user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );

})

export { registerUser } 