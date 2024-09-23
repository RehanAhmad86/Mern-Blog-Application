import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Table, Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function UserDashBoard() {
    const [User, setUser] = useState([])
    const { currentUser } = useSelector(state => state.user)
    const [showMore, setShowMore] = useState(true)
    const [modal, setModal] = useState(null)
    useEffect(() => {
        const showUser = async () => {
            try {
                const result = await fetch(`http://localhost:5000/user/getUser?userId=${currentUser._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
                const data = await result.json()
                if (!result.ok) {
                    console.log("Error in showing users!")
                    return
                }
                if (result.ok) {
                    setUser(data.users)
                    if (data.users.length < 9) {
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        if (currentUser.isAdmin) {
            showUser()
        }

    }, [currentUser._id])
    console.log(User)

    const handleShowMore = async () => {
        const startIndex = User.length
        try {
            const result = await fetch(`http://localhost:5000/user/getUser?startIndex=${startIndex}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            if (!result.ok) {
                console.log("Error in showing more users!")
                return
            }
            const data = await result.json()
            if (data.users.length === 0) {
                setShowMore(false)
            }
            if (result.ok) {
                setUser(users => [...users, ...data.users])
                if (data.users.length <9) {
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto
    p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
     dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {
                currentUser.isAdmin && User.length > 0 ? (
                    <>
                        <Table>
                            <Table.Head className='text-center font-medium'>
                                <Table.HeadCell className='whitespace-nowrap'>
                                    Date created
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Image
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Username
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Email
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    Admin
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    <span>Delete</span>
                                </Table.HeadCell>
                            </Table.Head>
                            {
                                User.map((user) => (
                                    <Table.Body className='divide-y text-center font-medium' 
                                    key={user._id} >
                                        <Table.Row className='dark:border-gray-700 dark:bg-gray-800'>
                                            <Table.Cell>
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </Table.Cell>
                                            <Table.Cell
                                            className='flex items-center justify-center'>
                                                <img
                                                    src={user.photoUrl}
                                                    className='w-10 h-10 rounded-full object-cover'
                                                    alt={user.title}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>{user.username}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                                <Table.Cell
                                                className='text-center flex justify-center relative bottom-3'
                                                >
                                                    {user.isAdmin ? 
                                                <FaCheck className='text-green-500'/> 
                                            :   <FaTimes className='text-red-500'/>
                                                }
                                                </Table.Cell>
                                            <Table.Cell>
                                                <span
                                                    onClick={() => {
                                                        setModal(true)
                                                        setDeleteUsers(user._id)
                                                    }}
                                                    className='text-red-500 cursor-pointer'>Delete</span>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))
                            }
                        </Table>
                    </>
                ) : (
                    <p className='text-center text-lg flex items-center justify-center'>You do not have any Users yet!</p>
                )
            }
            {
                showMore && User.length > 0 &&
                <div className='text-center py-3'>
                    <button onClick={handleShowMore} className='text-teal-500 text-sm'>Show More</button>
                </div>
            }
            {
                modal && (
                    <Modal show={modal} onClose={() => { setModal(false) }} popup size='sm' className='p-5'>
                        <Modal.Header />
                        <Modal.Body>
                            <div className='text-center'>
                                <HiOutlineExclamationCircle
                                    className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-5 mx-auto border-none 
                outline-none focus:outline-none'
                                />
                                <h3 className='text-lg mb-5 text-gray-500 dark:text-gray-400'>Do you want to Delete your user?</h3>
                            </div>
                            <div className='flex justify-center gap-5'>
                                <Button
                                    gradientDuoTone='purpleToPink' outline
                                    onClick={() => {
                                        setModal(false)
                                        
                                    }}
                                    color='failure'>Yes, Delete</Button>
                                <Button gradientDuoTone='purpleToBlue' outline onClick={() => { setModal(false) }}>No, Cancel</Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                )
            }
        </div>
    )
}
