import express from 'express'
import { verifyUser } from '../errorHandler/verifyUser.js'
import { createComment , getComment } from '../controllers/comment.controller.js'
const commmentRouter = express.Router()

commmentRouter.post('/create' , verifyUser , createComment)
commmentRouter.get('/getComments/:postId' , verifyUser , getComment)

export default commmentRouter