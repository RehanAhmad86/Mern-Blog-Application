import express from 'express'
import { verifyUser } from '../errorHandler/verifyUser.js'
import { createPost , deletePosts, getPosts } from '../controllers/post.controller.js'

const postRouter = express.Router()

postRouter.post( '/create' , verifyUser , createPost)
postRouter.get( '/getposts' , getPosts)
postRouter.delete('/delete/:id/:userId', verifyUser , deletePosts)

export default postRouter