
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Context } from "../../Pages/Buildingspage/building.js";
import './Newdpicker.css';
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify'
import ClipLoader from "react-spinners/ClipLoader";
import logo from '../../logo (1).png'
import { Contextt } from "./Nchart";



const Newdpicker = () => {
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
      className={localStorage.getItem('meeting_status')==='false'?"drcontainerr":"drcontainer2r"}>
        <div className="spacer">
        <p1 className='label_mesgr'>From </p1>
        
        </div>
        
        <div>
        <DatePicker className="from_date1"
        
          selected={startDate}
          onChange={(date) => {

            localStorage.setItem('start_date',(date).toISOString().split('T')[0])

            console.log("hi")
  
            if(date.toISOString().split('T')[0]>endDate.toISOString().split('T')[0]){
                 
              toast.warning(`Start date cannot be greater than end date `,{position:"top-center",hideProgressBar: true,})
  
        }
        else
        {
          
   
    window.location.reload()

        
        }}
  
  
  
        }
          
          selectsStart
          startDate={startDate}
          endDate={endDate}
         maxDate={endDate}
          dateFormat='dd/MM/yyyy'
         popperPlacement="auto" 

        />
        </div>
        <div className="spacer">
        <p1 className='label_mesgr1'>To </p1>
        </div>
        <div>
        <DatePicker className="to_date"
          selected={endDate}
          onChange={(date) => {
      
            localStorage.setItem('end_date',(date).toISOString().split('T')[0])
          
    
      window.location.reload()
  }     
          }
          selectsEnd
          startDate={startDate}
          minDate={startDate}
          endDate={endDate}
          dateFormat='dd/MM/yyyy'
          popperPlacement="auto"
        />
        </div>
        </div>
        <ToastContainer/>
      </>
    );
          }}
  
          </Context.Consumer>
          
    )
        }
    }
  
export default Newdpicker