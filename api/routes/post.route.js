import express from 'express'
import { verifyUser } from '../errorHandler/verifyUser.js'
import { createPost , deletePosts, getPosts, updatePost } from '../controllers/post.controller.js'

const postRouter = express.Router()

postRouter.post( '/create' , verifyUser , createPost)
postRouter.get( '/getposts' , getPosts)
postRouter.delete('/delete/:id/:userId', verifyUser , deletePosts)
postRouter.put('/update-post/:id/:userId', verifyUser , updatePost)

export default postRouter