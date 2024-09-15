import { errorHandler } from "../errorHandler/errorHandler.js"
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const userController1 = async (request, response, next) => {
    response.json({ message: "Route is created" })
}

export const updateUser = async (request, response, next) => {
   
    // response.json("Update User api")
    // console.log(request.user)
    // console.log("user" , request.user.id)
    // console.log("user param" , request.params.id)

    if (request.user.id !== request.params.id) {
        return next(errorHandler(403, "Update Your own account not others"))
    }
    if (request.body.password) {
        if (request.body.password.length < 6) {
            return next(errorHandler(400, "Password must be greater than 6 characters."))
        }
        request.body.password = bcryptjs.hashSync(request.body.password, 10)
    }
    if (request.body.username) {
        if (request.body.username.length < 7 || request.body.username.length > 20) {
            return next(errorHandler(400, "Username must be in between 7 an 20 charcters!"))
        }
        if (request.body.username.includes(' ')) {
            return next(errorHandler(400, "Username cannot contain spaces"))
        }
        if (request.body.username !== request.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be in lower order alphabets!'))
        }
        if (!request.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Useranme must not contain special letters!'))
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, {
            $set: {
                username: request.body.username,
                email: request.body.email,
                password: request.body.password,
                photoUrl: request.body.photoUrl,
            }
        },{new: true},
    )
    console.log(updatedUser)
    const { password: pass , ...rest } = updatedUser._doc
    response.status(200).json(rest)
    }
    catch(error){ next(error) }
}