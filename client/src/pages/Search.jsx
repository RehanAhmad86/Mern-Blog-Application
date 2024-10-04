import { Label, Select, TextInput, Button } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RecentPostsPage from '../components/RecentPostsPage.jsx'

export default function Search() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [posts, setPosts] = useState([])
  const [sidebar, setSideBar] = useState({
    searchTerm: '',
    order: 'asc',
    category: 'uncategorized'
  })
  const navigate = useNavigate()

  useEffect(() => {
    const url = new URLSearchParams(location.search)
    const searchTermUrl = url.get('searchTerm')
    const orderUrl = url.get('order')
    const categoryUrl = url.get('category')
    if (searchTermUrl || orderUrl || categoryUrl) {
      setSideBar({
        ...sidebar,
        searchTerm: searchTermUrl,
        order: orderUrl,
        category: categoryUrl
      })
    }

    const fetchPosts = async () => {
      setLoading(true)
      const searchingTerm = url.toString()
      //console.log(searchingTerm)
      const result = await fetch(`http://localhost:5000/post/getposts?${searchingTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await result.json()
      if (!result.ok) {
        setLoading(false)
        return;
      }
      if (result.ok) {
        setLoading(false)
        setPosts(data.posts)
        if (data.posts.length === 9 ) {
          setShowMore(true)
        }else{
          setShowMore(false)
        }
      }
    }
    fetchPosts()
    // console.log(posts.length)
  }, [location.search])


  const handleSubmit = (e) => {
    e.preventDefault()
    const url = new URLSearchParams(location.search)
    url.set('searchTerm', sidebar.searchTerm)
    url.set('order', sidebar.order)
    url.set('category', sidebar.category)
    const queryString = url.toString()
    navigate(`/search?${queryString}`)
  }

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSideBar({
        ...sidebar,
        searchTerm: e.target.value
      })
      console.log(e.target.value)
    }
    if (e.target.id === 'order') {
      const order = e.target.value || 'asc'
      setSideBar({
        ...sidebar,
        order
      })
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized'
      setSideBar({
        ...sidebar,
        category
      })
    }
  }
  console.log(posts.length)

  const handleShowmore = async () => {
    const numberOfPosts = posts.length
    const startIndex = numberOfPosts
    const url = new URLSearchParams(location.search)
    url.set('startIndex', startIndex)
    const newUrl = url.toString()
    const result = await fetch(`http://localhost:5000/post/getposts?${newUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await result.json()
    if (result.ok) {
      setPosts([...posts, ...data.posts])
      //setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      console.log('Existing posts:', posts);
      console.log('Updated posts:', [...posts, ...data.posts]);
      setLoading(false)
      if (data.posts.length === 9) {
        setShowMore(true)
        setLoading(false)
      }else{
        setShowMore(false)
        setLoading(false)
      }
    }
  }
  // console.log(sidebar)
  // console.log(posts)
  return (
    <div className='flex'>
      <div className='p-5 flex md:border-r-2 md:border-gray-500 md:min-h-screen'>
        <form className='flex  flex-col gap-5' onSubmit={handleSubmit}>
          <div className='flex items-center gap-3'>
            <Label className='font-semibold'>Search Term:</Label>
            <TextInput
              placeholder='Enter post name/content' type='text' id='searchTerm'
              value={sidebar.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className='flex items-center gap-3'>
            <Label className='font-semibold'>Sort:</Label>
            <Select
              onChange={handleChange} value={sidebar.order} id='order'>
              <option value='asc'>Latest</option>
              <option value='desc'>Oldest</option>
            </Select>
          </div>

          <div className='flex items-center gap-3'>
            <Label className='font-semibold'>Category:</Label>
            <Select
              onChange={handleChange} value={sidebar.category} id='category'>
              <option value='uncategorized'>Uncategorized</option>
              <option value='JavaScript'>Javascript</option>
              <option value='ReactJs'>react js</option>
              <option value='NodeJs'>Node js</option>
              <option value='MongoDB'>mongo DB</option>
              <option value='Nextjs'>Next js</option>
            </Select>
          </div>
          <Button type='submit' gradientDuoTone='pinkToOrange' outline >Filter</Button>
        </form>
      </div>
      <div className='w-full flex flex-col'>
        <div className='text-center'>
          <h1 className='text-4xl font-semibold p-3 border-b-2 border-b-gray-500'>Posts</h1>
        </div>
        <div className='text-center'>
          {
            !loading && posts.length === 0 && (
              <p className='text-3xl p-5 font-semibold'>No Posts found!</p>
            )
          }
        </div>
        <div className='text-center'>
          {
            loading && (<p className='text-3xl p-5 font-semibold'>Loading....</p>)
          }
        </div>
        <div className='flex flex-wrap justify-evenly gap-y-7 p-5 gap-x-5 mt-3'>
          {
            !loading && posts.length > 0 && (
              posts.map((post) =>
                <RecentPostsPage key={post._id} recent={post} />
              )
            )
          }
        </div>
        {
          showMore && (
            <button className='text-blue-500 mb-4' onClick={handleShowmore}>Show more</button>
          )
        }
      </div>
    </div>
  )
}