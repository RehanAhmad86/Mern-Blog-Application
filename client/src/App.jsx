import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Header from './components/Header.jsx'
import FooterComponent from './components/Footer.jsx'
import PrivateComponent from './components/PrivateComponent.jsx'
import CreatePost from './components/CreatePost.jsx'
import Admin from './components/Admin.jsx'
import UpdatePost from './pages/updatePost.jsx'
import Posts from './pages/posts.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route element={<PrivateComponent/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/post/:slug' element={<Posts/>}/>
        <Route element={<Admin/>}>
          <Route path='/create-post' element={<CreatePost/>}/>
          <Route path='/update-post/:postId' element={<UpdatePost/>}/>
        </Route>
    </Routes>
    <FooterComponent/>
</BrowserRouter>
  )
}