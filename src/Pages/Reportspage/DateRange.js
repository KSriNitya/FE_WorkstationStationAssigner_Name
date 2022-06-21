import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './DateRange.css'
import { Context } from "../../Pages/Buildingspage/building.js";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer,toast } from 'react-toastify'

const Daterange = () => {
  


  const [startDate, setStartDate] = useState(new Date(localStorage.getItem('start_date')));
  const [endDate, setEndDate] = useState(new Date(localStorage.getItem('end_date')));
  

  return (<Context.Consumer>{setBuildings=>{
 
  return (
    <>
    {/* <div>
      <h1>{today}</h1>
    </div> */}
    <div 
    className={localStorage.getItem('meeting_status')==='false'?"drcontainer":"drcontainer2"}>
      <div className="space">
      <p1 className='label_mesg'>From </p1>
      
      </div>
      
      <div>
      <DatePicker className="dr1"
      
        selected={startDate}
        onChange={(date) => {
          console.log("hi")

          if(date.toISOString().split('T')[0]>endDate.toISOString().split('T')[0]){
               
            toast.warning(`Start date cannot be greater than end date `,{position:"top-center",hideProgressBar: true,})

      }
      else
      {

        setStartDate(date)
        localStorage.setItem('start_date',(date).toISOString().split('T')[0])
        
        console.log((date).toISOString().split('T')[0])
        axios.get('http://8686-106-51-81-179.ngrok.io/details',{
          headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true,},
          params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date')}
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



      }

          
          
        
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date().getTime() + 24 * 60 * 60 * 1000}
        maxDate={new Date().getTime() + 60*24 * 60 * 60 * 1000}
        dateFormat='dd/MM/yyyy'
        popperPlacement="auto" 
      />
      </div>
      <div className="space">
      <p1 className='label_mesg'>To </p1>
      </div>
      <div>
      <DatePicker className="dr2"
        selected={endDate}
        minDate={new Date().getTime() + 24 * 60 * 60 * 1000}

        onChange={(date) => {
          // window.location.reload()
          
          
        setEndDate(date)
        localStorage.setItem('end_date',(date).toISOString().split('T')[0])
        
        console.log((date).toISOString().split('T')[0])
        
        console.log((date).toISOString().split('T')[0])
        axios.get('http://8686-106-51-81-179.ngrok.io/details',{
          headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true,},
          params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date')}
      })
    .then(res=>{
   console.log("new avail")
   console.log(res.data)
   setBuildings(res.data)
   
 })
 .then(
  // window.location.reload()
 )
      
          
          }     
        }
        selectsEnd
        startDate={startDate}
        endDate={endDate}
       // minDate={startDate}
       // maxDate={new Date().getTime() + 60*24 * 60 * 60 * 1000}
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


export default Daterange


