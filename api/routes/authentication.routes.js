import express from 'express'
import { signup , signin , google } from '../controllers/authentication.controller.js'

const authRouter = express.Router()

authRouter.post( '/signup' , signup )
authRouter.post( '/signin' , signin )
authRouter.post( '/google' , google )
export default authRouter
