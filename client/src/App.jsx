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


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/projects' element={<Projects/>}/>
    </Routes>
    <FooterComponent/>
</BrowserRouter>
  )
}