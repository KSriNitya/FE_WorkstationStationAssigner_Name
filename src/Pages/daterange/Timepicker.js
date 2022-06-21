import React, { useState } from 'react';
import TimePicker from 'react-time-picker-input';
import "react-time-picker-input/dist/components/TimeInput.css"
import './Timepicker.css'
import { Context } from "../../Pages/Buildingspage/building.js";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer,toast } from 'react-toastify'



function TimePickerTest() {
const [valuee, setValue] = useState(localStorage.getItem('start_time'));
const [endvalue, setendValue] = useState(localStorage.getItem('end_time'));
console.log(valuee)
// const d1=localStorage.getItem('start_date')
//     const d2=localStorage.getItem('end_date')
//     const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
//     const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)

return (<Context.Consumer>{setBuildings=>{

    return (
        <>
        <div className='trcontainer'>
        <div className='space'>
            <h1 className='time_tag'>From </h1>
        </div>
        <div className='space'>
            <TimePicker className='dr1'
            maxTime={localStorage.getItem('end_date')}
                disabled={localStorage.getItem('editteam')==='true'}
                onChange={(value)=>{
                    console.log(value)
                   const v=valuee
                   console.log(v)
                    console.log(valuee>endvalue)
                    const val1=new Date('2022','06','22',valuee.substring(0,2),valuee.substring(3,5)).getTime()
                    const val2=new Date('2022','06','22',endvalue.substring(0,2),endvalue.substring(3,5)).getTime()
                    console.log(val1)
                    console.log(val2)
                    console.log(val1>val2)
                    const val3=Number.parseInt(value.substring(0,2))
                    const val4=Number.parseInt(value.substring(3,5))
                    const val5=Number.parseInt(endvalue.substring(0,2))
                    const val6=Number.parseInt(endvalue.substring(3,5))
                    console.log(val3)
                    console.log(val4)
                    
                    console.log(val5)
                    console.log(val6)

                    if(val4>val6& (val3>val5|val3===val5)|val3>val5|(val4===val6 & val3===val5)){
                        
                        toast.warning(`Start time should be less than end time `,{position:"top-center",hideProgressBar: true,})
                        localStorage.setItem('start_time',(value))
                       
                        
            }
            else
            {
                setValue(value)
                localStorage.setItem('start_time',(value))

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
             setBuildings(res.data)
             
           })
     

            }


                }}
                value={valuee}
               
                hour12Format={true}
                fullTimeDropdown={true}
                popperPlacement="auto"
            />
        </div>
        <div className='space'>
            <h1 className='time_tag'>To</h1>
        </div>
        <div className='space'>
            <TimePicker
            disabled={localStorage.getItem('editteam')==='true'}
                onChange={(endvalue)=>{

                    const val3=Number.parseInt(valuee.substring(0,2))
                    const val4=Number.parseInt(valuee.substring(3,5))
                    const val5=Number.parseInt(endvalue.substring(0,2))
                    const val6=Number.parseInt(endvalue.substring(3,5))
                    if(val4>val6& (val3>val5|val3===val5)|val3>val5|(val4===val6 & val3===val5)){
                        
                        toast.warning(`End time must be greater than start time `,{position:"top-center",hideProgressBar: true,})
                       
                        
            }
                    
                
                    else
                    {
                        console.log('set')
                        setendValue(endvalue)
                        localStorage.setItem('end_time',(endvalue))
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
     setBuildings(res.data)
     
   })


                }}}
                value={endvalue}
                
                hour12Format={true}
                fullTimeDropdown={true}
                popperPlacement="auto"
            />
        </div>
        </div>
        </>
    ); 
}}

        </Context.Consumer>
  )
  

}

export default TimePickerTest


