import express from 'express'
import { verifyUser } from '../errorHandler/verifyUser.js'
import { createComment } from '../controllers/comment.controller.js'
const commmentRouter = express.Router()

commmentRouter.post('/create' , verifyUser , createComment)
export default commmentRouter