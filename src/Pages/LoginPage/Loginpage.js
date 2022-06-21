import GoogleLoginComponent from "../../Pages/LoginPage/GoogleComponents";
import LoginContainer from "../../Pages/LoginPage/LoginContainer";
import loginImg from '../../Assets/login.png'
import '../../Pages/LoginPage/Loginpage.css'
import React, { Component } from 'react'
import loginrow from '../../Assets/loginpage.png'
import { NavbarLogin } from "../Navbar/NavbarLogin";
// import Clock from 'react-clock';
import { useEffect, useState } from 'react';

const arr =['Automated Workstation','Fitness App']

function Login () {
  const [value, setValue] = useState(new Date());

  
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  
    return (
      <>

          <NavbarLogin/>

          <h1 className="homepage_text1">BOOK.</h1>
          <h1 className="homepage_text2">WORK.</h1>
 
        <LoginContainer>
          <h1 className="box_header_new">LOGIN</h1>
          <div className="loginImage">
            <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/>
          </div>
        <GoogleLoginComponent />
        </LoginContainer> 

        <div className="loginrow" >
          <img src={loginrow} width="100%"  alt="loginrow"/>
          </div>

      </>
    )
}

export default Login