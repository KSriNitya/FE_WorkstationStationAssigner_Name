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
import errorimage from '../../../components/errorimage.png'


function Wspmpage() {

    const [loading, setLoading] = useState(true);


    const role=localStorage.getItem('role')
    const [meet,setMeetingselected]=useState()
    const [error,setError]=useState(false)
    const [kprojects,setkprojects]=useState([])
    const [kmembers,setkmembers]=useState([])
    const [ws,setWs]=useState([])
    const [mr,setMr]=useState([])
    let navigate=useNavigate()
    var [checkedvalue,setCheckedvalue]=useState(0);
    const seatReserved=[]
    const [checkedMembers,setCheckedmembers]=useState([])
    const [teamdata,setTeamdata]=useState([])
    const[workstationselected,setWorkstationselected]=useState(null)
    const[workstationselectedForPm,setWorkstationselectedForPm]=useState(null)
    const [status,setStatus]=useState(false)
    localStorage.setItem('status',false)
    const[seatsReserved,setSeatsreserved]=useState(seatReserved)
    const [disabled,setDisabed]=useState([])
    const [selectedproject,setSelectedproject]=useState()

    // const d1=localStorage.getItem('start_date')
    // const d2=localStorage.getItem('end_date')
    // const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
    // const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)

    const [wsFor,setwsFor]=useState('Self')
    const nbuilding=localStorage.getItem('building')
    const nfloor=localStorage.getItem('floor')
    var bname=""
        const building=parseInt(nbuilding)
        const floor=parseInt(nfloor)
        let b=building
        let f=floor
        console.log(typeof(nbuilding))
        console.log(localStorage.getItem('date'))

        

        useEffect(()=>{
            let mounted=true;
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
               if(mounted)
               {console.log(res.data)
                console.log("Projects")
    var p=res.data
                   setkprojects(p)
                  setSelectedproject(p[0])}
                localStorage.setItem('hrproject',p[0])
                })
                return ()=>(mounted=false)
                },[])

   
            
    useEffect(()=>{let mounted=true
  
        axios.get('http://72a6-106-51-81-179.ngrok.io/details',{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,},
            params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),report:'false'}
        })
        .catch((error) => {
        
            setError(true)
            setLoading(false)
          })
    .then(res=>{let mounted=true;
         if(mounted)
        { console.log(localStorage.getItem('date'))
           console.log(typeof(building),typeof(floor))
           console.log(res.data)
        console.log(res.data.map(item=>{if(item._id===building) return item.floors.map(item=>{if(item.Floor_no===floor) return item.workstations})})[building-1][(floor%10)-1])
         setWs(res.data.map(item=>{if(item._id===building) return item.floors.map(item=>{if(item.Floor_no===floor) return item.workstations})})[building-1][(floor%10)-1])
        setLoading(false)
           }
    })
    return ()=>(mounted=false);
},[])
       
useEffect(()=>{let mounted=true
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
return ()=>(mounted=false);
},[])
   
  
    const handleCancel=()=>{
        
        window.location.reload()}                   //handleconfirm

    const handleConfirm=()=>{   

        localStorage.setItem('mb','Workstations')
        if(role==='HR')
        {   
            if(wsFor!=='Self')
            {
                localStorage.setItem('mbForHr','Others')


            }
            else
            {
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

        if(role==='HR' & (seatsReserved.filter(item=>item.state===true)).length>0 & wsFor==='Team')
        {
            if(checkedMembers.length>seatsReserved.length)
            {
                toast.warning('Please select workstations',{position:"top-center",hideProgressBar: true,})
            }
            else if(seatsReserved.length>checkedMembers.length)
            {
                toast.warning("Please select project members",{position:"top-center",hideProgressBar: true,})
            }
           else {
            if(seatsReserved.length>0)
           {  var p =false

           setLoading(true)
            axios.post(`http://72a6-106-51-81-179.ngrok.io/multiple_confirmation`,{
                email:checkedMembers.map(item=>item.email),
             workstation_id:seatsReserved.map(item=>(item.number)),
             building_id:building,
                floor_id:floor,
             date:localStorage.getItem('start_date'),Date_end:localStorage.getItem('end_date')
            },{
            
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

        
    
        
        

        
       else if((role==='Project manager' | role==='HR') & wsFor==='Team')
        {  if(checkedMembers.length>seatsReserved.length)
            {
                toast.warning('Please select workstations',{position:"top-center",hideProgressBar: true,})
            }
            else if(seatsReserved.length>checkedMembers.length)
            {
                toast.warning("Please select project members",{position:"top-center",hideProgressBar: true,})
            }
           else {
            if(seatsReserved.length>0)
           { 
            let name=''
               kmembers.map(item=>{
               if(item.isbooked===true)
               {
                name=item.name
                console.log(name)
               }
           })
           console.log(name)
           console.log(teamdata)
           teamdata.map(item=>{
               if(item.name===name)
               {    
                   bname=item.building_name
                   console.log(item.name)
                   b=item.building_id;
                   f=(item.building_id*10)+item.floor_id
                   console.log(b)
                   console.log(f)
               }
               console.log(b)
               console.log(f)
           })
           if(building!==b & floor!==f)
           {
               
              
              Swal.fire({
                title: `Your team is sitting in Floor-${f%10} in ${bname} building.`,
                text: "Are you sure you don't want to sit with the team?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                confirmButtonColor:'#3CB043',
                cancelButtonColor:'#E35335',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    toast.success("Booking Successful",{position:"top-center",hideProgressBar: true,})

                    setLoading(true)
    
                            axios.post('http://72a6-106-51-81-179.ngrok.io/multiple_confirmation',{
        
                date:localStorage.getItem('start_date'),Date_end:localStorage.getItem('end_date'),
                email:checkedMembers.map(item=>item.email),
                building_id:building,
                floor_id:floor,
                workstation_id:seatsReserved.map(item=>(item.number) )
    
            },{
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
              })
           }

           else
           {
               console.log("no")
               toast.success("Booking Successful",{position:"top-center",hideProgressBar: true,})

               setLoading(true)

            axios.post('http://72a6-106-51-81-179.ngrok.io/multiple_confirmation',{
        
                date:localStorage.getItem('start_date'),Date_end:localStorage.getItem('end_date'),
                email:checkedMembers.map(item=>item.email),
                building_id:building,
                floor_id:floor,
                workstation_id:seatsReserved.map(item=>(item.number) )
    
            },{
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
        }
        else if ((role==='Project manager' | role==='HR') & wsFor==='Self')
        {
            if(workstationselectedForPm!==null)
            {
                var p =false
                console.log('Im here')
                const today='2022-03-15'
            const myemail= [localStorage.getItem('email')]
            const wsdata= [workstationselectedForPm.number]
            setLoading(true)
          axios.post('http://72a6-106-51-81-179.ngrok.io/multiple_confirmation',{
                date:localStorage.getItem('start_date'),Date_end:localStorage.getItem('end_date'),
                email:myemail,
                building_id:building,
                floor_id:floor,
                workstation_id:wsdata
    
            },{
                headers:{Authorization:`Bearer ${localStorage.getItem('token')}`,
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
                        
                         }, 1600);


         
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
    // else
    // { setLoading(true)
    //     toast.error("You have already booked a workstation on this date",{position:"top-center",hideProgressBar: true,})

    //     setTimeout(function(){
    //         setLoading(true)
    //         navigate('/manage')
              
    //            }, 1600);
       
    // }
        })
      
    
            }
            else{
                toast.warning("Please select a workstation",{position:"top-center",hideProgressbar:false})
    
            }
         
        }
        else
        {
            if(workstationselected!==null)
            { console.log("Bye")
            var p=false;
                const myemail= [localStorage.getItem('email')]
                const wsdata= [workstationselected.number]
                setLoading(true)
                axios.post('http://72a6-106-51-81-179.ngrok.io/multiple_confirmation',{    
                    date:localStorage.getItem('start_date'),Date_end:localStorage.getItem('end_date'),
                    email:myemail,
                    building_id:building,
                    floor_id:floor,
                    workstation_id:wsdata
        
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
                        
                         }, 1600);

         
                  }
           
           
                   })
                   .then(res=>{
                       
                       
                       if(p!==true){
                           
                           toast.success("Booking Successful",{position:"top-center",hideProgressBar: true,})
                          
                  
                   setTimeout(function(){
                       
                       navigate('/manage')
                         
                          }, 1400);
           
           }
        //    else
        //    { 
        //        toast.error(res.response.data.errorMsg,{position:"top-center",hideProgressBar: true,})
       
        //        setTimeout(function(){
        //            setLoading(true)
        //            navigate('/manage')
                     
        //               }, 1400);
              
        //    }
               })
          
    
            }
            else
            {
                console.log("hi")
                toast.warning("Please select a workstation",{position:"top-center",hideProgressbar:true})
            }
        }
    
        }
    


  
    function onClickSeat(seat)                                                  //When user clicks on a seat
    {
        if(role==='HR' & seat.state===true & wsFor==='Team')
        {
            let countChecked=0;
            kmembers.map(item=>item?.isChecked===true&& countChecked++)
            setCheckedvalue(countChecked);
    
            if(seatsReserved.indexOf(seat)>-1)
            {
                
                
                setSeatsreserved(seatsReserved.filter(res=>res!==seat))
            }
            else{
                if(countChecked===0)
                {
                    toast.warning("Please select the employees first",{position:"top-center",hideProgressBar: true,})
                }
                else{if(seatsReserved.length>=countChecked ){
                    toast.warning(`Sorry! You can select upto ${countChecked} seats only `,{position:"top-center",hideProgressBar: true,})
                }
                else{ setSeatsreserved(seatsReserved.concat(seat))}
            }   }

        }
        else if(seat.state===false & seat.workstation_state==='enable')
        {
            if(role==='Project manager' | role==='HR')                                                            // For Project manager 
    {
        if(wsFor==='Team')
        {
            let countChecked=0;
        kmembers.map(item=>item?.isChecked===true&& countChecked++)
        setCheckedvalue(countChecked);

        if(seatsReserved.indexOf(seat)>-1)
        {
            
            
            setSeatsreserved(seatsReserved.filter(res=>res!==seat))
        }
        else{
            if(countChecked===0)
            {
                toast.warning("Please select the employees first",{position:"top-center",hideProgressBar: true,})
            }
            else{if(seatsReserved.length>=countChecked ){
                toast.warning(`Sorry! You can select upto ${countChecked} seats only `,{position:"top-center",hideProgressBar: true,})
            }
            else{ setSeatsreserved(seatsReserved.concat(seat))}
        }   }
        }

        else                                                                   // For  Project manager -- Self
        {
           
            if(workstationselectedForPm===seat){ setWorkstationselectedForPm(null)}
            else{ setWorkstationselectedForPm(seat) }
         }  

        }
        else                                                                 // For other than Project manager
        {
            
            if(workstationselected===seat)
        {
            
            
            setWorkstationselected(null)
        }
            else{ setWorkstationselected(seat) }
            }}

        else if(seat.state===true)
        {
            toast.warning("Sorry! The seat is booked already",{position:"top-center",hideProgressBar: true,})
            console.log("hi")
        }
        else if(seat.workstation_state==='disable'){
            toast.warning("Sorry! The seat is disabled",{position:"top-center",hideProgressBar: true,})
            }
    }

    const projectdropdownSelected=(e)=>{
        setLoading(true)
        localStorage.setItem('hrproject',e.target.value)

        setSelectedproject(e.target.value)
              
    
        axios.get(`http://72a6-106-51-81-179.ngrok.io/employee/`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}` ,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
                  },
                  params:{project_name:e.target.value,sdate:localStorage.getItem('start_date'),edate:localStorage.getItem('end_date')}
            })
            .catch((error) => {
        
                setError(true)
                setLoading(false)
              })
            .then(res=>{
            
                console.log(res.data)
                    var p=res.data
                    
                
                   setkmembers(p)} )
                   
                   
                   axios.get('http://72a6-106-51-81-179.ngrok.io/Pjdata',{
                    params:{project_name:e.target.value,
                        start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date')},
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
                .then(res=>{console.log(res.data)
                    const p=(res.data)
                  setTeamdata(p)
                  console.log(p)
                  setLoading(false)
                })
    
    }
    const wsFordropdownSelected=(e)=>{
        
        setwsFor(e.target.value)
        if(e.target.value==='Team')
        {
            setLoading(true)
                  
  
    
            axios.get(`http://72a6-106-51-81-179.ngrok.io/employee/`,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    withCredentials: true,
                      },
                      params:{project_name:selectedproject,sdate:localStorage.getItem('start_date'),edate:localStorage.getItem('end_date')   }
                })
                .catch((error) => {
        
                    setError(true)
                    setLoading(false)
                  })
                .then(res=>{
                
                    console.log(res.data)
                        var p=res.data
        
                    
                       setkmembers(p)} )

                       axios.get('http://72a6-106-51-81-179.ngrok.io/Pjdata',{
                        params:{project_name:selectedproject,
                            start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date')},
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
                    .then(res=>{console.log(res.data)
                        const p=(res.data)
                      setTeamdata(p)
                      console.log(p)
                      setLoading(false)
        
                    })
        
        
        }
        }
        

const handleCheckbox=(e)=>{
    const{name,checked}=e.target;
    if(name==="selectall")
    {  
        let tempUser= kmembers.map(item=>({...item,isChecked:checked})  )
       let tempUser2=tempUser.filter(item=>item.isChecked===true)
       setCheckedmembers(tempUser2)
       setkmembers(tempUser)
    }

    else{
    let tempUser=kmembers.map(item=>item.name===name?{...item,isChecked:checked}:item)
    let tempUser2=tempUser.filter(item=>item.isChecked===true)
    setCheckedmembers(tempUser2)
    setkmembers(tempUser)
}}
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
  else{return (
      <>
          {localStorage.getItem('login')!=='true'?navigate('/login'):
<>
      
      
            <Navbar/>
          <Bccontainerw> <CustomSeparator2/> </Bccontainerw>
          

          <div>
       {     (role==='Project manager' | role==='HR') ?
     <ul className="showcase2">
         <li>
                <div className="seatna"></div>
                <small className='legend_text'>Disabled</small>
            </li>
           
            <li>
                <div className="seatbooked"></div>
                <small className='legend_text'>Booked</small>
            </li>
            <li>
                <div className="seatselected"></div>
                <small className='legend_text'>Selected</small>
            </li>
            <li>
                <div className="seatavailable"></div>
                <small className='legend_text'>Available</small>
            </li>
            
            
        </ul> :null}
        { (role!=='Project manager' & role!=='HR') ?
            <ul className="showcase">
                 <li>
                <div className="seatna"></div>
                <small className='legend_text'>Disabled</small>
            </li>
            
           
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
           
        </ul>
       :null }
        
     {(role==='Project manager' | role==='HR') ?<StyledPmContainer>

        <div className='pmflex'>
     {
       (role==='Project manager' | role==='HR') ? 
    
    <div>
       <form>
       <label>
      Choose workstation for  : <select value={wsFor} onChange={wsFordropdownSelected} >
       <option value='Self'>Self</option>
       <option value="Team">{role==='HR'?'Others':'Team'}</option>
        </select>
        </label>
        </form>
    </div>:null
    }
 
    {((role==='Project manager' | role==='HR') & wsFor==="Team" ) ? 
        <div>
            <form>
            <label>
            Select the Project : <select value={selectedproject} onChange={projectdropdownSelected} >
            {kprojects.map((item,index)=>( <option key={index}   value={item}>{item}</option>))}
            </select>
            </label>
            </form>
        </div> :null }


    { ((role==='Project manager' | role==='HR') & wsFor==="Team" ) ? 
        <div style={{marginLeft:'2%'}}>
        {
            ((role==='Project manager' | role==='HR') & wsFor==="Team" ) ? 
            <div>
                Team Members:
            </div> :null
        }
            
            <input type="checkbox" name="selectall" checked={kmembers.filter(item=>item?.isChecked !==true).length<1} disabled={kmembers.filter(item=>item.isbooked===true).length>0}  onChange={handleCheckbox}/>
            <label><Memberss>Select All</Memberss></label>

                { kmembers.map((item,index)=>(<div key={index}>
                <input  type="checkbox" name={item.name} disabled={item.isbooked} checked={item?.isChecked || false} onChange={handleCheckbox}/>
                <label><Memberss>{item.name}</Memberss></label>
                </div>))}
        </div>:null}
        

        </div>


        <StyledDivWorkstationsForPm>

            
        <table className='grid'>
            <tbody>
              <td>
                  
              { wsFor==='Team' ? ws.map( (row,index) =>
                  <Gridtd 
                    className={row.workstation_state==='disable'?'disablednothr':((row.state===true & seatsReserved.indexOf(row) < 0) ?'booked':(seatsReserved.indexOf(row) > -1? 'reserved': 'available'))}
                    
                    key={index} onClick = {e => onClickSeat(row)}>
                      <h1 className='wsbox'>{index+1}</h1> </Gridtd>) :null}
              { wsFor==='Self' ? ws.map( (row,index) =>
                  <Gridtd 
                    className={row.workstation_state==='disable'?'disablednothr':(row.state===true ?'booked':(workstationselectedForPm===row? 'reserved': 'available'))}
                    
                    key={index} onClick = {e => onClickSeat(row)}>
                       <h1 className='wsbox'>{index+1}</h1>  </Gridtd>) :null}
                  
              </td>
          </tbody>

        </table>
        </StyledDivWorkstationsForPm>
        <div className='savedinfo'>
                <h2>Selected Information </h2>
                <div className='savedinfo1'>
                <h4>Building : {localStorage.getItem("building_name")}</h4>
                <h4>Floor    : {localStorage.getItem("floor_name")}</h4>
                <h4>From    : {localStorage.getItem("start_date").substring(8)}{localStorage.getItem("start_date").charAt(7)}{localStorage.getItem("start_date").substring(5,8)}{localStorage.getItem("start_date").substring(0,4)}</h4>
                <h4>To    : {localStorage.getItem("end_date").substring(8)}{localStorage.getItem("end_date").charAt(7)}{localStorage.getItem("end_date").substring(5,8)}{localStorage.getItem("end_date").substring(0,4)}</h4>
                </div>
       </div>
        
        <div className='buttons_container_ws_pm'>
        <button className='button_ws_cancel' onClick={handleCancel}>Cancel</button>
        <button className='button_ws_confirm' onClick={handleConfirm}>Confirm</button>
    </div>

      {console.log(wsFor)}
      
     

        </StyledPmContainer>:null}

        {(role!=='Project manager' & role!=='HR') ?<StyledContainerNotPm>
    
    
       <StyledDivWorkstationsNotPm>
       <table className='grid'>
           <tbody>
             <td>
                 
              {ws.map( (row,index) =>
                 <Gridtd 
                   className={row.workstation_state==='disable'?'disabled':(row.state===true ?'booked':((workstationselected===row)? 'reserved': 'available'))}
                   
                   key={index} onClick = {e => onClickSeat(row)}>
                       <h1 className='wsbox'>{index+1}</h1> </Gridtd>) }
                 
             </td>
         </tbody>

       </table>

       
       </StyledDivWorkstationsNotPm>
       <div className='savedinfo'>
                <h2>Selected Information </h2>
                <div className='savedinfo1'>
                <h4>Building : {localStorage.getItem("building_name")}</h4>
                <h4>Floor    : {localStorage.getItem("floor_name")}</h4>
                <h4>From    : {localStorage.getItem("start_date").substring(8)}{localStorage.getItem("start_date").charAt(7)}{localStorage.getItem("start_date").substring(5,8)}{localStorage.getItem("start_date").substring(0,4)}</h4>
                <h4>To    : {localStorage.getItem("end_date").substring(8)}{localStorage.getItem("end_date").charAt(7)}{localStorage.getItem("end_date").substring(5,8)}{localStorage.getItem("end_date").substring(0,4)}</h4>
                </div>
       </div>

       
    <div className='buttons_container_ws'>
        <button className='button_ws_cancel' onClick={handleCancel}>Cancel</button>
        <button className='button_ws_confirm' onClick={handleConfirm}>Confirm</button>
    </div>
       </StyledContainerNotPm>:null}
        
       
        

        </div>
           <ToastContainer/>
           </>}
    </>
  )}
    }
}

export default Wspmpage