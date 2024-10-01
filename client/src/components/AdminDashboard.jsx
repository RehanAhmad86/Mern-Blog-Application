import React, { useEffect, useState } from 'react'
import { HiArrowNarrowUp, HiOutlineUserGroup } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { FaCheck, FaTimes , FaRegNewspaper, FaComment } from 'react-icons/fa';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPosts, setTotalPosts] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [lastMonthUsers, setLastMonthUsers] = useState([])
    const [lastMonthPosts, setlastMonthPosts] = useState([])
    const [lastMonthComments, setlastMonthComments] = useState([])
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])
    const [posts, setPosts] = useState([])
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        const getUsers = async () => {
            try {
                const result = await fetch(`http://localhost:5000/user/getUser?limit=5`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
                const data = await result.json()
                if (result.ok) {
                    setUsers(data.users)
                    setLastMonthUsers(data.lastMonth)
                    setTotalUsers(data.totalUsers)
                }
            } catch (error) { console.log(error) }
        }
        const getPosts = async () => {
            try {
                const result = await fetch(`http://localhost:5000/post/getposts?limit=5`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
                const data = await result.json()
                if (result.ok) {
                    setPosts(data.posts)
                    setlastMonthPosts(data.postsLastMonth)
                    setTotalPosts(data.totalPost)
                }
            } catch (error) { console.log(error) }
        }
        const getComments = async () => {
            try {
                const result = await fetch(`http://localhost:5000/comment/getAllComments?limit=5`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
                const data = await result.json()
                if (result.ok) {
                    setComments(data.comments)
                    setTotalComments(data.totalComments)
                    setlastMonthComments(data.lastMonthComments)
                }
            } catch (error) { console.log(error) }
        }

        if (currentUser.isAdmin) {
            getUsers()
            getComments()
            getPosts()
        }
    }, [currentUser])

    return (
        <div className='m-2 mx-auto flex flex-col gap-5 justify-between p-5'>
            <div className='flex flex-wrap  justify-center gap-4'>
                <div className='felx flex-col p-5 dark:bg-slate-300 w-full md:w-80 rounded-lg shadow-lg'>
                    <div className='flex gap-3 items-center justify-between'>
                        <div className='flex flex-col'>
                            <div className='flex flex-col items-start gap-2 text-gray-500 p-2'>
                                <h1 className=' uppercase whitespace-nowrap'>Total Users</h1>
                                <span className='text-4xl'>{totalUsers}</span>
                            </div>

                            <div className='flex items-center gap-4 text-lg whitespace-nowrap'>
                                <div className='text-2xl flex items-center justify-center text-green-500'>
                                    <HiArrowNarrowUp />
                                    <span className=''>{lastMonthUsers}</span>
                                </div>
                                <span className='text-gray-500 text-sm'>Last Month Users</span>
                            </div>
                        </div>
                        <div className='text-4xl rounded-full p-3 bg-blue-500'>
                            <HiOutlineUserGroup className='text-white' />
                        </div>
                    </div>
                </div>

                <div className='felx flex-col p-5 dark:bg-slate-300 w-full md:w-80 rounded-lg shadow-lg'>
                    <div className='flex gap-3 items-center justify-between'>
                        <div className='flex flex-col'>
                            <div className='flex flex-col items-start gap-2 text-gray-500 p-2'>
                                <h1 className=' uppercase whitespace-nowrap'>Total Posts</h1>
                                <span className='text-4xl'>{totalPosts}</span>
                            </div>

                            <div className='flex items-center gap-4 text-lg whitespace-nowrap'>
                                <div className='text-2xl flex items-center justify-center text-green-500'>
                                    <HiArrowNarrowUp />
                                    <span className=''>{lastMonthPosts}</span>
                                </div>
                                <span className='text-gray-500 text-sm'>Last Month Posts</span>
                            </div>
                        </div>

                        <div className='text-4xl rounded-full p-3 bg-lime-500'>
                            <FaRegNewspaper className='text-white' />
                        </div>
                    </div>
                </div>


                <div className='felx flex-col p-5 dark:bg-slate-300 w-full md:w-80 rounded-lg shadow-lg'>
                    <div className='flex gap-3 items-center justify-between'>
                        <div className='flex flex-col'>
                            <div className='flex flex-col items-start gap-2 text-gray-500 p-2'>
                                <h1 className=' uppercase whitespace-nowrap'>Total Comments</h1>
                                <span className='text-4xl'>{totalComments}</span>
                            </div>

                            <div className='flex items-center gap-4 text-lg whitespace-nowrap'>
                                <div className='text-2xl flex items-center justify-center text-green-500'>
                                    <HiArrowNarrowUp />
                                    <span className=''>{lastMonthComments}</span>
                                </div>
                                <span className='text-gray-500 text-sm'>Last Month Comments</span>
                            </div>
                        </div>

                        <div className='text-4xl rounded-full p-3 bg-teal-600'>
                            <FaComment className='text-white' />
                        </div>
                    </div>
                </div>
            </div>


            <div className='mx-auto w-full flex flex-col justify-center py-3'>
                <div className='flex flex-row flex-wrap justify-evenly gap-5'>
                    <div className='md:w-96 w-full shadow-md p-3 dark:bg-gray-800 rounded-lg'>
                        <div>
                            <div className='flex items-center justify-between mb-5'>
                                <h1 className='font-semibold dark:text-gray-300'>All users</h1>
                                <Link to={'/dashboard?tab=users'}>
                                    <Button className='' outline gradientDuoTone='purpleToBlue'>See more</Button>
                                </Link>
                            </div>
                            
                            <Table className='md:w-80 w-full ml-4' hoverable>
                                <Table.Head>
                                    <Table.HeadCell>User image</Table.HeadCell>
                                    <Table.HeadCell>Username</Table.HeadCell>
                                    <Table.HeadCell>Admin</Table.HeadCell>
                                </Table.Head>
                                {
                                    users && users.map((user) =>
                                        <Table.Body key={user._id} className='divide-y'>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <img src={user.photoUrl} className='h-8 w-8 rounded-full' />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {user.username}
                                                </Table.Cell>
                                                <Table.Cell className='flex justify-center'>
                                                    {user.isAdmin ? 
                                                    <FaCheck className='text-green-500'/> 
                                                    : <FaTimes className='text-red-500'/>}
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    )
                                }
                            </Table>
                        </div>
                    </div>

                    <div>
                    <div className='md:w-96 w-full shadow-md p-3 dark:bg-gray-800 rounded-lg'>
                            <div className='flex items-center justify-between mb-5'>
                                <h1 className='font-semibold dark:text-gray-300'>All posts</h1>
                                <Link to={'/dashboard?tab=posts'}>
                                    <Button className='' outline gradientDuoTone='purpleToPink'>See more</Button>
                                </Link>
                            </div>
                            <Table className='md:w-80 w-full' hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Post image</Table.HeadCell>
                                    <Table.HeadCell>Post title</Table.HeadCell>
                                    <Table.HeadCell>Post category</Table.HeadCell>
                                </Table.Head>
                                {
                                    posts && posts.map((post) =>
                                        <Table.Body key={post._id} className='divide-y'>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <img src={post.imageUrl} className='h-8 w-14 rounded-sm' />
                                                </Table.Cell>
                                                <Table.Cell className=''>
                                                    {post.title}
                                                </Table.Cell>
                                                <Table.Cell className=''>
                                                    {post.category}
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    )
                                }
                            </Table>
                        </div>
                    </div>

                    <div>
                    <div className='w-full shadow-md p-3 dark:bg-gray-800 rounded-lg'>
                            <div className='flex items-center justify-between mb-5'>
                                <h1 className='font-semibold dark:text-gray-300'>All comments</h1>
                                <Link to={'/dashboard?tab=comments'}>
                                    <Button className='' outline gradientDuoTone='redToYellow'>See more</Button>
                                </Link>
                            </div>
                            <Table className='' hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Comment</Table.HeadCell>
                                    <Table.HeadCell>Likes</Table.HeadCell>
                                </Table.Head>
                                {
                                    comments && comments.map((comment) =>
                                        <Table.Body key={comment._id} className='divide-y'>
                                            <Table.Row>
                                                <Table.Cell className="line-clamp-2">
                                                    {comment.content}
                                                </Table.Cell>
                                                <Table.Cell className=''>
                                                    {comment.numberOfLikes}
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    )
                                }
                            </Table>
                        </div>
                    </div>


                </div>

            </div>

            {/* <div>
                <Button gradientDuoTone='greenToBlue'>show more</Button>
                <Button gradientDuoTone='pinkToOrange'>show more</Button>
                <Button gradientDuoTone='tealToLime'>show more</Button>
            </div> */}

        </div>
    )
}
