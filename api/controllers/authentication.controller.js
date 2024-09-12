import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../errorHandler/errorHandler.js'
import jwt from 'jsonwebtoken'

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



export const signin = async ( request , response , next ) => {
    const { email , password } = request.body
    if( !email || !password || email === '' || password === ''){
        return  next(errorHandler(400 , 'All fields are required!'))
    }
try{
    const validUser = await User.findOne({email})
    if(!validUser){
        return next(errorHandler(404 , 'User not found!'))
    }
    //console.log(validUser)

    const comparePassword = bcryptjs.compareSync( password , validUser.password)
    if(!comparePassword){
        return next(errorHandler(404 , 'Invalid Password!'))
    }
    
    const token = jwt.sign({id: validUser._id} , process.env.JWT_SECRET_KEY)
    const {  password: pass , ...rest} = validUser._doc
    

    response.status(200).cookie( 'token' , token , {
        httpOnly: true,
    }).json(rest)

}
    catch(error){
        next(error)
    }

}

export const google = async ( request , response , next ) => {
    const { email , name ,  PhotoUrl } = request.body
    try{
        const user = await User.findOne({email})
        if(user){
            const token = jwt.sign({id: user._id} , process.env.JWT_SECRET_KEY)
            const { password: pass , ...rest } = user._doc
            response.status(200).cookie( 'token' , token , {
                httpOnly: true
            }).json(rest)
        }
        else{
            const generatePassword =Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) 
            const hashedPassword = bcryptjs.hashSync( generatePassword , 10)
            const newUser = new User({
                username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email,
                photoUrl: PhotoUrl ,
                password: hashedPassword
            })
            await newUser.save()
            const token = jwt.sign({id:newUser._id} , process.env.JWT_SECRET_KEY)
            const { password: pass , ...rest } = newUser._doc
            response.status(200).cookie('token' , token , {
                httpOnly: true
            }).json(rest)
        }
    }
    catch(error){
        next(error)
    }
}