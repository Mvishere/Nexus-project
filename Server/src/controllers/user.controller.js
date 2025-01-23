import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to generate tokens"
        })
    }
}

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
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        if (avatarLocalPath) {
            fs.unlinkSync(avatarLocalPath);
        }
        return res.status(409).json({
            success: false,
            message: "User already exists",
        });
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
        return res.status(500).json({
            success: false,
            message: "Failed to register user",
        })
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );

})

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Invalid password"
        });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: ""
        },
        new: true
    })

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        return res.status(401).json({
            success: false,
            message: "Refresh token is required"
        })
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            })
        }

        if (incomingRefreshToken != user?.refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is used or expired"
            })
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(200, {
                    accessToken: accessToken,
                    refreshToken: newRefreshToken
                }, "Access token refreshed"
                )
            )
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error?.message || "Invalid refresh token"
        })
    }
})

const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken")

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    return res.status(200).json(new ApiResponse(200, user, "User details"))
})

export { registerUser, loginUser, logoutUser, refreshAccessToken, getUser }; 