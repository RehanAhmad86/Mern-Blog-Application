import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import RecentPostsPage from '../components/RecentPostsPage'
export default function Home() {
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])
  const fetchPosts = async () => {
    try {
      const result = await fetch(`http://localhost:5000/post/getposts`, {
      })
      const data = await result.json()
      if (result.ok) {
        setAllPosts(data.posts)
      }
    } catch (error) { console.log(error) }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-3 p-20 max-w-6xl mx-auto'>
        <h1
          className='text-3xl md:text-4xl lg:text-5xl font-bold whitespace-nowrap'>
          Welcome to Rehan Blog
        </h1>
        <p className='text-gray-500 dark:text-gray-300'>A seamless platform for blogging,
          designed with simplicity and engagement
          in mind.</p>
        <Link to={'/search'}
          className='text-blue-500 text-sm hover:text-blue-400'>
          view all posts
        </Link>
      </div>
      <div className='p-7 md:px-16'>
        <div
        className='rounded-tl-3xl rounded-br-3xl p-5 md:p-16 bg-amber-100 dark:bg-teal-800'>
          <CallToAction />
        </div>
      </div>


      {
        allPosts && allPosts.length > 0 &&
        <div className='max-w-6xl mx-auto flex flex-col justify-center items-center py-8'>
          <h1 className='text-3xl font-semibold p-5'>Recent Posts</h1>
          <div className='flex flex-wrap flex-row gap-5 justify-evenly items-center'>
            {
              allPosts.map((post) =>
                <div key={post._id}>
                  <RecentPostsPage recent={post} />
                </div>
              )
            }
          </div>
          <Link to={'/search'} className='text-blue-500 text-sm mt-5 hover:underline'>view more</Link>
        </div>
      }


    </div>
  )
}
