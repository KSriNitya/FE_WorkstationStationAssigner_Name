import React,{useState} from 'react'
import axios from 'axios'
//import { useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import ClipLoader from "react-spinners/ClipLoader";
import logo from '../../logo (1).png'


import sheet from '../../components/sheet1.png'
import '../DatabaseUpload/databaseupdate.css'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

import { saveAs } from "file-saver";
import Hpcntr from '../Buildingspage/BreadcrumbsContainerB'
import CustomSeparator from './DBbreadcrumbs'
import errorimage from '../../components/errorimage.png'


function Databaseupdate() {
 // const navigate=useNavigate()
  const downloadData = () => saveAs("https://drive.google.com/uc?export=download&id=1vcF7-6BV_MLcKxePML3edOCjsNUhVN7U");


    const [files,setFiles]=useState()
    const [loading,setLoading]=useState()
    const [error,setError]=useState(false)

    const onChangeFile=(_e)=>{
        setFiles(e.target.files)

  

    }
    const onUploadFile=(_e)=>{
 
      if(files===undefined)
      {
       toast.warning('Please choose a file first!',{position:"top-center",hideProgressBar: true,})
 
 
 
      }
      else{     setLoading(true)
      let p=false;
console.log(files[0])
const formData = new FormData();
formData.append('file',files[0])
        axios.post('http://72a6-106-51-81-179.ngrok.io/upload',formData,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            withCredentials: true,
              },
             
        })
        .catch(err=>{p=true
          if(err.response===undefined)
          {
          
            setError(true)
            setLoading(false)


          }
          else{
            setLoading(false)
            console.log(err.response)

            toast.error(err.response.data.errorMsg,{position:"top-center",hideProgressBar: true,})


          }
          console.log(err.response)
          

          setTimeout(function(){
            window.location.reload()
              
               }, 1400);


        })
        .then(res=>{
        if(p===false)
        {
          setLoading(false)
          toast.success("File uploaded successfully",{position:"top-center",hideProgressBar: true,})
          setTimeout(function(){
            window.location.reload()  

              
               }, 1400);
        }
       
      }
)}
    }

    if(loading){
      return (
      <div className='loading_pos'>
  
        <ClipLoader size={'100px'} className='clip_pos'/>
        <img src={logo} height='auto' />
      </div>)
    
    }
    else{

      if(error===true)
      {


      return (
        <>
        <Navbar/>
        <img className='error_image' src={errorimage}/>

        <h1 className='error_message'>Oops network failed.Please try reloading the page!</h1>
        </>


      )
      }
else{  return (
    <><Navbar/>
    <Hpcntr>
              <CustomSeparator/>
            </Hpcntr>
     
    <div className='main_box'>
    <div className='excel_image'>   <img src={sheet}  alt="spreadsheet"/></div>
     
     </div>
     <div>     <small style={{marginLeft:'17%',marginTop:'4%',fontFamily:'Gothic A1'
}} >- Please download the format , add the data and upload the file - </small>
</div>

     <button  onClick={downloadData} className='download_format'>
     
       Download Format
     </button>

  
        <div className='upload_box'>
     
          <h4 style={{ color: '#0892d0', fontFamily:'Roboto ,sans-serif'}}>Upload Your File {" : "} </h4>
          
      <input className='file_select' type='file' name='file' onChange={_e=>onChangeFile(_e)}></input>

      <button className='upload_button' style={{backgroundColor:(files===undefined)?"grey":"#22adf3"}}  onClick={onUploadFile}>Upload</button>
      </div>
      
    
      
        
    <ToastContainer/>
    </>
  )}
}
}

export default Databaseupdate