import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {  Sidebar } from 'flowbite-react'
import {HiUser } from 'react-icons/hi'
import { HiArrowCircleRight } from 'react-icons/hi'

export default function ProfileSidebar() {
  const location = useLocation()
  const [ tab , setTab ] = useState('')
  useEffect(()=> {
    const urlParams = new URLSearchParams(location.search)
    const getSearchParams = urlParams.get('tab')
    console.log(getSearchParams)
      if(getSearchParams){
        setTab(getSearchParams)
      }
  } , [location.search])
  return (
   <Sidebar className='w-full md:w-56'>
      <Sidebar.ItemGroup>
        <Link to={'/dashboard?tab=profile'}>
        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label="User" labelColor='dark' >
          Profile
        </Sidebar.Item>
        </Link>
        <Sidebar.Item icon={HiArrowCircleRight} >
          Sign Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
   </Sidebar>
  )
}
