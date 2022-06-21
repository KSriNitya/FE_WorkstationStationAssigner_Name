import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './Daterange.css'
import { Context } from "../../Pages/Buildingspage/building.js";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import logo from '../../logo (1).png'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer,toast } from 'react-toastify'

const Daterange = () => {
  

  const [loading, setLoading] = useState();
  const [startDate, setStartDate] = useState(new Date(localStorage.getItem('start_date')));
  const [endDate, setEndDate] = useState(new Date(localStorage.getItem('end_date')));
  
  if(loading){
    return (
    <div className='loading_pos'>
      <ClipLoader size={'100px'} className='clip_pos'/>
      <img src={logo} height='auto' />
    </div>)
  
  }
  else{

  return (<Context.Consumer>{setBuildings=>{
 
  return (
    <>

    <div 
    className={localStorage.getItem('meeting_status')==='false'?"drcontainer":"drcontainer2"}>
      <div className="space">
      <p1 className='message1'>From </p1>
      
      </div>
      
      <div>
      <DatePicker className="from_date1"
      
        selected={startDate}
        maxDate={new Date().getTime() + 60*24 * 60 * 60 * 1000}
        disabled={localStorage.getItem('editteam')==='true'}
        onChange={(date) => {
          if(date>endDate)
          {
            setEndDate(date)
            localStorage.setItem('end_date',(date).toISOString().split('T')[0])

          }
      
          

          console.log(date)
          console.log(endDate)
     
        
          setStartDate(date)
          localStorage.setItem('start_date',(date).toISOString().split('T')[0])
    
          console.log((date).toISOString().split('T')[0])
          // const d1=localStorage.getItem('start_date')
          // const d2=localStorage.getItem('end_date')
          // const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
          // const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
          axios.get('http://72a6-106-51-81-179.ngrok.io/details',{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,},
            params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),start_time:localStorage.getItem('start_time')
            ,end_time:localStorage.getItem('end_time'),report:'false'}
        })
      .then(res=>{
     console.log("new avail")
     console.log(res.data)
     setBuildings(res.data)
     
   })
   .then(
    window.location.reload()
   )




        
         
        
        }}
        
        selectsStart
        startDate={startDate}
        endDate={endDate}
        // minDate={new Date()}
        minDate={new Date(localStorage.getItem('date_tomorrow'))}
        dateFormat='dd/MM/yyyy'
        popperPlacement="auto" 
      />
      </div>
      <div className="space">
      <p1 className='message2'>To </p1>
      </div>
      <div>
      <DatePicker className="to_date"
        selected={endDate}
        disabled={localStorage.getItem('editteam')==='true'}
        onChange={(date) => {
          console.log("Hi")
          setEndDate(date)
          localStorage.setItem('end_date',(date).toISOString().split('T')[0])
        

            console.log((date).toISOString().split('T')[0])
            // const d1=localStorage.getItem('start_date')
            // const d2=localStorage.getItem('end_date')
            // const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
            // const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
            axios.get('http://72a6-106-51-81-179.ngrok.io/details',{
              headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,},
              params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),start_time:localStorage.getItem('start_time')
              ,end_time:localStorage.getItem('end_time'),report:'false'}
          })
        .then(res=>{
       console.log("new avail")
       console.log(res.data)
       setBuildings(res.data)
       
     })
     .then(
      window.location.reload()
     )
   
   }     
        }
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={new Date().getTime() + 60*24 * 60 * 60 * 1000}
        dateFormat='dd/MM/yyyy'
        popperPlacement="left"
      />
      </div>
      </div>
    </>
  );
        }}
        
        </Context.Consumer>

  )
      }
  
  }


export default Daterange


