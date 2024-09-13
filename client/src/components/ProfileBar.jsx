import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function ProfileBar() {
  const { currentUser } = useSelector( state => state.user)
  return (
    <div className='max-w-lg w-full mx-auto p-3 mt-3'>
     <h1 className='text-center text-3xl font-semibold p-3'
     >Profile</h1>
     <form className='flex flex-col gap-5'>
      <div className='h-32 w-32 self-center border-8 border-indigo-300 shadow-md cursor-pointer rounded-full overflow-hidden'>
      <img src={currentUser.photoUrl} 
      className='h-full w-full rounded-full object-cover' 
      />
      </div>
      <TextInput type='text' id='username'
      placeholder='username'
      defaultValue={currentUser.username}
      />
      <TextInput type='text' id='email'
      placeholder='email'
      defaultValue={currentUser.email}
      />
      <TextInput id='password'
      placeholder='password'
      />
      <Button type='submit' gradientDuoTone='purpleToBlue' >Update</Button>
     </form>
     <div className='text-red-500 text-sm flex justify-between mt-3 px-2'>
      <span>Delete Account</span>
      <span>Sign Out</span>
     </div>
    </div>
  )
}

