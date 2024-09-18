import { errorHandler } from "../errorHandler/errorHandler.js"
import Post from "../models/post.model.js"

export const createPost = async ( request , response , next ) => {
    if( !request.user.isAdmin){
        return next(errorHandler( 403 , 'Only Admin can post!'))
    }
    if(!request.body.title && !request.body.content){
        return next(errorHandler( 401 , 'All fields are mandatory!'))
    }
    const slug = request.body.title.split(" ").join('-').toLowerCase().replace(/[^a-zA-Z0-9\-]/g, '')
    const newPost = new Post({
        ...request.body , slug , authorId: request.user.id
    })
    try{
        const savedPost = await newPost.save()
        response.status(201).json(savedPost)
    }catch(error){next(error)}
}