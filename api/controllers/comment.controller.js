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

export const getComment = async ( request , response , next ) => {
    try{
        const getcomments = await Comment.find({postId: request.params.postId}).sort({
            createdAt : -1
        })
        console.log(getcomments)
        response.status(200).json(getcomments)
    }catch(error){next(error)}
}