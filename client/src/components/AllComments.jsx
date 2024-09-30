import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Table , Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle, HiUserRemove } from 'react-icons/hi';

export default function AllComments() {
  const [comments, setComments] = useState([])
  const { currentUser } = useSelector(state => state.user)
  const [ showMore , setShowMore ] = useState(true)
  const [ modal , setModal] = useState(null)
  const [ deleteComments , setDeleteComments ] = useState(null)

  useEffect(() => {
    const showComments = async () => {
      try {
        const result = await fetch(`http://localhost:5000/comment/getAllComments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
        const data = await result.json()
        if (!result.ok) {
          console.log("Error in showing Comments!")
          return
        }
        if (result.ok) {
          setComments(data)
          if(data.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if (currentUser.isAdmin) {
      showComments()
    }

    console.log(comments)
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = comments.length
    try{
      const result = await fetch(`http://localhost:5000/comment/getAllComments?startIndex=${startIndex}` , {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if(!result.ok){
        console.log("Error in showing more Comments!")
        return
      }
      const data = await result.json()
      if (data.length === 0) {
        setShowMore(false)
      }
      if(result.ok){
        setComments(comments=>[...comments , ...data])
        if(data.length < 9 ){
          setShowMore(false)
        }
      }
    }catch(error){console.log(error.message)
    }

  }

  const deleteComment = async(commentId) => {
    setModal(false)
    try{
      const result = await fetch(`http://localhost:5000/comment/deleteComment/${commentId}` , {
        method: "DELETE" , 
        headers:{
          "Content-Type": "application/json"
        },
         credentials: "include"
      })
      const data = await result.json()
      if(result.ok){
        setComments(comments => comments.filter(comment => comment._id !== deleteComments))
      }
      if(!result.ok){
        console.log(data.message)
        return
      }
    }catch(error){console.log(error.message)}
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto
    p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
     dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && comments.length> 0 ? (
          <>
            <Table>
              <Table.Head className='text-center font-medium'>
                <Table.HeadCell className='whitespace-nowrap'>
                  Created At
                </Table.HeadCell>
                <Table.HeadCell>
                  Content
                </Table.HeadCell>
                <Table.HeadCell>
                  Post Id
                </Table.HeadCell>
                <Table.HeadCell>
                  User Id
                </Table.HeadCell>
                <Table.HeadCell>
                  Delete
                </Table.HeadCell>
              </Table.Head>
              {
                comments.map((comment) => (
                  <Table.Body key={comment._id} className='divide-y'>
                    <Table.Row className='dark:border-gray-700
                    dark:bg-gray-800'>
                      <Table.Cell>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        {comment.content}
                      </Table.Cell>
                      <Table.Cell>
                        {comment.postId}
                      </Table.Cell>
                      <Table.Cell>
                        {comment.userId}
                      </Table.Cell>
                      <Table.Cell>
                        <span 
                        onClick={()=>{setModal(true)
                                      setDeleteComments(comment._id)}} 
                        className='text-red-500 cursor-pointer'>Delete</span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))
              }
            </Table>
          </>
        ) : (
          <p className='text-center text-lg flex items-center justify-center'>You do not have any Comments yet!</p>
        ) 
      }
      {
        showMore && comments.length> 0 &&
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
                <h3 className='text-lg mb-5 text-gray-500 dark:text-gray-400'>Do you want to Delete Your Comment?</h3>
              </div>
              <div className='flex justify-center gap-5'>
                <Button 
                gradientDuoTone='purpleToPink' outline
                onClick={()=>{
                  setModal(false)
                  deleteComment(deleteComments)
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

