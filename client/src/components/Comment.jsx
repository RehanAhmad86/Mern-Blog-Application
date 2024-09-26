import React, { useEffect, useState } from 'react'
import moment from 'moment';

export default function Comment({ comment }) {
    const [user, setuser] = useState({})
    useEffect(() => {
        const getUser = async () => {
            const result = await fetch(`http://localhost:5000/user/${comment.userId}`, {
                method: "GET",
                header: {
                    "Content-Type": "application/json"
                }
            })
            const data = await result.json()
            if (result.ok) {
                setuser(data)
            }
            else {
                console.log(data.message)
            }
        }
        getUser()
    }, [comment.userId])
    console.log(user)
    return (
        <div className='flex p-5 items-center gap-3 text-sm border-b-[1px] border-gray-800'>
            <div>
                <img className='mr-4 flex-shrink-0 w-10 h-10 rounded-full object-cover' src={user.photoUrl} />
            </div>
            <div className='flex-1'>
                <div className='flex gap-2 items-center mb-1'>
                    <span className='font-semibold text-sm text-gray-400 truncate'>
                        {user ? `@${user.username}` : '@anonymous user'}
                    </span>
                    <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                <div className='pb-2 text-gray-300'>
                    {comment.content}
                </div>
            </div>
        </div>
    )
}
