import ReactDatePicker from "react-datepicker";
import React,{useState} from 'react'
import '../../Pages/Buildingspage/Rdp.css'
import { Context } from "./building";
import axios from "axios";
import { FaWindowMinimize } from "react-icons/fa";

function Rdp() {

  const[selectdate,setSelectdate]=useState(new Date(localStorage.getItem('date')))


  return (<Context.Consumer>{setBuildings=>{
    return <div className="date_container">
        
  <ReactDatePicker className="dp"
  selected={selectdate} 
  onChange={date => {setSelectdate(date)

  localStorage.setItem('date',(date).toISOString().split('T')[0])
  console.log(date)
  console.log((date).toISOString().split('T')[0])
  axios.get('http://19b8-2401-4900-60e5-a299-9c58-1ce-e4ff-8d3a.ngrok.io//all_buildings',{
    headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    withCredentials: true,},
    params:{date:localStorage.getItem('date')}
})
   .then(res=>{
     console.log("Here")
     setBuildings(res.data)
     
   })
   .then(
    window.location.reload()
   )
   
}}
  dateFormat='dd/MM/yyyy'
  minDate={new Date()} 
  popperPlacement="auto"
 
  >
      
  </ReactDatePicker>
</div>

  }
}
</Context.Consumer>
    
  )
}

export default Rdp