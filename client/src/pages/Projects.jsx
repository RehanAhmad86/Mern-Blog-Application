import React from 'react'
import CallToAction from '../components/CallToAction.jsx'

export default function Projects() {
  return (
    <div className='min-h-screen max-w-6xl mx-auto p-16'>
      <div className='flex flex-col justify-center items-center gap-7'>
        <h1 className='text-3xl font-semibold text-gray-500 dark:text-gray-300 text-center'>Projects</h1>
        <p className='text-center font-medium text-gray-500 dark:text-gray-300 px-2 md:px-16'>
        Build fun projects using React, Node, Express, and MongoDB, creating dynamic, 
        full-stack web apps with interactive features and real-time functionality!
        </p>
        <div className='bg-amber-200 dark:bg-teal-500 rounded-tl-3xl rounded-br-3xl'>
        <CallToAction/>
        </div>
      </div>
    </div>
  )
}
