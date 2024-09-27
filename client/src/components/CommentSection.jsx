import { Textarea, Button, Alert } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Comment from './Comment.jsx'

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [postComments, setPostComments] = useState([])
    const [commentError, setCommentError] = useState(null)
    const navigate = useNavigate()
    const handleComment = async (e) => {
        e.preventDefault()
        setCommentError(null)
        if (comment.length >= 200) {
            return
        }
        try {
            const result = await fetch('http://localhost:5000/comment/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
                credentials: 'include'
            })
            const data = await result.json()
            if (result.ok) {
                setComment('')
                setPostComments([data, ...postComments])
                setCommentError(null)
            }
            if (!result.ok) {
                setCommentError(data.message)
            }
        } catch (error) {
            setCommentError(error.message)
        }
    }

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const result = await fetch(`http://localhost:5000/comment/getComments/${postId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
                const data = await result.json()
                if (result.ok) {
                    setPostComments(data)
                }
                if (!result.ok) {
                    console.log("error in displaying comments", data.message)
                }
            } catch (error) {
                console.log(error);
                setCommentError("Failed to load comments");
            }
        }
        fetchComments()
    }, [postId])
    
    const handleLikes = async (commentId) => {
        if (!currentUser) {
            navigate('/signin')
            return
        }
        try {
            const result = await fetch(`http://localhost:5000/comment/likeComment/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: 'include'
            })
            const data = await result.json()
            
            if (result.ok) {
                setPostComments(prevComments =>
                    prevComments.map((comment) => {
                        if (comment._id === commentId) {
                            return {
                                ...comment,
                                likes: data.likes,
                                numberOfLikes: data.likes.length
                            }
                        }
                        return comment
                    })
                );
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='w-full'>
            {
                currentUser ?
                    (
                        <div className='flex flex-row gap-1 text-sm p-3'>
                            <p>Signed in as:</p>
                            <img className='h-6 w-6 object-cover rounded-full' src={currentUser.photoUrl} />
                            <Link to={'/dashboard?tab=profile'}>
                                <p className='text-blue-600'>@{currentUser.username}</p>
                            </Link>
                        </div>
                    ) : (
                        <div className='text-sm'>
                            Sign in to write comment:
                            <Link className='text-blue-500 p-3 hover:underline' to={'/signin'}
                            >
                                Sign-in
                            </Link>
                        </div>
                    )
            }
            {
                currentUser && (
                    <form onSubmit={handleComment} className='border-2 border-teal-300 rounded-tl-3xl  rounded-br-3xl p-5'>
                        <Textarea
                            rows='3'
                            maxLength='200'
                            placeholder='Add comment...'
                            onChange={event => setComment(event.target.value)}
                            value={comment}
                        />
                        <div className='flex justify-between items-center mt-3 px-3'>
                            <p className='text-sm'>{200 - comment.length} characters remaining</p>
                            <Button
                                type='submit'
                                gradientDuoTone='purpleToBlue' outline>Comment</Button>
                        </div>
                    </form>
                )
            }
            {
                commentError &&
                <Alert className='mt-5' color='failure'>
                    {commentError}
                </Alert>}


            {
                postComments.length > 0 &&
                (<div className='flex items-center gap-2 mt-5'>
                    <p className='text-sm font-semibold'>Comments:</p>
                    <span className='border-[1px] text-sm border-gray-300 px-2'>{postComments.length}</span>
                </div>
                )}
            <div>
                {
                    postComments.map((comment, index) => (
                        <Comment comment={comment} key={index} onLike={handleLikes} />
                    ))
                }
            </div>

        </div>
    )
}
