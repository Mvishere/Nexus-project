import { Post } from "../models/post.model.js"
import { Company } from "../models/company.model.js"

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
        return res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching posts"
        })
    }
}

const createPost = async (req, res) => {
    try {
        const { title, description, companyName, tags } = req.body

        const author = req.user._id
        const company = await Company.findOne({ companyName: companyName })

        if (!company) {
            return res.status(400).json({
                success: false,
                message: "Company not found"
            })
        }

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            })
        }

        const post = await Post.create({
            title,
            userId: author,
            companyId: company._id,
            description,
            tags,
        })

        return res.status(201).json({
            success: true,
            post
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating post"
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content, category } = req.body

        const post = await Post.findByIdAndUpdate(
            id,
            {
                $set: {
                    title,
                    content,
                    category
                }
            },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating post"
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        await Post.findByIdAndDelete(id)

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting post"
        })
    }
}

export {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
}
