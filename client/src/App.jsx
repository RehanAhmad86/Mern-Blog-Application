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
import Posts from './pages/Posts.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Search from './pages/Search.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsConditions from './pages/TermsConditions.jsx'
import FAQs from './pages/FAQs.jsx'
import HelpCenter from './pages/HelpCenter.jsx'

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
        <Route path='/search' element={<Search/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/terms-conditions' element={<TermsConditions/>}/>
        <Route path='/faqs' element={<FAQs/>}/>
        <Route path='/help-center' element={<HelpCenter/>}/>
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