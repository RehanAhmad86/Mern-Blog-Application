import express from 'express'
import { verifyUser } from '../errorHandler/verifyUser.js'
import { createPost , getPosts } from '../controllers/post.controller.js'

const postRouter = express.Router()

postRouter.post( '/create' , verifyUser , createPost)
postRouter.get( '/getposts' , getPosts)

export default postRouter