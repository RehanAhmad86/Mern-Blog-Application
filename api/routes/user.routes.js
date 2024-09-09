import express from 'express'
import { userController1 } from '../controllers/user.controllers.js'

const router = express.Router()

router.get( '/test' , userController1 )

export default router