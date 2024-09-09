import { Button , Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link , useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'

export default function Header() {
    const location = useLocation().pathname
  return (
    <Navbar className='border-b-2'>
        <Link to={'/'} className='self-center whitespace-nowrap font-semibold text-sm sm:text-xl dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        rounded-lg text-white'>Rehan</span>
        Blog
        </Link>
        <form>
            <TextInput
            type='text'
            placeholder='Search'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            />
        </form>
        <Button className='lg:hidden w-12 h-10' pill color='gray'>
            <AiOutlineSearch/>
        </Button>
        <div className='flex items-center gap-2 md:order-2'>
            <Button className='w-12 h-10 flex justify-center items-center ' color='gray' pill>
            <FaMoon className='text-black'/>
            </Button>
            <Link to={'/signin'} >
            <Button gradientDuoTone='purpleToBlue' className='self-center'>
            Sign In
            </Button>
            </Link>
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
               <Link to={'/'}>
            <Navbar.Link active = {location === '/'} as={'div'}>
               Home
            </Navbar.Link>
               </Link>
            <Link to={'/about'}>
            <Navbar.Link active = {location === '/about'} as={'div'}>
            About
            </Navbar.Link>
            </Link>
            <Link to={'/projects'}>
            <Navbar.Link active = {location === '/projects'} as={'div'}>
            Projects
            </Navbar.Link>
            </Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
