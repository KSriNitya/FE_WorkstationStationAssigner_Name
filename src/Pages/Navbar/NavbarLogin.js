import React from 'react'
import logo from './logo.png'
import './Navbar.css'
import { FiLogOut} from "react-icons/fi";
import Swal from 'sweetalert2';
import {useNavigate,Navigate} from "react-router-dom"


export const NavbarLogin = () => {

  let navigate=useNavigate()

  const lg=()=>
{
  Swal.fire({
    title: 'Are you sure?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: 'grey',
    confirmButtonText: 'Yes, Logout'
  }).then((result) => {
    if (result.isConfirmed) {
      
      
      console.clear();

  window.localStorage.clear(); //clear all localstorage
    localStorage.clear();
    localStorage.setItem('login',false)

    sessionStorage.clear();
    sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('lastName');
        sessionStorage.removeItem('id');

  let path='/login'
  return(navigate(path))


    }
  })

  
  
}

  return (
    <>
    <div className='navbar-main'>
    <div className='nav-logo'>
        <img src={logo} height='auto'></img>
        
    </div>

    <div className='nav-name'>
        <h1>Workstation Assigner
        </h1>
    </div>
   
    <div className='nav-menu'>
        {/* <button onClick={lg}><FiLogOut/></button> */}
        
    </div>
    </div>
    </>
  )
}
