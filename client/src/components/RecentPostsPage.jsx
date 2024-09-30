import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function RecentPostsPage({recent}) {
  return (
    <div className='w-[350px] group'>
      <div className='border-[2px] border-gray-400 p-2 flex-wrap flex flex-col gap-3 rounded-lg  relative overflow-hidden h-[400px]'>
      <Link>
      <img src={recent.imageUrl} 
      className='rounded-lg h-[300px] w-full object-cover group-hover:h-[270px] transition-all duration-300 z-20'/>
      </Link>
      <div className=''>
        <p 
        className='text-center text-lg line-clamp-1 text-gray-300'>
          {recent.title}
        </p>
        <span className='font-semibold flex justify-center'>{recent.category}</span>
        <Link to={`/post/${recent.slug}`} className='w-full absolute bottom-[-220px] group-hover:bottom-0
        left-0 right-0 p-2'>
          <Button
            className='mt-3 w-full'
            gradientDuoTone='purpleToBlue'>
            Read article
          </Button>
        </Link>
      </div>
      </div>
    </div>
  )
}
