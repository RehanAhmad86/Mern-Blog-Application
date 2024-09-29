import express from 'express'
import { verifyUser } from '../errorHandler/verifyUser.js'
import { createComment , getComment , likeComment , updateComment , deleteComment } from '../controllers/comment.controller.js'
const commmentRouter = express.Router()

commmentRouter.post('/create' , verifyUser , createComment)
commmentRouter.get('/getComments/:postId' , verifyUser , getComment)
commmentRouter.put( '/likeComment/:id' , verifyUser , likeComment)
commmentRouter.put( '/updateComment/:id' , verifyUser , updateComment)
commmentRouter.delete( '/deleteComment/:id' , verifyUser , deleteComment)

export default commmentRouter