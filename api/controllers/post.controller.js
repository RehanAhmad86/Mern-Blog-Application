import { errorHandler } from "../errorHandler/errorHandler.js"
import Post from "../models/post.model.js"

export const createPost = async (request, response, next) => {
    if (!request.user.isAdmin) {
        return next(errorHandler(403, 'Only Admin can post!'))
    }
    if (!request.body.title && !request.body.content) {
        return next(errorHandler(401, 'All fields are mandatory!'))
    }
    const slug = request.body.title.split(" ").join('-').toLowerCase().replace(/[^a-zA-Z0-9\-]/g, '')
    const newPost = new Post({
        ...request.body, slug, authorId: request.user.id
    })
    try {
        const savedPost = await newPost.save()
        response.status(201).json(savedPost)
    } catch (error) { next(error) }
}

export const getPosts = async (request, response, next) => {
    try {
        const startIndex = parseInt(request.query.startIndex) || 0
        const limit = parseInt(request.query.limit) || 9
        const sortPost = request.query.order === 'asc' ? 1 : -1
        const posts = await Post.find({
            ...(request.query.category && { category: request.query.category }),
            ...(request.query.slug && { slug: request.query.slug }),
            ...(request.query.authorId && { authorId: request.query.authorId }),
            ...(request.query.postId && { _id: request.query.postId }),
            ...(request.query.searchTerm && {
                $or: [
                    { title: { $regex: request.query.searchTerm, $options: 'i' } },
                    { content: { $regex: request.query.searchTerm, $options: 'i' } }
                ]
            })
        }).sort({ updatedAt: sortPost }).skip(startIndex).limit(limit)

        const totalPost = await Post.countDocuments()
        const date = new Date()
        const lastMonth = new Date(
            date.getFullYear(),
            date.getMonth() - 1 ,
            date.getDate()
        )
        // console.log(lastMonth)

        const postsLastMonth = await Post.countDocuments(
            {
                createdAt: {
                    $gte: lastMonth
                }
            }
        )
        response.status(200).json({
            posts,
            totalPost,
            postsLastMonth
        })
    } catch (error) {
        next(error)
    }

}

export const deletePosts = async ( request , response , next ) => {
    console.log("User id from token is : " , request.user.id)
    if(request.user.id !== request.params.userId){
        return next(errorHandler(403 , "Delete your post not others!"))
    }
    try{
        const deletePost = await Post.findByIdAndDelete(request.params.id)
        response.status(200).json("Post is deleted!")
    }catch(error){next(error)}
}