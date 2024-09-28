import express from 'express'
import { verifyUser } from '../errorHandler/verifyUser.js'
import { createComment , getComment , likeComment , updateComment } from '../controllers/comment.controller.js'
const commmentRouter = express.Router()

commmentRouter.post('/create' , verifyUser , createComment)
commmentRouter.get('/getComments/:postId' , verifyUser , getComment)
commmentRouter.put( '/likeComment/:id' , verifyUser , likeComment)
commmentRouter.put( '/updateComment/:id' , verifyUser , updateComment)

export default commmentRouter