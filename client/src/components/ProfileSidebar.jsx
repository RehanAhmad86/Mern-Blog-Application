import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {  Sidebar } from 'flowbite-react'
import {HiUser } from 'react-icons/hi'
import { HiArrowCircleRight } from 'react-icons/hi'
import { signOutSucces } from '../redux/User/userSlice.js'
import { useDispatch } from 'react-redux'

export default function ProfileSidebar() {
  const location = useLocation()
  const [ tab , setTab ] = useState('')
  const dispatch = useDispatch()
  useEffect(()=> {
    const urlParams = new URLSearchParams(location.search)
    const getSearchParams = urlParams.get('tab')
    //console.log(getSearchParams)
      if(getSearchParams){
        setTab(getSearchParams)
      }
  } , [location.search])

  const signOut = async () => {
    try{
      const result = await fetch('http://localhost:5000/user/signout' , {
        method: "POST",
      })
      const data = await result.json()
      if(!result.ok){
        console.log(data.message)
      }
      dispatch(signOutSucces(data))
    }catch(error){
      console.log(error.message)
    }
}

  return (
   <Sidebar className='w-full md:w-56'>
      <Sidebar.ItemGroup>
        <Link to={'/dashboard?tab=profile'}>
        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label="User" labelColor='dark' as='div'>
          Profile
        </Sidebar.Item>
        </Link>
        <Sidebar.Item icon={HiArrowCircleRight} onClick={signOut} className='cursor-pointer'>
          Sign Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
   </Sidebar>
  )
}
