import express from 'express'
import { userController1 } from '../controllers/user.controllers.js'
import { updateUser } from '../controllers/user.controllers.js'
import { verifyUser } from '../errorHandler/verifyUser.js'

const router = express.Router()

router.get( '/test' , userController1 )
router.put('/update/:id', verifyUser, updateUser);


export default router