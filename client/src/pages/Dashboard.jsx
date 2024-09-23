import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProfileSidebar from '../components/ProfileSidebar'
import ProfileBar from '../components/ProfileBar'
import PostDashBoard from '../components/PostDashBoard'
import UserDashBoard from '../components/UserDashBoard'

export default function Dashboard() {
  const location = useLocation()
  const [ tab , setTab ] = useState('')
  useEffect(()=> {
    const urlParams = new URLSearchParams(location.search)
    const getSearchParams = urlParams.get('tab')
    //console.log(getSearchParams)
      if(getSearchParams){
        setTab(getSearchParams)
      }
  } , [location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div>
        <ProfileSidebar/>
      </div>
      <div className='w-full'>
        { tab === 'profile' && <ProfileBar/> }
        { tab === 'posts' && <PostDashBoard/> }
        { tab === 'users' && <UserDashBoard/> }
    </div>
    </div>
  )
}
