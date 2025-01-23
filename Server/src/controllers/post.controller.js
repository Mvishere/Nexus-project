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
        const { title, content, companyName, tags } = req.body

        const author = req.user._id
        const company = await Company.findOne({ companyName: companyName })

        const tagArr = tags.split(",")

        if (!company) {
            return res.status(400).json({
                success: false,
                message: "Company not found"
            })
        }

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            })
        }

        const post = await Post.create({
            title,
            userId: author,
            companyId: company._id,
            description: content,
            companyName: companyName,
            tags: tagArr,
        })

        return res.status(201).json({
            success: true,
            // post
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error creating post",
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, tags } = req.body

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        console.log(post.userId, req.user._id)

        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "You can't update posts from other users"
            })
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                $set: {
                    title,
                    description,
                    tags,
                }
            },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            updatedPost
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

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "You can't delete posts from other users"
            })
        }

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

const addComment = async (req, res) => {
    const { comment, userId } = req.body
    const postId = req.params.id
    const post = await Post.findById(postId)

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found"
        })
    }

    // logic to add comment to post model

    return res.status(200).json({
        success: true,
        message: "comment added successfully"
    })
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json({ post })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    addComment,
    getPost
}
