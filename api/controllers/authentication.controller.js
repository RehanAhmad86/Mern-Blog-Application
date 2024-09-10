import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../errorHandler/errorHandler.js'

export const signup = async (request, response, next) => {
    const { username, email, password } = request.body

    if (!username || !email || !password || username === "" || email === "" || password === "") {
       return next(errorHandler(400 , 'All fields are required!'))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const signUpUser = new User({
        username,
        email,
        password: hashedPassword
    })
    try {
        await signUpUser.save()
        response.status(201).json("User Sign-up successful!")
    }
    catch (error) {
        return next(error)
    }

} 