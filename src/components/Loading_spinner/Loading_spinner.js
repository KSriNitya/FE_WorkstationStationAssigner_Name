import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
// import { Navbar } from '../Navbar/Navbar';
import logo from '../../logo (1).png'
import { ToastContainer } from 'react-toastify'

function Loading_spinner() {
    return (
        <>
        <ToastContainer/>
      <div className='loading_pos'>
        <ClipLoader size={'100px'} className='clip_pos'/>
        <img src={logo} height='auto' />
      </div></>)
}

export default Loading_spinner