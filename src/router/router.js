import React, {useState} from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
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
    <HashRouter >
      <Navbar isLogged={isLogged} setUpdate={setUpdate} update={update}></Navbar>
        <div className='main'>
        <Routes>
            <Route exact path='/' element={<Privaterouter></Privaterouter>}>
              {["/", "/home"].map((path, index) => {
                return (
                  <Route path={path} element={
                      <Home update={update}></Home>
                    }
                    key={index}
                  />
                );
              })}
              <Route exact path='/profile' element={<Profile></Profile>}></Route>
            </Route>
            <Route exact path="/login" element={<Login setLogged={setLogged}></Login>}></Route>  
            <Route exact path='/signup' element={<Register></Register>}></Route>     
            <Route exact path='/about' element={<About></About>}></Route> 
            <Route exact path='*' element={<div><h1>404 NOT FOUND</h1></div>}></Route>
        </Routes>
        </div>
    </HashRouter>
        
  )
}

export default AppRouter;