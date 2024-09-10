import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({})
  const [ loading , setLoading ] = useState(false)
  const [ error , setError ] =  useState(null)
  const navigate = useNavigate()
  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    })
  }

  const sendData = async (e) => {
    e.preventDefault()
    if( !formData.username || !formData.email || !formData.password){
      setError('Please fill all the fields!')
    }
    setError(null)
    try{
    setLoading(true)
    const result = await fetch('/api/auth/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }
  ) 
    const data = await result.json()
   if(data.success === false){
    setError(data.message)
    setLoading(false)
   }
    setLoading(false)
    if(result.ok){
      navigate('/signin')
    }
   }
    catch(error){
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className='flex p-5 mt-10'>
      <div className='flex flex-col md:flex-row max-w-6xl mx-auto items-center'>
        <div className='flex-1'>
          <Link to={'/'} className='font-bold text-4xl items-center dark:text-white flex justify-center md:justify-start'>
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
          <form className='flex flex-col gap-4' onSubmit={sendData}>
            <div>
              <Label className='mb-2'>Your username</Label>
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleFormData}
              />
            </div>
            <div>
              <Label className='mb-2'>Your email</Label>
              <TextInput
                type='text'
                placeholder='rehan@gmail.com'
                id='email'
                onChange={handleFormData}
              />
            </div>
            <div>
              <Label className='mb-2'>Your password</Label>
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleFormData}
              />
              <Button disabled={loading} gradientDuoTone='purpleToPink' className='mt-5 font-semibold w-full text-center disabled:opacity-50' type='submit'>
                { loading ? (
                  <Spinner size='sm'/>
                ) 
                : 'Sign Up' }
              </Button>
            </div>
          </form>
          <div className='flex gap-2 text-sm mt-3'>
            <p>
              Already have an account?
            </p>
            <Link to={'/signin'} className='text-blue-700'>Sign in</Link>
          </div>
          { error &&
          <Alert color="failure" className='mt-2 h-auto'>{error}</Alert>
          }
        </div>
      </div>
    </div>
  )
}
