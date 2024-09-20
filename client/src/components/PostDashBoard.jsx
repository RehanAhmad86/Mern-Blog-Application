import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Table , Modal } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function PostDashBoard() {
  const [posts, setPosts] = useState([])
  const { currentUser } = useSelector(state => state.user)
  const [ showMore , setShowMore ] = useState(true)
  const [ modal , setModal] = useState(null)
  const [ deletePosts , setDeletePosts ] = useState(null)
  useEffect(() => {
    const showPosts = async () => {
      try {
        const result = await fetch(`http://localhost:5000/post/getposts?userId=${currentUser._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        })
        const data = await result.json()
        if (!result.ok) {
          console.log("Error in showing posts!")
          return
        }
        if (result.ok) {
          setPosts(data.posts)
          if(data.posts.length < 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    if (currentUser.isAdmin) {
      showPosts()
    }

  }, [currentUser._id])
  console.log(posts)

  const handleShowMore = async () => {
    const startIndex = posts.length
    try{
      const result = await fetch(`http://localhost:5000/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}` , {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
      if(!result.ok){
        console.log("Error in showing more posts!")
        return
      }
      const data = await result.json()
      if (data.posts.length === 0) {
        setShowMore(false)
      }
      if(result.ok){
        setPosts(posts=>[...posts , ...data.posts])
        if(data.posts.length < 9 ){
          setShowMore(false)
        }
      }
    }catch(error){console.log(error.message)
    }

  }

  const deletePost = async(postId) => {
    setModal(false)
    try{
      const result = await fetch(`http://localhost:5000/post/delete/${postId}/${currentUser._id}` , {
        method: "DELETE" , 
        headers:{
          "Content-Type": "application/json"
        },
         credentials: "include"
      })
      const data = await result.json()
      if(result.ok){
        setPosts(posts => posts.filter(post => post._id !== deletePosts))
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
        currentUser.isAdmin && posts.length > 0 ? (
          <>
            <Table>
              <Table.Head className='text-center font-medium'>
                <Table.HeadCell className='whitespace-nowrap'>
                  Updated At
                </Table.HeadCell>
                <Table.HeadCell>
                  Image
                </Table.HeadCell>
                <Table.HeadCell>
                  Title
                </Table.HeadCell>
                <Table.HeadCell>
                  Category
                </Table.HeadCell>
                <Table.HeadCell>
                  Delete
                </Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {
                posts.map((post, index) => (
                  <Table.Body key={post._id} className='divide-y'>
                    <Table.Row className='dark:border-gray-700
                    dark:bg-gray-800'>
                      <Table.Cell>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.imageUrl}
                            className='w-20 h-10 object-cover'
                            alt={post.title}
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}
                        className='font-medium text-gray-900 dark:text-white'>
                          {post.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>
                        <span 
                        onClick={()=>{setModal(true)
                                      setDeletePosts(post._id)}} 
                        className='text-red-500 cursor-pointer'>Delete</span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/update-post/${post._id}`}>
                          <span className='text-teal-500'>Edit</span>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))
              }
            </Table>
          </>
        ) : (
          <p className='text-center text-lg flex items-center justify-center'>You do not have any posts yet!</p>
        ) 
      }
      {
        showMore && posts.length > 0 &&
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
                <h3 className='text-lg mb-5 text-gray-500 dark:text-gray-400'>Do you want to Delete Your post?</h3>
              </div>
              <div className='flex justify-center gap-5'>
                <Button 
                gradientDuoTone='purpleToPink' outline
                onClick={()=>{
                  setModal(false)
                  deletePost(deletePosts)
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
