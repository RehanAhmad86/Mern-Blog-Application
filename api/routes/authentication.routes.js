import express from 'express'
import { signup } from '../controllers/authentication.controller.js'

const authRouter = express.Router()

authRouter.post( '/signup' , signup )
export default authRouter
