import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {  Sidebar } from 'flowbite-react'
import {HiAnnotation, HiDocumentText, HiOutlineAnnotation, HiOutlineUserGroup, HiUser } from 'react-icons/hi'
import { HiArrowCircleRight } from 'react-icons/hi'
import { signOutSucces } from '../redux/User/userSlice.js'
import { useDispatch , useSelector } from 'react-redux'

export default function ProfileSidebar() {
  const { currentUser } = useSelector(state => state.user)
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
      <Sidebar.ItemGroup className='flex flex-col gap-y-1'>
        <Link to={'/dashboard?tab=profile'}>
        <Sidebar.Item active={tab === 'profile'} icon={HiUser} 
        label= {currentUser.isAdmin ? "Admin" : "User"} 
        labelColor='dark' as='div'>
          Profile
        </Sidebar.Item>
        </Link>
        {
          currentUser.isAdmin && 
        <Link to={'/dashboard?tab=posts'}>
        <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText}  as='div'>
          Posts
        </Sidebar.Item>
        </Link>
        }
        {
          currentUser.isAdmin && 
        <Link to={'/dashboard?tab=users'}>
        <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup}  as='div'>
          Users
        </Sidebar.Item>
        </Link>
        }
        {
          currentUser.isAdmin && 
        <Link to={'/dashboard?tab=comments'}>
        <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation}  as='div'>
          Comments
        </Sidebar.Item>
        </Link>
        }
        <Sidebar.Item icon={HiArrowCircleRight} onClick={signOut} className='cursor-pointer'>
          Sign Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
   </Sidebar>
  )
}
