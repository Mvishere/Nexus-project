import { Router } from 'express'
import {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    addComment,
    getPost
} from '../controllers/post.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

//Secured routes
router.route('/').get(verifyJWT, getAllPosts)
router.route('/create').post(verifyJWT, createPost)
router.route('/update/:id').put(verifyJWT, updatePost)
router.route('/delete/:id').delete(verifyJWT, deletePost)
router.route('/comment/:id').post(verifyJWT, addComment)
router.route('/:id').get(verifyJWT, getPost)

export default router
