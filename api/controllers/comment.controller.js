import { response } from "express"
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

export const likeComment  = async (  request , response  , next ) => {
    const findComment = await Comment.findById(request.params.id)
    if(!findComment){
        return next(errorHandler( 401 , 'Comment not found!'))
    }
    try{
        const userLiked = findComment.likes.indexOf(request.user.id)
        if(userLiked === -1){
            findComment.numberOfLikes += 1
            findComment.likes.push(request.user.id)
        }
        else{
            findComment.numberOfLikes -= 1
            findComment.likes.splice( userLiked , 1)
        }
        await findComment.save()
        response.status(200).json(findComment)
    }catch(error){next(error)}
}

export const updateComment = async ( request , response , next ) => {
    try{
        const editComment = await Comment.findById(request.params.id)
        if(!editComment){
            return next(errorHandler( 400 , 'No comment found!'))
        }
        if(request.user.id !== editComment.userId){
            return next(errorHandler(403 , 'You can only update your own Comment!'))
        }
        const editedComment = await Comment.findByIdAndUpdate(
            request.params.id,
            {
                content: request.body.content
            },{new:true}
        )
        response.status(200).json(editedComment)
    }catch(error){next(error)}
}