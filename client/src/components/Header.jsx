import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector , useDispatch } from 'react-redux'
import { themeReducer } from '../redux/Theme/themeSlice'
import { signOutSucces } from '../redux/User/userSlice.js'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const location = useLocation().pathname
    const location1 = useLocation()
    const dispatch = useDispatch()
    const { theme } = useSelector(state => state.theme)
    const { currentUser } = useSelector(state => state.user)
    const [ search , setSearch ] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        const url = new URLSearchParams(location1.search)
        const getUrl = url.get('searchTerm')
        if(getUrl){
            setSearch(getUrl)
        }
    } , [location1.search])

    
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

const handleUrl = (e) => {
    e.preventDefault()
    const url = new URLSearchParams(location1.search)
    url.set('searchTerm',search)
    const queryString = url.toString()
    navigate(`/search?${queryString}`)
}

    return (
        <Navbar className='border-b-2'>
            <Link to={'/'} className='self-center whitespace-nowrap font-semibold text-sm sm:text-xl dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        rounded-lg text-white'>Rehan</span>
                Blog
            </Link>
            <form onSubmit={handleUrl}>
                <TextInput
                    type='text'
                    placeholder='Search'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    value={search}
                    onChange={event=> setSearch(event.target.value)}
                />
            </form>
            <Button className='lg:hidden w-12 h-10 flex justify-center items-center' pill color='gray'>
                <AiOutlineSearch />
            </Button>
            <div className='flex items-center gap-2 md:order-2'>
                <Button className='w-12 h-10 flex justify-center items-center outline-none focus:outline-none' color='gray' pill
                    onClick={() => dispatch(themeReducer())}>
                    {
                        theme === 'light' ? (
                            <FaSun/>
                        ) : (
                            <FaMoon/>
                        )
                    }
                </Button>
                {
                    currentUser ? (
                        <Dropdown
                            //Dropdown width
                            className='md:w-60 w-44'
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar
                                    img={currentUser.photoUrl}
                                    rounded
                                />
                            }
                        >
                            <Dropdown.Header className=''>
                                <span className='block text-sm'>@{currentUser.username}</span>
                                <span className='block font-semibold text-sm truncate'>{currentUser.email}</span>
                            </Dropdown.Header>
                            <Link to={'/dashboard?tab=profile'}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
                        </Dropdown>

                    ) : (
                        <Link to={'/signin'} >
                            <Button gradientDuoTone='purpleToBlue' outline className='self-center'>Sign In</Button>
                        </Link>
                    )
                }

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link to={'/'}>
                    <Navbar.Link active={location === '/'} as={'div'}>
                        Home
                    </Navbar.Link>
                </Link>
                <Link to={'/about'}>
                    <Navbar.Link active={location === '/about'} as={'div'}>
                        About
                    </Navbar.Link>
                </Link>
                <Link to={'/projects'}>
                    <Navbar.Link active={location === '/projects'} as={'div'}>
                        Projects
                    </Navbar.Link>
                </Link>
            </Navbar.Collapse>
        </Navbar >
    )
}
