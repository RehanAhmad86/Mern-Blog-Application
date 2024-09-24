import { Textarea , Button, Alert } from 'flowbite-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector(state => state.user)
    const [ comment , setComment ] = useState('')
    const [ commentError , setCommentError ] = useState(null)
    const handleComment = async (e)  => {
        e.preventDefault()
        setCommentError(null)
        if( comment.length >= 200 ){
            return
        }
        try{
            const result = await fetch('http://localhost:5000/comment/create' , {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {content: comment , postId , userId: currentUser._id}),
            credentials: 'include'
        })
        const data = await result.json()
        if(result.ok){
            setComment('')
            setCommentError(null)
        }
        if(!result.ok){
            setCommentError(data.message)
        }}catch(error){
            setCommentError(error.message)
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


        </div>
    )
}
