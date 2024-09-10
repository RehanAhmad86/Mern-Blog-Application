import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async( request , response ) => {
const { username , email , password } = request.body
if( !username || !email || !password || username === "" || email === "" || password === ""){
    response.status(404).json("All fields are required")
}    

const hashedPassword = bcryptjs.hashSync(password , 10)

 const signUpUser = new User({
    username,
    email,
    password: hashedPassword
 })
 try{
    await signUpUser.save()
    response.status(201).json("User Sign-up successful!")
 }
 catch(error){
    response.json(error.errmsg)
 }

} 