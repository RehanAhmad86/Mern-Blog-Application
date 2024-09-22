import express from 'express'
import { userController1 } from '../controllers/user.controllers.js'
import { updateUser , deleteUser , signOut , getUser } from '../controllers/user.controllers.js'
import { verifyUser } from '../errorHandler/verifyUser.js'

const router = express.Router()

router.get( '/test' , userController1 )
router.put('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser);
router.post( '/signout' , signOut)
router.get( '/getUser' , verifyUser , getUser)


export default router