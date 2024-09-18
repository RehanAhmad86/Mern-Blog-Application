import express from 'express'
import { verifyUser } from '../errorHandler/verifyUser.js'
import { createPost } from '../controllers/post.controller.js'

const router = express.Router()

const postRouter = router.post( '/create' , verifyUser , createPost)

export default postRouter