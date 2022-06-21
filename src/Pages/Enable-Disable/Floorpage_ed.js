import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FloorpageContainer from '../../Pages/Floorpage/FloorpageContainer'
import { ButtonLabel, StyledHeader } from "../../components/Header.styled";
import logo from '../../logo (1).png'
import '../../Pages/Floorpage/Floorpage.css'
import {FaLevelUpAlt} from 'react-icons/fa';
import FloorpageContainerHr from '../../Pages/Floorpage/FloorpageContainerHr'
import Bccontainerf from '../../Pages/Floorpage/BreadcrumbscontainerF'
import '../../Pages/Enable-Disable/Floorpage_ed.css'
import FloorpageContainerEd from './FloorPageContainerEd';
import { ToastContainer,toast } from 'react-toastify'
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import CustomSeparatorFed from './breadcrumbFed';
import Swal from 'sweetalert2';
import { Navbar } from '../Navbar/Navbar'
import flooricon from '../../flooricon4.png'
import errorimage from '../../components/errorimage.png'



const available1=2;
const available2=4;
const available3=8;
const b=localStorage.getItem('building')

function Floorpage_ed() {

  const [loading, setLoading] = useState(true);
  const [error,setError]=useState(false)

      
   

console.log(localStorage.getItem('building'))
    let navigate=useNavigate()
    const [floors,setFloors]=useState([])
    var letterNumber = /^[a-zA-Z ]*$/;
    // const d1=localStorage.getItem('start_date')
    //   const d2=localStorage.getItem('end_date')
    //   const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
    //   const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
    useEffect(()=>{let mounted=true
      let date=(new Date()).toISOString().split('T')[0]
      setTimeout(function(){

        axios.get('http://72a6-106-51-81-179.ngrok.io/details',{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
          },  
          params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),report:'false'}

        })
        .catch((error) => {
        
          setError(true)
          setLoading(false)
      })
    .then(res=>{let mounted=true;
         if(mounted)
        { console.log(localStorage.getItem('building'))
           console.log(res.data)
        var p=localStorage.getItem('building');
       
         setFloors(res.data.filter(item=>(item._id==p))[0].floors)
         setLoading(false)
         console.log(res.data.filter(item=>(item._id==p))[0].floors)
        
           }
    })
  }, 1500); 
    return ()=>(mounted=false);
    },[])
    
    const handleF1click=(item)=>{
      if(item.floor_state!=='disable')
       { localStorage.setItem("floor",item.Floor_no); 
       localStorage.setItem('floor_name_disable',item.floor_name)
        navigate('/disable')}
        else{
          toast.warning('Sorry, The floor is disabled',{position:"top-center",hideProgressBar: true,})
        }
    }
    
    const onDisable1=async (item)=>{ 

        if(item.floor_state==='enable') 
        {   
        
          const { value: text } = await Swal.fire({
            title: 'Are you sure to disable?',
            input: 'text',
            inputLabel: 'Reason:',
            inputPlaceholder: 'Enter the reason',
            confirmButtonText:"Confirm",
            confirmButtonColor:'#B31B1B',
            inputAttributes: {
              
              autocapitalize: 'off',
              autocorrect: 'off'
            },
            preConfirm: (login) => {
              console.log("hi")
            
            },
            inputValidator: (value) => {
              if (!value) {
                return 'You need to enter the reason for booking'}
                else if(value.length<6){
                  return 'The reason cannot contain less than 6 characters'
                }
              
                else if(value.length>25)
          {
          return 'The reason cannot contain more than 25 characters'
          }
          else if(value.match(letterNumber))
          {
           
          
          
          }
          else
          {
            return'The reason can only contain alphabetic characters.'
          }
              },
            showCancelButton: true
          })
          if(text)
          {
            var p=false;
            setLoading(true)
            
                axios.put(`http://72a6-106-51-81-179.ngrok.io/DisableBFstate`,{},{params:{num:item.Floor_no,reason:text},headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    withCredentials: true,
                  }})
                  .catch(e=>{
                    if(e.response===undefined)
            {
            
              setError(true)
              setLoading(false)
  
            }
                    else if(e.response.status===400){p=true
         
                  }
           
           
                   })
                   .then(res=>{
                       
                       
                       if(p!==true){
                           console.log("hi")
                           toast.success("Floor Disabled Successfully",{position:"top-center",hideProgressBar: true,})
                          
                  
                   setTimeout(function(){
                       setLoading(true)
                       window.location.reload()
                         
                          }, 1400);
           
           }
           else
           { setLoading(true)
               toast.error("Disable request failed",{position:"top-center",hideProgressBar: true,})
          
               setTimeout(function(){
                   setLoading(true)
                   window.location.reload()
                     
                      }, 1600);
              
           }
               })
                 
            
          }
          



          
              
         
       }
       if(item.floor_state==='disable')
       {
        const p=item.Floor_no
        console.log('hi')
        console.log(localStorage.getItem('token'))
        setLoading(true)
        axios.put(`http://72a6-106-51-81-179.ngrok.io/EnableBFstate`,{},{params:{num1:item.Floor_no},headers:{
         Authorization:`Bearer ${localStorage.getItem('token')}`,
         'Access-Control-Allow-Origin': '*',
         'Content-Type': 'application/json',
         withCredentials: true,
       }
     })
     .catch(e=>{
      if(e.response===undefined)
            {
            
              setError(true)
              setLoading(false)
  
            } 
    else if(e.response.status===400){p=true
         
     }


      })
      .then(res=>{
          
          
          if(p!==true){
              console.log("hi")
              toast.success("Floor Enabled Successfully",{position:"top-center",hideProgressBar: true,})
              
             
     
      setTimeout(function(){
        setLoading(true)
          window.location.reload()
            
             }, 1400);

}
else
{ setLoading(true)
  toast.error("Enable request failed",{position:"top-center",hideProgressBar: true,})

  setTimeout(function(){
      setLoading(true)
      window.location.reload()
        
         }, 1600);
 
}
  })
     let date=(new Date()).toISOString().split('T')[0]


       }
    }
    
    if(loading){
      return (
        <>
        <ToastContainer/>
      <div className='loading_pos'>
        <ClipLoader size={'100px'} className='clip_pos'/>
        <img src={logo} height='auto' />
      
      </div></>)
    
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
  

  else{return (
    <>
    {localStorage.getItem('login')!=='true'?navigate('/login'):
<>


         <Navbar />
         <Bccontainerf>
           <CustomSeparatorFed/>
            
         </Bccontainerf>

            
        <FloorpageContainerEd>
        <h1 className='box_header_building'>{localStorage.getItem('building_name')}{" "}(Floors)</h1>
            <div className='buttons_floor_container_ed'>
            
      
                    {floors.map((item,index)=><button key={index} className='button_floor_ed'style={{backgroundColor:(item.floor_state==='enable')?"white":"grey"}}  onClick={e=>handleF1click(item)}>
                    {(item.floor_state==='enable')&&<img src={flooricon} width="100px" height="100px" className='imgpos'/>}
                    {item.floor_name}
                    </button>)}
            </div>

            <div className='disable_button_container'>
         
                {floors.map((item,index)=><button key={index} className='disable_button_floor' onClick={e=>onDisable1(item)} style={{backgroundColor:(item.floor_state==='enable')?"#B31B1B":"green"}}>{item.floor_state==='enable' ?'Disable':"Enable"}</button>)}
            </div>
            
            </FloorpageContainerEd>
            <ToastContainer/>
            </>}
    </>
  )}
              }
}

export default Floorpage_ed