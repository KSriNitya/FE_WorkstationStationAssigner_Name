import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { StyledContainerNotPm, StyledDivWorkstationsNotPm } from '../Workstation/Wspage/Divisions.styled'
import { StyledHeader } from '../../components/Header.styled'
import { ErrorLabel, ErrorLabelNotPm, Gridtd, Gridtd_meet } from '../Workstation/Wspage/Table.styled'

import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import "../Workstation/Wspage/Wspmpage1.css"
import logo from '../../logo (1).png'
import CustomSeparatorWed from './breadcrumbsWed'
import Bccontainerw from '../Workstation/Wspage/Bccontainerw'
import ClipLoader from "react-spinners/ClipLoader";
import { Navbar } from '../Navbar/Navbar'
import Swal from 'sweetalert2';
import errorimage from '../../components/errorimage.png'




function Disable()
{

        let navigate=useNavigate()
        const [loading, setLoading] = useState(true);
        const[workstationDisabled,setWorkstationDisabled]=useState([])
        const [meetingdisabled,setMeetingDisabled]=useState([])
        var letterNumber = /^[a-zA-Z ]*$/;
        const [ws,setWs]=useState([])
        const [mr,setMr]=useState([])
        const[DisableFor,setDisableFor]=useState(localStorage.getItem('mb'))
        const nbuilding=localStorage.getItem('building')
        const nfloor=localStorage.getItem('floor')
        const building=parseInt(nbuilding)
        const floor=parseInt(nfloor)
        const [meet,setMeetingselected]=useState()
        const [error,setError]=useState(false)


        useEffect(()=>{

            axios.get('http://72a6-106-51-81-179.ngrok.io/meeting-room/days?',{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,},
                params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date')}
            })
        .then(res=>{let mounted=true;
             if(mounted)
            { 
               console.log(res.data)
            console.log(res.data.map(item=>{if(item._id===building) return item.floors.map(item=>{if(item.Floor_no===floor) return item.meetings})})[building-1][(floor%10)-1])
             setMr(res.data.map(item=>{if(item._id===building) return item.floors.map(item=>{if(item.Floor_no===floor) return item.meetings})})[building-1][(floor%10)-1])
                
             
               }
        })
        },[])
    useEffect(()=>{
        
        axios.get('http://72a6-106-51-81-179.ngrok.io/details',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
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
    .then(res=>{
        
            console.log(res.data)
            console.log(res.data.filter(item=>item._id===building).filter(item=>item.Floor_no===floor))
            console.log(res.data.map(item=>{if(item._id===building) return item.floors.map(item=>{if(item.Floor_no===floor) return item.workstations})}))
        setWs(res.data.map(item=>{if(item._id===building) return item.floors.map(item=>{if(item.Floor_no===floor) return item.workstations})})[building-1][(floor%10)-1])
        setLoading(false)
        
    })
    
},[])


const DisableForDropwdown=(e)=>{
    setDisableFor(e.target.value)
    console.log(e.target.value)


   

}
    const handleCancel=()=>{window.location.reload()}

    const handleConfirm=()=>{
        localStorage.setItem('mb','Workstations')
       if(DisableFor==='Workstations') 
       { if(workstationDisabled!==null)
        { setLoading(true)
        
            var d=false
            var e=false
           const enabled=workstationDisabled.filter(res=>res.workstation_state==='enable').map(item=>item.number)
          const disabled= workstationDisabled.filter(res=>res.workstation_state==='disable').map(item=>item.number)
                const wsdata= workstationDisabled.map(item=>item.number)
                console.log(disabled)
                if(enabled.length>0)
               {   
                    axios.put('http://72a6-106-51-81-179.ngrok.io/Disablestate',enabled,{
                        headers:{
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
                    else if(e.response.status===400){d=true
         
                  }
           
           
                   })
                   .then(res=>{
                       if(d===true)
                       {
                        toast.error("Workstation disable failed",{position:"top-center",hideProgressBar: true,})

                       }
                       else
                       {
                           
                        toast.success("Workstation state modified successfully",{position:"top-center",hideProgressBar: true,})
                        setTimeout(function(){
                            // setLoading(false)
                            window.location.reload()
                       }, 1500);
                       }
                    

                   })
                   
               }
               if(disabled.length>0)
                {    
                   axios.put('http://72a6-106-51-81-179.ngrok.io/Enablestate',disabled,{
                    headers:{
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
                    else if(e.response.status===400){e=true
         
                }
         
         
                 })
                 .then(res=>{
                    if(d===true)
                    {
                     toast.error("Workstation enable failed",{position:"top-center",hideProgressBar: true,})

                    }
            
                })
            }
            if(e===false & d===false)
            {
                console.log("hi")
                // setLoading(false)
                // toast.success("Workstation state modified successfully",{position:"top-center",hideProgressBar: true,})
           
                
            }
           
        }}
        else
        {
            const enabled=meetingdisabled.filter(res=>res.workstation_state==='enable').map(item=>item.number)
            const disabled= meetingdisabled.filter(res=>res.workstation_state==='disable').map(item=>item.number)
                  const wsdata= meetingdisabled.map(item=>item.number)

                  if(enabled.length>0)
                  { setLoading(true)
                       axios.put('http://72a6-106-51-81-179.ngrok.io/disable/meetingRooms',{
                           headers:{
                               Authorization:`Bearer ${localStorage.getItem('token')}`,
                               'Access-Control-Allow-Origin': '*',
                               'Content-Type': 'application/json',
                               withCredentials: true,
                             },
                             params:{room_id:5}
                       })
                       .catch((error) => {
        
                        setError(true)
                        setLoading(false)
                    })
                       
                   .then(res=>console.log(res.data))
                  }
                  if(disabled.length>0)
                   {
                    setLoading(true)
                      axios.put('http://72a6-106-51-81-179.ngrok.io/Enablestate',disabled,{
                       headers:{
                           Authorization:`Bearer ${localStorage.getItem('token')}`,
                           'Access-Control-Allow-Origin': '*',
                           'Content-Type': 'application/json',
                           withCredentials: true,
                         }
                   })
                   .catch((error) => {
        
                    setError(true)
                    setLoading(false)
                })
                   .then(res=>console.log(res.data))
               }
               toast.success("Workstation state modified successfully",{position:"top-center",hideProgressBar: true,})
               setTimeout(function(){
                   navigate('/home')
              }, 900);


        }
    }
    const onMDisable=async (item)=>{    

        if(item.room_state==='enable')
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
                  setLoading(true)
                localStorage.setItem('mb','Meeting Rooms')
                  localStorage.setItem('mb','Meeting Rooms')
                toast.success("Meeting room Disabled Successfully",{position:"top-center",hideProgressBar: true,})
                    axios.put(`http://72a6-106-51-81-179.ngrok.io/disable/meetingRooms`,{},{params:{room_id:item.number,reason:text},headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        withCredentials: true,
                      }})
                      .catch((error) => {
        
                        setError(true)
                        setLoading(false)
                    })
                      .then(res=>{
                        toast.success("Meeting room Disabled Successfully",{position:"top-center",hideProgressBar: true,})
                        setTimeout(function(){
                            window.location.reload()
                                }, 1600);
                      })
                
              }
              
              

        }
        if(item.room_state==='disable')
        {
            localStorage.setItem('mb','Meeting Rooms')

            setLoading(true)


      axios.put('http://72a6-106-51-81-179.ngrok.io/enable/meetingRooms',{},{params:{room_id:item.number},headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
            ,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
          }})
          .catch((error) => {
        
            setError(true)
            setLoading(false)
        })
          .then(res=>{
            toast.success("Meeting room Enabled Successfully",{position:"top-center",hideProgressBar: true,})
            setTimeout(function(){
                window.location.reload()
                    }, 1600);
          })
          
        
         

        }
    }

   

function onClickSeat(seat)
{

 
        if(workstationDisabled.indexOf(seat)>-1)
    {
       
        setWorkstationDisabled(workstationDisabled.filter(res=>res!==seat))
    }
    else{
        console.log("Hi")
        setWorkstationDisabled(workstationDisabled.concat(seat))
        
        }

    

    
        
        
    }
        
    if(loading){
        return (
            <>
           
        <div className='loading_pos'>
          <ClipLoader size={'100px'} className='clip_pos'/>
          <img src={logo} height='auto' />
         
        </div> <ToastContainer/></>)
      
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
   
       
       <Navbar/>
        
    
    <div>
          
          
          <Bccontainerw>
                <CustomSeparatorWed/>
            </Bccontainerw>
          <ul className="showcase">

            
           
     <li>
               <div className="seatna"></div>
               <small>Disabled</small>
           </li>
            
            <li>
            <div className="seatselecteddisable"></div>
                <small>Disable</small>
            </li>
            <li>
            <div className="seatavailable"></div>
                <small>Enabled / Enable</small>
                
            </li>
        </ul>
     <StyledContainerNotPm>
         <div className='disable_for'>
        <form>
        <label> Show :{' '}
        <select value={DisableFor} onChange={DisableForDropwdown} >
        <option value='Workstations'>Workstations</option>
       <option value="Meeting Rooms">Meeting Rooms</option>
       </select>
       </label></form>
         
         </div>
     <div className='savedinfo'>
     <h2>Selected Information </h2>
         <div className='savedinfo1'>
                
                <h4>Building : {localStorage.getItem("building_name")}</h4>
                <h4>Floor    : {localStorage.getItem("floor_name")}</h4>
                </div>
       </div>
     {DisableFor==='Workstations'?
      <StyledDivWorkstationsNotPm>
          
          <table className='grid'>
            <tbody>
              <td>
                { ws.map( (row,index) =>
                  <Gridtd 
                  className={(row.workstation_state==='disable' & workstationDisabled.indexOf(row)<0)?'disabledhr':((workstationDisabled.indexOf(row)>-1?(row.workstation_state==='disable'?'disablepageavailable':'disablereserved'): 'disablepageavailable'))}
                  key={index} onClick = {e => onClickSeat(row)}> {index+1} </Gridtd>) }
              </td>
          </tbody>

        </table>
        </StyledDivWorkstationsNotPm> : <> <div className='meet_conatiner_2'>
        {mr.map( (row,index) =><>
                 <Gridtd_meet
                   className={row.room_state==='disable'?'disabled':'mavailable'}
                   
                   key={index} >
                       <div className='message_display_meeting'>
                       <h1 className='cbox_mesg'>{row.name}</h1>
                      {<h1 className='cbox_mesg'>Capacity : {row.capacity}</h1> }
                       </div>
                       <button className='disable_button_meeting' style={{backgroundColor:(row.room_state==='enable')?"#B31B1B":"green"}}
                             
                             
                             key={index} onClick = {e => onMDisable(row)}>
                                {row.room_state==='enable'? 'Disable':'Enable'}
                                 </button>
                       </Gridtd_meet>
                      
                       </>) }
                       </div>
                       <div>
                       <div className='disable_meeting'>
                
                       </div>
                       {mr.length===0?<h2 className='empty_text'>No meeting rooms available on this floor.</h2>:null}
            </div>
            </>}
    {  DisableFor==='Workstations' ? <div className='buttons_container_ws'>
        <button className='button_ws_cancel' onClick={handleCancel}>Cancel</button>
        <button className='button_ws_confirm' onClick={handleConfirm}>Confirm</button>
    </div>:null}


        </StyledContainerNotPm>
        
    </div>
    <ToastContainer/>
</>}
    </>
  )}
      }      }
export default Disable