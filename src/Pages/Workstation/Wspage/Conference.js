import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledMembersCheckPm, StyledDivProjectCheck, StyledDivWorkstationsForPm,StyledDivWorkstationsNotPm, StyledPmContainer, StyledContainerNotPm, StyledDivWsForPm } from './Divisions.styled'
import { ErrorLabelPmTeam, ErrorLabelNotPm, ErrorLabelPmSelf, Gridtd,Gridtd_meet, MembersLabel,Memberss } from './Table.styled'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./Wspmpage1.css"
import axios from 'axios'
import logo from '../../../logo (1).png'
import ClipLoader from "react-spinners/ClipLoader";
import Bccontainerw from './Bccontainerw'
import CustomSeparator2 from './BreadcrumbsW'
import { Navbar } from '../../Navbar/Navbar'
import Swal from 'sweetalert2'
import { localeData } from 'moment'
import errorimage from '../../../components/errorimage.png'



function Conference() {
const [loading, setLoading] = useState(true);
const role=localStorage.getItem('role')
const [meet,setMeetingselected]=useState()
const [mr,setMr]=useState([])
const [reason,setReason]=useState()
const [error,setError]=useState(false) 
    

    let navigate=useNavigate()
    const[cfselected,setcfselected]=useState(null)
    const [status,setStatus]=useState(false)
    localStorage.setItem('status',false)
    const [disabled,setDisabed]=useState([])
    const [selectedproject,setSelectedproject]=useState()
    const [kprojects,setkprojects]=useState([])
    const date1=localStorage.getItem('editstartdate')
    const date2=localStorage.getItem('editenddate')



    const [wsFor,setwsFor]=useState('Self')
    const nbuilding=localStorage.getItem('building')
    const nfloor=localStorage.getItem('floor')
    var [checkedvalue,setCheckedvalue]=useState(0);
    const seatReserved=[]

    
    var bname=""
        const building=parseInt(nbuilding)
        const floor=parseInt(nfloor)
        let b=building
        let f=floor
         const edit=localStorage.getItem('editteam')  
      const editbid=JSON.parse(localStorage.getItem('editbid'))
    const conf=localStorage.getItem('edit_conf')
      const editfid=JSON.parse(localStorage.getItem('editfid')) 
      // const d1=localStorage.getItem('start_date')
      var letterNumber = /^[a-zA-Z ]*$/;

      // const d2=localStorage.getItem('end_date')
      // const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
      // const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
        if(editbid===building & editfid===floor &edit==='true'&conf==='121')
        {
console.log("printed")


        }

        useEffect(()=>{let mounted=true
      

          axios.get('http://72a6-106-51-81-179.ngrok.io/details',{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,},
            params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),start_time:localStorage.getItem('start_time')
        ,end_time:localStorage.getItem('end_time'),report:'false'}
        })
        .catch((error) => {
        
          setError(true)
          setLoading(false)
        })
      .then(res=>{
        console.log(res.data.map(item=>{if(item._id===building) return item.floors.map(item=>{if(item.Floor_no===floor) return item.meetings})})[building-1][(floor%10)-1])
        setMr(res.data.map(item=>{if(item._id===building) return item.floors.map(item=>{if(item.Floor_no===floor) return item.meetings})})[building-1][(floor%10)-1])
           
        setLoading(false)
     
   })
        
        return ()=>(mounted=false);
},[])




const renderDate=()=>{
  
  if(localStorage.getItem('editteam')==='true')
  {
    const start_date_format=date1.substring(8)+date1.charAt(7)+date1.substring(5,8)+date1.substring(0,4)
  const end_date_format=date2.substring(8)+date2.charAt(7)+date2.substring(5,8)+date2.substring(0,4)
   
    return<> <h4>From    : {start_date_format}</h4>
  <h4>To    : {end_date_format}</h4></>

  }
  else
  {
    console.log("hi")
    return<> <h4>From    : {localStorage.getItem("start_date").substring(8)+localStorage.getItem("start_date").charAt(7)+localStorage.getItem("start_date").substring(5,8)+localStorage.getItem("start_date").substring(0,4)}</h4>
  <h4>To    : {localStorage.getItem("end_date").substring(8)+localStorage.getItem("end_date").charAt(7)+localStorage.getItem("end_date").substring(5,8)+localStorage.getItem("end_date").substring(0,4)}</h4></>

  }
  
  
}

const handleCancel=()=>(window.location.reload())                   //handleconfirm

    const handleConfirm=async ()=>{ 
      localStorage.setItem('mb','Workstations')
      console.log(role)
      if(role==='HR')
      {   
          if(wsFor!=='Self')
          {
              localStorage.setItem('mbForHr','Others')


          }
          else
          {
            console.log("hi")
              localStorage.setItem('mbForHr','Self')


          }
      }
      if(role==='Project manager')
      {
          if(wsFor!=='Self')
          {
              localStorage.setItem('mbFor',wsFor)


          }
          else
          {
              localStorage.setItem('mbFor','Self')


          }

         


      }
      localStorage.setItem('hrproject','All')
    localStorage.setItem('meeting_status',false)

      localStorage.setItem('mb','Meeting Rooms')


            if(localStorage.getItem('editteam')==='true'){

              
                if(meet.length!==null){
                  const { value: text } = await Swal.fire({
                    title: 'Booking Conference Room',
                    input: 'text',
                    inputLabel: 'Reason:',
                    inputPlaceholder: 'Enter the reason',
                    confirmButtonText:"Confirm",
                    confirmButtonColor:'#3CB043',
                    cancelButtonColor:'#E35335',
                    inputAttributes: {
                      
                      autocapitalize: 'off',
                      autocorrect: 'off'
                    },
                    preConfirm: (login) => {
                      console.log("hi")
                      if(role==='HR')
                      {   
                          if(wsFor!=='Self')
                          {
                              localStorage.setItem('mbForHr','Others')
                
                
                          }
                          else
                          {
                            console.log("hi")
                              localStorage.setItem('mbForHr','Self')
                
                
                          }
                      }
                      if(role==='Project manager')
                      {
                          if(wsFor!=='Self')
                          {
                              localStorage.setItem('mbFor',wsFor)
                
                
                          }
                          else
                          {
                              localStorage.setItem('mbFor','Self')
                
                
                          }
                
                         
                
                
                      }
                      localStorage.setItem('hrproject','All')
                      localStorage.setItem('meeting_status',false)
                  
                        localStorage.setItem('mb','Meeting Rooms')
                      
                    
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
                 ////override reason api hr
                 if(localStorage.getItem('editproject')!=='null')
                 {
                  setLoading(true)
                  var p=false
                  if(localStorage.getItem('editproject')!=='NA')
                  {
                    const project=localStorage.getItem('editproject')
                    localStorage.setItem('hrproject',project)

                  }
                  if(role==='HR')
                  {   
                      if(localStorage.getItem('editproject')!=='NA')
                      {
                          localStorage.setItem('mbForHr','Others')
            
            
                      }
                      else
                      {
                        console.log("hi")
                          localStorage.setItem('mbForHr','Self')
            
            
                      }
                  }
                  if(role==='Project manager')
                  {
                      if(localStorage.getItem('editproject')!=='NA')
                      {
                          localStorage.setItem('mbFor',wsFor)
            
            
                      }
                      else
                      {
                          localStorage.setItem('mbFor','Self')
            
            
                      }
            
                     
            
            
                  }
                  
                  axios.put('http://72a6-106-51-81-179.ngrok.io/edit_room', {    
                    start_date:localStorage.getItem('editstartdate'),
                    end_date:localStorage.getItem('editenddate'),
                    email:localStorage.getItem('email'),
                    building_id:building,
                    floor_id:floor,
                    conf_room:meet.number,
                    start_time:localStorage.getItem('editstarttime'),
                    end_time:localStorage.getItem('editendtime'),
                    reason_for_booking:text,
                    project_name:localStorage.getItem('editproject')
        
                },{
                     
                  headers:{
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
                             toast.success("Edit Successful",{position:"top-center",hideProgressBar: true,})
                            
                    
                     setTimeout(function(){
                         setLoading(true)
                         navigate('/manage')
                           
                            }, 1400);
             
             }
             else
             { setLoading(true)
                 toast.error("Booking failed",{position:"top-center",hideProgressBar: true,})
         
                 setTimeout(function(){
                     setLoading(true)
                     navigate('/manage')
                       
                        }, 1600);
                
             }
                 })

                 }
                 else
                 {
                   setLoading(true)
                  var p=false
                  if(localStorage.getItem('editproject')!=='NA')
                  {
                    const project=localStorage.getItem('editproject')
                    localStorage.setItem('hrproject',project)



                  }

                  if(role==='HR')
                  {   
                      if(localStorage.getItem('editproject')!=='NA')
                      {
                          localStorage.setItem('mbForHr','Others')
            
            
                      }
                      else
                      {
                        console.log("hi")
                          localStorage.setItem('mbForHr','Self')
            
            
                      }
                  }
                  if(role==='Project manager')
                  {
                      if(localStorage.getItem('editproject')!=='NA')
                      {
                          localStorage.setItem('mbFor',wsFor)
            
            
                      }
                      else
                      {
                          localStorage.setItem('mbFor','Self')
            
            
                      }
            
                     
            
            
                  }
                  axios.put('http://72a6-106-51-81-179.ngrok.io/edit_room', {    
                    start_date:localStorage.getItem('editstartdate'),
                    end_date:localStorage.getItem('editenddate'),
                    email:localStorage.getItem('email'),
                    building_id:building,
                    floor_id:floor,
                    conf_room:meet.number,
                    start_time:localStorage.getItem('editstarttime'),
                    end_time:localStorage.getItem('editendtime'),
                    reason_for_booking:text,
        
                },{
                     
                  headers:{
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
                             toast.success("Booking Successful",{position:"top-center",hideProgressBar: true,})
                            
                    
                     setTimeout(function(){
                         setLoading(true)
                         navigate('/manage')
                           
                            }, 1400);
             
             }
             else
             { setLoading(true)
                 toast.error("Booking failed",{position:"top-center",hideProgressBar: true,})
         
                 setTimeout(function(){
                     setLoading(true)
                     navigate('/manage')
                       
                        }, 1600);
                
             }
                 })
                 }
                
                 



                    
                  }
                   
                }
                else{
                    toast.warning("Please select a meeting room",{position:"top-center",hideProgressbar:true})
                }
    
            }


                else if(role==='HR'& meet.state===true){
                    if(meet.length!==null){
                      if(wsFor==='Self')
                      {
                        const { value: text } = await Swal.fire({
                          title: 'Booking Conference Room',
                          input: 'text',
                          inputLabel: 'Reason:',
                          inputPlaceholder: 'Enter the reason',
                          confirmButtonText:"Confirm",
                          confirmButtonColor:'#3CB043',
                          cancelButtonColor:'#E35335',
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
                       ////override reason api hr
                       console.log("hello")
                       var p=false
                       axios.put('http://72a6-106-51-81-179.ngrok.io/change-details?',{},
                          { params:{    
                              start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),
                              email:localStorage.getItem('email'),
                              reason:text,
                              project_name:'null',
                             
                              meeting_room:meet.number,
                              start_time:localStorage.getItem('start_time'),
                              end_time:localStorage.getItem('end_time'),
                              
                  
                          },
                              headers:{
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
                                     toast.success("Booking Successful",{position:"top-center",hideProgressBar: true,})
                                    
                            
                             setTimeout(function(){
                                 setLoading(true)
                                 navigate('/manage')
                                   
                                    }, 1400);
                     
                     }
                     else
                     { setLoading(true)
                         toast.error("Booking failed",{position:"top-center",hideProgressBar: true,})
                 
                         setTimeout(function(){
                             setLoading(true)
                             navigate('/manage')
                               
                                }, 1600);
                        
                     }
                         })
  
  
  
                          
                        }

                      }
                      else
                      {
                        const { value: text } = await Swal.fire({
                          title: 'Booking Conference Room',
                          input: 'text',
                          inputLabel: 'Reason:',
                          inputPlaceholder: 'Enter the reason',
                          confirmButtonText:"Confirm",
                          confirmButtonColor:'#3CB043',
                          cancelButtonColor:'#E35335',
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
                       ////override reason api hr
                       console.log("hello")
                       var p=false
                       axios.put('http://72a6-106-51-81-179.ngrok.io/change-details?',{},
                          { params:{    
                              start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),
                              email:localStorage.getItem('email'),
                              reason:text,
                              project_name:selectedproject,
                              meeting_room:meet.number,
                              start_time:localStorage.getItem('start_time'),
                              end_time:localStorage.getItem('end_time'),
                              
                  
                          },
                              headers:{
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
                                     toast.success("Booking Successful",{position:"top-center",hideProgressBar: true,})
                                    
                            
                             setTimeout(function(){
                                 setLoading(true)
                                 navigate('/manage')
                                   
                                    }, 1400);
                     
                     }
                     else
                     { setLoading(true)
                         toast.error("Booking failed",{position:"top-center",hideProgressBar: true,})
                 
                         setTimeout(function(){
                             setLoading(true)
                             navigate('/manage')
                               
                                }, 1600);
                        
                     }
                         })
  
  
  
                          
                        }


                      }


                     
                       
                    }
                    else{
                        toast.warning("Please select a meeting room",{position:"top-center",hideProgressbar:true})
                    }    


                }


            else{

                if((role==='HR'|role==='Project manager')& wsFor==='Team')
                {
                  console.log("JJJ")
                    if(meet.length!==null){

                      

                      const { value: text } = await Swal.fire({
                        title: 'Booking Conference Room',
                        input: 'text',
                        inputLabel: 'Reason:',
                        inputPlaceholder: 'Enter the reason',
                        confirmButtonText:"Confirm",
                        confirmButtonColor:'#3CB043',
                        cancelButtonColor:'#E35335',
                        
                        inputAttributes: {
                          
                          autocapitalize: 'off',
                          autocorrect: 'off'
                        },
                        preConfirm: (login) => {
                      

                        
                        },
                        inputValidator: (value) => {
                          if (!value) {
                            return 'You need to enter the reason for booking'}
                           
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
                      {setLoading(true)
                        var p=false
                        //api for team conference with reason
                        localStorage.setItem('hrproject',selectedproject)
                        setLoading(true)
                        console.log(text)
                        axios.post('http://72a6-106-51-81-179.ngrok.io/meeting-rooms/teams',{    
                          start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),
                          email:localStorage.getItem('email'),
                          building_id:building,
                          floor_id:floor,
                          conf_room:meet.number,
                          start_time:localStorage.getItem('start_time'),
                          end_time:localStorage.getItem('end_time'),
                          project_name:selectedproject,
                          name:localStorage.getItem('name'),
                          reason_for_booking:text
              
                      }, {
                          headers:{
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
                          toast.error(e.response.data,{position:"top-center",hideProgressBar: true,})
                          setTimeout(function(){
                            setLoading(true)
                            navigate('/manage')
                              
                               }, 1400);
                  

         
                        }
                 
                 
                         })
                         .then(res=>{
                             
                             
                             if(p!==true){
                                 console.log("hi")
                                 toast.success("Booking Successful",{position:"top-center",hideProgressBar: true,})
                                
                        
                         setTimeout(function(){
                             setLoading(true)
                             navigate('/manage')
                               
                                }, 1400);
                 
                 }
                //  else
                //  { setLoading(true)
                //      toast.error(res.data,{position:"top-center",hideProgressBar: true,})
             
                //      setTimeout(function(){
                //          setLoading(true)
                //          navigate('/manage')
                           
                //             }, 1600);
                    
                //  }
                     })
                        
                      }
                        
                    }
                    else{
                        toast.warning("Please select a meeting room",{position:"top-center",hideProgressbar:true})
                    }


                }
                else
                {
            if(meet.length!==null){
console.log(wsFor)
              const { value: text } = await Swal.fire({
                        title: 'Booking Conference Room',
                        input: 'text',
                        inputLabel: 'Reason:',
                        inputPlaceholder: 'Enter the reason',
                        confirmButtonText:"Confirm",
                        confirmButtonColor:'#3CB043',
                        cancelButtonColor:'#E35335',
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
                        var p=false
                        console.log(text)
                        axios.post('http://72a6-106-51-81-179.ngrok.io/v1/meeting-room-with-time',{    
                          start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),
                          email:localStorage.getItem('email'),
                          building_id:building,
                          floor_id:floor,
                          conf_room:meet.number,
                          start_time:localStorage.getItem('start_time'), 
                          end_time:localStorage.getItem('end_time'),
                          reason_for_booking:text
              
                      }, {
                          headers:{
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
                          toast.error(e.response.data,{position:"top-center",hideProgressBar: true,})
                          setTimeout(function(){
                            setLoading(true)
                            navigate('/manage')
                              
                               }, 1400);

                          
                        }
                 
                 
                         })
                         .then(res=>{
                             
                             
                             if(p!==true){
                                 console.log("hi")
                                 toast.success("Booking Successful",{position:"top-center",hideProgressBar: true,})
                                
                        
                         setTimeout(function(){
                             setLoading(true)
                             navigate('/manage')
                               
                                }, 1400);
                 
                 }
                //  else
                //  { setLoading(true)
                //   console.log(res)
                //      toast.error(res,{position:"top-center",hideProgressBar: true,})
             
                //      setTimeout(function(){
                //          setLoading(true)
                //          navigate('/manage')
                           
                //             }, 1600);
                    
                //  }
                     })
                     
                      }
              
            }
            else{
                toast.warning("Please select a meeting room",{position:"top-center",hideProgressbar:true})
            }
            }
          }


    }

    const wsFordropdownSelected=(e)=>{setwsFor(e.target.value)
      console.log(e.target.value)
        if(e.target.value==='Team')
        {

          
          setLoading(true)
            axios.get('http://72a6-106-51-81-179.ngrok.io/find_projects_name',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
                  },
                  params:{email:localStorage.getItem('email')}

            })
            .catch((error) => {
        
              setError(true)
              setLoading(false)
            })
           .then(res=>{
               console.log(res.data)
                console.log("Projects")
    var p=res.data
                   setkprojects(p)
                  setSelectedproject(p[0])
                  localStorage.setItem('hrproject',p[0])

                setLoading(false)
                } )
        }
    }

    const projectdropdownSelected=(e)=>{setSelectedproject(e.target.value)
        console.log(e.target.value)
        localStorage.setItem('hrproject',e.target.value)
    console.log(selectedproject)
    }

    function onClickMeeting(room){

        if(role==='HR'& room.state===true ){
            if(meet===room)
            {
                
                
                setMeetingselected(null)
            }
                else{

            setMeetingselected(room) 
            console.log(room)
        }
    }
        else if(room.state===false & room.room_state==='enable')
        {
            if(meet===room)
    {
        
        
        setMeetingselected(null)
    }
        else{
           
                setMeetingselected(room) 
               
                console.log(room.number)
                
        }
        }
        else if(room.state===true)
        {
            toast.warning("Sorry! The meeting room is already booked",{position:"top-center",hideProgressBar: true,})
            console.log("hi")
        }
        else if(room.room_state==='disable'){
            toast.warning("Sorry! The meeting room is disabled",{position:"top-center",hideProgressBar: true,})
            }

    }


    if(loading){
        return (
          <>
          <ToastContainer/>
        <div className='loading_pos'>
          <ClipLoader size={'100px'} className='clip_pos'/>
          <img src={logo} height='auto' />
          {/* <h1>lOADING</h1> */}
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
      
     else {return (
          <>
          <Navbar/>
          <Bccontainerw> <CustomSeparator2/> </Bccontainerw>


          <ul className="showcase">
            
           
            <li>
                <div className="seatavailable"></div>
                <small className='legend_text'> Available</small>
            </li>
            <li>
                <div className="seatselected"></div>
                <small className='legend_text'>Selected</small>
            </li>
            <li>
                <div className="seatbooked"></div>
                <small className='legend_text'>Booked</small>
            </li>
            <li>
                <div className="seatna"></div>
                <small className='legend_text'>Disabled</small>
            </li>
        </ul>

          <StyledContainerNotPm>
          <h1 className='box_header_meeting'>Meeting Room Options</h1>
       <div className='savedinfo'>
                <h2>Selected Information </h2>
                <div className='savedinfo1'>
                <h4>Building : {localStorage.getItem("building_name")}</h4>
                <h4>Floor{'    '}{' '}{' '}{' '}{' '}{' '}{' '}: {localStorage.getItem("floor_name")}</h4>
                {renderDate()}
                
                <h4>From    : {localStorage.getItem('editteam')==='true'?localStorage.getItem('editstarttime'):localStorage.getItem('start_time')}</h4>
                <h4>To    : {localStorage.getItem('editteam')==='true'?localStorage.getItem('editendtime'):localStorage.getItem('end_time')}</h4>
                </div>
       </div>

     

       {
       (role==='Project manager' | role==='HR') & localStorage.getItem('editteam')==='false'? 
    
    <div className={wsFor==='Self'?'project_meet_option':'project_meet_option2'}>
       <form>
       <label>
      Choose room for  : <select value={wsFor} onChange={wsFordropdownSelected} >
       <option value='Self'>Self</option>
       <option value="Team">Team</option>
        </select>
        </label>
        </form>
    </div>:null
    }

       {((role==='Project manager' | role==='HR') & wsFor==="Team")?
       <div className='projects_meet'>
            <form>
            <label>
            Select the Project : <select value={selectedproject} onChange={projectdropdownSelected} >
            {kprojects.map((item,index)=>( <option key={index}   value={item}>{item}</option>))}
            </select>
            </label>
            </form>
        </div>: <div></div> }

       

      
              <div 
            //   className={mr.length===3?'meet_conatiner_3':(mr.length===2?'meet_conatiner_2':'meet_conatiner_1')}
            className='meet_conatiner_2' 
              >  
              {mr.map( (row,index) =>
                 <Gridtd_meet
                   className={role!=='HR'?(row.room_state==='disable'?'disabled':(edit==='true'?(editbid===building & editfid===floor &  (conf===row.number.toString())?'seatedit':(row.state===true ?'booked':((meet===row)? 'reserved': 'available'))):(row.state===true & meet!==row ?'booked':((meet===row)? 'reserved': 'available')))):
                   (row.room_state==='disable'?'disabled':(edit==='true'?(editbid===building & editfid===floor &  (conf===row.number.toString())?'seatedit':(row.state===true  ?'booked':((meet===row)? 'reserved': 'available'))):(row.state===true & meet!==row ?'booked':((meet===row)? 'reserved': 'available'))))}
                   
                   key={index} onClick = {e => onClickMeeting(row)}>
                      {row.room_state!=='disable'? <div className='message_display_meeting'>
                       <h1 className='cbox_mesg'>{row.name}</h1>
                     {row.state===true?  <h1 className='cbox_mesg'>Reason :{row.reason_for_booking}</h1>:null}

                       <h1 className='cbox_mesg'>Capacity : {row.capacity}</h1>  
                       </div>:<div className='message_display_meeting'>
                       <h2 className='cbox_mesg'>{row.name}</h2>
                       <h1 className='cbox_mesg'>Reason :{row.reason_for_disabling}</h1>
 
                       </div>}
                       </Gridtd_meet>) }
                       
                       </div> 
    <div className='buttons_container_ws_meet'>
        <button className='button_ws_cancel' onClick={handleCancel}>Cancel</button>
        <button className='button_ws_confirm' onClick={handleConfirm}>Confirm</button>
    </div>
 {/* {role!=='Project manager' &&  (workstationselected?null:<h1 className='errorlabel'>Please select workstation</h1>)} */}
       </StyledContainerNotPm>

<ToastContainer/>
          </>
      )}}
    }
      export default Conference