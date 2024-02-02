import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Router, RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Template from './components/Template/Template.jsx'
import Contact from './components/Contact/Contact.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Userprovider from './context/Userprovider.jsx'
import Mydonate from './components/Mydonate/Mydonate.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="" element={<Login/>}/>
    <Route path="home" element={<Home/>}/>
    <Route path="about" element={<About/>}/>
    <Route path="contact" element={<Contact/>}/>
    <Route path="signup" element={<Signup/>}/>
    <Route path="items/:food" element={<Template/>}/>
    <Route path="items/mydonate" element={<Mydonate/>}/>
  </Route>
))


ReactDOM.createRoot(document.getElementById('root')).render(
  //  <Router> 
  // <Userprovider>

    <RouterProvider router={router}/>
    // </Userprovider>
    // </Router>
   
)
