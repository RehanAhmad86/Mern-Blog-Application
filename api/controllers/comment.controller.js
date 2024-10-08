import { errorHandler } from "../errorHandler/errorHandler.js"
import Comment from "../models/comment.model.js"

export const createComment = async (request, response, next) => {
    const { userId, postId, content } = request.body
    if (request.user.id !== userId) {
        return next(errorHandler(403, 'You are not allowed to commment!'))
    }
    try {
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        await newComment.save()
        response.status(200).json(newComment)
    } catch (error) { next(error) }
}

export const getComment = async (request, response, next) => {
    try {
        const getcomments = await Comment.find({ postId: request.params.postId }).sort({
            createdAt: -1
        })
        console.log(getcomments)
        response.status(200).json(getcomments)
    } catch (error) { next(error) }
}

export const likeComment = async (request, response, next) => {
    const findComment = await Comment.findById(request.params.id)
    if (!findComment) {
        return next(errorHandler(401, 'Comment not found!'))
    }
    try {
        const userLiked = findComment.likes.indexOf(request.user.id)
        if (userLiked === -1) {
            findComment.numberOfLikes += 1
            findComment.likes.push(request.user.id)
        }
        else {
            findComment.numberOfLikes -= 1
            findComment.likes.splice(userLiked, 1)
        }
        await findComment.save()
        response.status(200).json(findComment)
    } catch (error) { next(error) }
}

export const updateComment = async (request, response, next) => {
    try {
        const editComment = await Comment.findById(request.params.id)
        if (!editComment) {
            return next(errorHandler(400, 'No comment found!'))
        }
        if (request.user.id !== editComment.userId) {
            return next(errorHandler(403, 'You can only update your own Comment!'))
        }
        const editedComment = await Comment.findByIdAndUpdate(
            request.params.id,
            {
                content: request.body.content
            }, { new: true }
        )
        response.status(200).json(editedComment)
    } catch (error) { next(error) }
}

export const deleteComment = async (request, response, next) => {
    try {
        const comment = await Comment.findById(request.params.id)
        console.log(comment)
        if (!comment) {
            return next(errorHandler(401, 'Comment not found!'))
        }
        if (request.user.id !== comment.userId || !request.user.isAdmin) {
            return next(errorHandler(403, "Delete your account not others!"))
        }
        await Comment.findByIdAndDelete(request.params.id)
        response.status(200).json("Comment has been deleted!")
    } catch (error) { next(error) }
}

export const getAllComment = async ( request , response , next ) => {
    if(!request.user.isAdmin){
        return next(errorHandler( 401 , 'You cannot delete the commets!'))
    }
    try{
        const startIndex = parseInt(request.query.startIndex) || 0
        const limit = parseInt(request.query.limit) || 9
        const order = request.query.order === 'asc' ? 1 : -1
        const comments = await Comment.find().sort({createdAt: order}).skip(startIndex).limit(limit)
        const totalComments = await Comment.countDocuments()
        const date = new Date()
        const dateMonthAgo = new Date(date.getFullYear() , date.getMonth() -1 , date.getDate())
        const lastMonthComments = await Comment.countDocuments({
          createdAt:  {$gte: dateMonthAgo}
        })
        response.status(200).json({comments , totalComments , lastMonthComments})
    }catch(error){next(error)}
}