import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyUser = async ( request , response , next ) => {
    const token = request.cookies.access_token
    console.log('token from cookies:' ,token)
    
    if(!token){
        return next(errorHandler(401 , 'Unauthorized'))
    }
    console.log(token)
    jwt.verify( token , process.env.JWT_SECRET_KEY , ( error , user ) => {
        if(error){
            return next(errorHandler( 401 , 'Unauthorized'))
        }
        request.user = user
        next()
    })
}


