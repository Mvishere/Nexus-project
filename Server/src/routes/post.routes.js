import { Router } from 'express'
import {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
} from '../controllers/post.controller.js'

const router = Router()

router.get('/', getAllPosts)
router.post('/create', createPost)
router.put('/update/:id', updatePost)
router.delete('/delete/:id', deletePost)

export default router
