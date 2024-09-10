import { Label, TextInput, Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='flex p-5 mt-10'>
      <div className='flex flex-col md:flex-row max-w-6xl mx-auto items-center'>
        <div className='flex-1'>
          <Link to={'/'} className='font-bold text-4xl dark:text-white flex justify-center md:justify-start'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        rounded-lg text-white'>Rehan</span>
            Blog
          </Link>
          <p className='mt-4 text-sm'>
            Sign up easily with your email or Google account.
            Enjoy a seamless experience and start exploring our services today!
          </p>
        </div>

        <div className='flex-1 w-full mt-5'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label className='mb-2'>Your username</Label>
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
              />
            </div>
            <div>
              <Label className='mb-2'>Your email</Label>
              <TextInput
                type='text'
                placeholder='rehan@gmail.com'
                id='email'
              />
            </div>
            <div>
              <Label className='mb-2'>Your password</Label>
              <TextInput
                type='text'
                placeholder='Password'
                id='password'
              />
              <Button gradientDuoTone='purpleToPink' className='mt-5 font-semibold w-full text-center' type='submit'>
                Sign Up
              </Button>
            </div>
          </form>
          <div className='flex gap-2 text-sm mt-3'>
            <p>
              Already have an account?
            </p>
            <Link to={'/signin'} className='text-blue-700'>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
