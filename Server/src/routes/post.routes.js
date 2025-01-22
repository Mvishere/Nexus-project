import { Router } from 'express'
import {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
} from '../controllers/post.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

//Secured routes
router.route('/').get(verifyJWT, getAllPosts)
router.route('/create').post(verifyJWT, createPost)
router.route('/update/:id').put(verifyJWT, updatePost)
router.route('/delete/:id').delete(verifyJWT, deletePost)

export default router
