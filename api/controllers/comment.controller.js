import { errorHandler } from "../errorHandler/errorHandler.js"
import Comment from "../models/comment.model.js"

export const createComment = async ( request , response , next ) => {
    const { userId , postId , content } =  request.body
    if( request.user.id !== userId){
        return next(errorHandler( 403 , 'You are not allowed to commment!'))
    }
    try{
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        await newComment.save()
        response.status(200).json(newComment)
    }catch(error){next(error)}
}