import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './Daterange.css'
import { Context } from "./building";
import axios from "axios";

function DaterangeTime {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (<Context.Consumer>{setBuildings=>{
  return (
    <>
    <div className="drcontainer">
      <div className="space">
      <p1 className='label_mesg'>From :</p1>
      </div>
      <div>
      <DatePicker className="dr1"
        selected={startDate}
        onChange={(date) => {setStartDate(date)
          localStorage.setItem('start_date',(date).toISOString().split('T')[0])
          
          console.log((date).toISOString().split('T')[0])}}
        
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        dateFormat='dd/MM/yyyy'
        popperPlacement="auto" 
      />
      </div>
      <div className="space">
      <p1 className='label_mesg'>To :</p1>
      </div>
      <div>
      <DatePicker className="dr2"
        selected={endDate}
        onChange={(date) => {setEndDate(date)
          localStorage.setItem('end_date',(date).toISOString().split('T')[0])
          console.log('heree')
          console.log((date).toISOString().split('T')[0])
          axios.get('http://localhost:8088/details',{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,},
            params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date')}
        })
      .then(res=>{
     console.log("new avail")
     setBuildings(res.data)
     
   })
   .then(
    window.location.reload()
   )
        }}
          

        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat='dd/MM/yyyy'
        popperPlacement="auto"
      />
      </div>
      </div>
    </>
  );
      }
  }
</Context.Consumer>
    
    )}

export default DaterangeTime


