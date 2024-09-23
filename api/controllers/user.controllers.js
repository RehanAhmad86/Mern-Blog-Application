import { errorHandler } from "../errorHandler/errorHandler.js"
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const userController1 = async (request, response, next) => {
    response.json({ message: "Route is created" })
}

export const updateUser = async (request, response, next) => {

    //response.json("Update User api")
    console.log(request.user)
    console.log("user", request.user.id)
    console.log("user param", request.params.id)

    if (String(request.user.id) !== String(request.params.id)) {
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
        }, { new: true },
        )
        console.log(updatedUser)
        const { password: pass, ...rest } = updatedUser._doc
        response.status(200).json(rest)
    }
    catch (error) { next(error) }
}

export const deleteUser = async ( request , response , next ) => {
    if( !request.user.isAdmin &&   String(request.user.id) !== String(request.params.id)){
        return next(errorHandler(403 , 'Delete your own account!'))
    }
    console.log(request.user.id)
    console.log(request.params.id)
    console.log(request.user)
    try{
        const deletedUser = await User.findByIdAndDelete(request.params.id)
        response.status(200).json('User has been deleted!')
    }catch(error){ next(error)}
} 


export const signOut = async ( request , response , next ) => {
    try{
    response.clearCookie('access_token').status(200).json('User Signed out successfully!')
    }catch(error){
        next(error)
    }
}

export const getUser = async ( request , response , next ) => {
    if(!request.user.isAdmin){
        return next(errorHandler( 403 , 'Only Admin can view users account'))
    }
    try{
        const startIndex = parseInt(request.query.startIndex) || 0
        const limit = parseInt(request.query.limit) || 9
        const sort =  request.query.order === 'asc' ? 1 : -1  

        const getUsers = await User.find().sort({ createdAt : sort}).skip(startIndex).limit(limit)
        
        console.log("getUsers" , getUsers)
        const allUsers = getUsers.map((user) => {
            const { password: pass, ...rest } = user._doc;
            console.log("rest is " , rest)
            return rest;
          });

            const date = new Date()
            const dateOneMonthAgo = new Date(
                date.getFullYear(),
                date.getMonth() - 1 ,
                date.getDate()
            )
            const totalUsers = await User.countDocuments()
            const lastMonthUsers = await User.countDocuments({
                createdAt:{ $gte : dateOneMonthAgo}
            })
            response.status(200).json(
                {
                    users: allUsers,
                    totalUsers,
                    lastMonth: lastMonthUsers
                }
            )

    }catch(error){next(error)}
}