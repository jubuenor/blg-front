import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/SignIn/SignIn';
import Register from '../components/SignUp/SignUp';
import Navbar from '../components/Navbar/Navbar';
import Privaterouter from '../components/auth/Privaterouter';
import Profile from '../components/Profile/Profile';
import {getSession} from '../helper/helper';
import About from '../components/About/About';

const checkAuth=()=>{
  return getSession()?true:false;
}

function AppRouter() {
  const [isLogged, setLogged]=useState(checkAuth());
  const [update, setUpdate ]=useState(false);
  
  return (
    <BrowserRouter>
      <Navbar isLogged={isLogged} setUpdate={setUpdate} update={update}></Navbar>
        <div className='main'>
        <Routes>
            <Route exact path='/blg-front' element={<Privaterouter></Privaterouter>}>
              {["/blg-front", "/blg-front/home"].map((path, index) => {
                return (
                  <Route path={path} element={
                      <Home update={update}></Home>
                    }
                    key={index}
                  />
                );
              })}
              <Route exact path='/blg-front/profile' element={<Profile></Profile>}></Route>
            </Route>
            <Route exact path="/blg-front/login" element={<Login setLogged={setLogged}></Login>}></Route>  
            <Route exact path='/blg-front/signup' element={<Register></Register>}></Route>     
            <Route exact path='/blg-front/about' element={<About></About>}></Route> 
            <Route exact path='*' element={<div><h1>404 NOT FOUND</h1></div>}></Route>
        </Routes>
        </div>
        
    </BrowserRouter>
        
  )
}

export default AppRouter;