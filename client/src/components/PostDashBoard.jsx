import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function PostDashBoard() {
  const [posts, setPosts] = useState([])
  const { currentUser } = useSelector(state => state.user)
  useEffect(() => {
    const showPosts = async () => {
      try {
        const result = await fetch(`http://localhost:5000/post/getposts?${currentUser._id}`, {
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
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto
    p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
     dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && posts.length > 0 ? (
          <>
            <Table>
              <Table.Head>
                <Table.HeadCell>
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
                  <Table.Body key={index} className='divide-y'>
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
                        <span className='text-red-500 cursor-pointer'>Delete</span>
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
          <p>You do not have any posts yet!</p>
        )
      }
    </div>
  )
}
