import mongoose from 'mongoose'
import { type } from 'os'

const userSchema = new mongoose.Schema({
    username:{
        type: String ,
        unique: true,
        required:  true
    },
    email:{
        type: String ,
        unique: true,
        required:  true
    },
    photoUrl:{
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s'
    },
    password:{
        type: String ,
        required:  true
    }
},{timestamps: true}
) 

export default mongoose.model( 'User' , userSchema)
