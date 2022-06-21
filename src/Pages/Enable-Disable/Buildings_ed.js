import React,{useState,useEffect} from 'react'
import BuildingpageContainer from '../../Pages/Buildingspage/BuildingPageContainer'
import {Link, useNavigate}from 'react-router-dom'
import "../../Pages/Buildingspage/BuildingPage.css";
import logo from '../../logo (1).png'
import Hpcntr from '../../Pages/Buildingspage/BreadcrumbsContainerB'
import CustomSeparator from '../../Pages/Buildingspage/BreadcrumbsBp'
import axios from 'axios';
import "../../App.css"
import "../../Pages/Enable-Disable/Buildings_ed.css"
import BuildingpageContainerEd from './BuildingPageEdConatiner';
import { ToastContainer,toast } from 'react-toastify'
import Rdp from '../Buildingspage/Rdp';
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2';
import { Navbar } from '../Navbar/Navbar';
import bd2 from '../../Assets/building5.png'
import errorimage from '../../components/errorimage.png'





function BuildingPageEd(){

    const [loading, setLoading] = useState(true);
    let navigate=useNavigate()
    const[buildings,setBuildings]=useState([])
    const [error,setError]=useState(false)
    const date=(new Date()).toISOString().split('T')[0]
    // const d1=localStorage.getItem('start_date')
    // const d2=localStorage.getItem('end_date')
    // const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
    // const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
    let letterNumber = /^[a-zA-Z ]*$/;


   
    
    useEffect(()=>{let mounted=true

      
      setTimeout(function(){
        axios.get('http://72a6-106-51-81-179.ngrok.io/details',{
          params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),report:'false'},
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,}
            
        })
        .catch((error) => {
        
          setError(true)
          setLoading(false)
      })
        
    .then(res=>{let mounted=true;
         if(mounted)
        { 
           console.log(res.data)
        let p=res.data;
       
         setBuildings(res.data)
         setLoading(false)
        
           }
    })
  }, 1500); 
    return ()=>(mounted=false);
    },[])
  




    const handleB1click=(item)=>{
      console.log("Hi")
        if(item.building_state !=='disable')
        {  let path='/floor_ed'
        localStorage.setItem("building",item._id);
        localStorage.setItem('building_name',item.name) 
        navigate('/floor_ed')}

        else{
          toast.warning('Sorry, The building is disabled',{position:"top-center",hideProgressBar: true,})
        }

    }
    
    const onD1=async (item)=>{
      console.log("hi")
        if(item.building_state==='enable') 
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
    setLoading(true)
  
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
  console.log("hi")
  setLoading(true)
  var p=false

      axios.put(`http://72a6-106-51-81-179.ngrok.io/DisableBFstate`,{},{params:{num:item._id,reason:text},headers:{
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
                  toast.success("Building Disabled Successfully",{position:"top-center",hideProgressBar: true,})
                  
          
          setTimeout(function(){
              setLoading(true)
              window.location.reload()
                
                  }, 1400);
  
  }
  else
  { 
      toast.error("Disable request failed",{position:"top-center",hideProgressBar: true,})

      setTimeout(function(){
          setLoading(true)
          window.location.reload()
            
              }, 1600);
      
  }
      })
        
  
}



    }
    if(item.building_state==='disable')
    { 
      setLoading(true)
        console.log(item._id)

        console.log('hi')
        console.log(localStorage.getItem('token'))
       
        

        var p=false
      axios.put('http://72a6-106-51-81-179.ngrok.io/EnableBFstate',{},{params:{num1:item._id},headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
            ,
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
                   toast.success("Building Enabled Successfully",{position:"top-center",hideProgressBar: true,})
                   
                  
          
           setTimeout(function(){
             setLoading(true)
              
               window.location.reload()
                 
                  }, 1400);
   
   }
   else
   {console.log("Bye")
      setLoading(true)
       toast.error("Enable request failed",{position:"top-center",hideProgressBar: true,})

       setTimeout(function(){
           setLoading(true)
             
              }, 1600);
      
   }
       })


    
    }
     }
    
     if(loading){
        return (
          <>
          <ToastContainer/>
        <div className='loading_pos'>
          <ClipLoader size={'100px'} className='clip_pos'/>
          <img src={logo} height='auto' />
        </div>
        </>)
      
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
    

else{return(
    <>
        {localStorage.getItem('login')!=='true'?navigate('/login'):
<>
 
          <Navbar/>
          <Hpcntr> <CustomSeparator /> </Hpcntr>

    

    <BuildingpageContainerEd>

    <h1 className='box_header_building'>Building Options</h1>


     <div className='buttons_container_ed'>
         {buildings.map((item,index)=><button className={(item.building_state!=='enable')?'button_building_ed_disable':'button_building_ed'} key={index}  onClick={e=>handleB1click(item)}  >
         <img src={bd2} width="120px" height="85px" className='imgpos'/>
         {item.name}
         </button>
         )}
          </div>
          <div className='disable_cf'>
         {
          buildings.map((item,index)=><button className='disable_button' key={index} onClick={e=>onD1(item)}style={{backgroundColor:(item.building_state==='enable')?"#B31B1B":"green"}}>{(item.building_state==='enable') ?'Disable':'Enable'}</button>
          )
         }
         </div>
       
         
     
     
     </BuildingpageContainerEd>
        
    <ToastContainer/>
       </>} 
    </>
    )}
        }
  }
        export default BuildingPageEd