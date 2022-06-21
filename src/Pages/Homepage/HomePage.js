import React from 'react'
import { useEffect ,useState} from 'react';
import {useNavigate,Navigate} from "react-router-dom"
import "../../Pages/Homepage/HomePage.css";
import HomepageContainer from '../../Pages/Homepage/HomepageContainer';
import { FaBan, FaGreaterThan, FaRegEdit,FaFileUpload,FaSignal} from 'react-icons/fa';
import logo from '../../logo (1).png'
import HomepageContainerhr from '../../Pages/Homepage/HomepageContainerhr';
import '../../App.css';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer,toast } from 'react-toastify'
import Swal from 'sweetalert2';
import { Navbar } from '../Navbar/Navbar';
import welcome from '../../Assets/Welcome.png'
import Upcoming from './Upcoming';
import Upcoming_meeting from './Upcomin_meeting';
import errorimage from '../../components/errorimage.png'



localStorage.setItem('edit',false)
localStorage.setItem('start_time','09:00')
localStorage.setItem('end_time','10:00')

function Homepage() {


const [loading, setLoading] = useState(true);
const [upcoming_workstations,set_upws]=useState([]);
const [upcoming_meetingrooms,set_upmr]=useState([]);
const [error,setError]=useState(false)


localStorage.setItem('mb','Workstations')
// var currentDate_ = new Date(new Date().getTime());
// var currentDate_ = new Date(new Date().getTime());
var currentDate_ = new Date(new Date().getTime() );
const date_today=(currentDate_).toISOString().split('T')[0]

var TomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
const Tomorrow_date=(TomorrowDate).toISOString().split('T')[0]

localStorage.setItem('start_date',Tomorrow_date)
localStorage.setItem('end_date',Tomorrow_date)

useEffect(()=>{axios.get('http://72a6-106-51-81-179.ngrok.io/on_dateRoom?',{
    params:{
        date:date_today},
    headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        withCredentials: true,
      }
})
.catch((error) => {
  
        
  setError((error)=>true)
  setLoading(false)
  
})
.then(res=>{console.log(res.data)
  set_upmr(res.data)
  setLoading(false)


  
    
})
axios.get('http://72a6-106-51-81-179.ngrok.io/on_dateWorkstation?',{
    params:{
        date:date_today},
    headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        withCredentials: true,
      }
})
.catch((error) => {
  setError((error)=>true)
  setLoading(false)


  
})
.then(res=>{console.log(res.data)
  set_upws(res.data)
  setLoading(false)

  
    
})
const loadData = async () => {

  await new Promise((r) => setTimeout(r, 2000));
  // setLoading((loading) => !loading);
};
  loadData();


},[])




  let navigate=useNavigate()
  const handleCClick=()=>  {
    localStorage.setItem('meeting_status','false');
    localStorage.setItem('editteam',false)
     navigate('/building')
  }
  const handleInClick=()=>{

    navigate('/reports')

  }

  const handleCBClick=()=>{
    localStorage.setItem('meeting_status','true')
    localStorage.setItem('editteam',false)
    navigate('/building')
  }
  const handleUClick=()=>{
    localStorage.setItem('meeting_status','true');
    navigate('/database')
  }
const handleMClick=()=>
{
  localStorage.setItem('mbFor','Self')
  localStorage.setItem('mbForHr','Self')
  localStorage.setItem('start_date',date_today)
  localStorage.setItem('end_date',date_today)
  localStorage.setItem('hrproject','All')
  navigate('/manage')
}
const handleEClick=()=>
{
  navigate('/buildinged')
}
const lg=()=>
{
  Swal.fire({
    title: 'Are you sure?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: 'grey',
    confirmButtonText: 'Yes, Logout'
  }).then((result) => {
    if (result.isConfirmed) {
      
      
      console.clear();

  window.localStorage.clear(); //clear all localstorage
    localStorage.clear();
    localStorage.setItem('login',false)

    sessionStorage.clear();
    sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('lastName');
        sessionStorage.removeItem('id');

  let path='/login'
  return(navigate(path))


    }
  })

  
  
}

if(loading){

  return (
    <>
    <ToastContainer/>
  <div className='loading_pos'>
    <ClipLoader size={'100px'} className='clip_pos'/>
    <img src={logo} height='auto' />
  </div></>)

}
else{

  if(error===true)
  {
    console.log(error)



  return (
    <>
    <Navbar/>
    <img className='error_image' src={errorimage}/>
    <h1 className='error_message'>Oops network failed.Please try reloading the page!</h1>
    </>


  )
  }

else {  
  console.log(error)
  return (
 
<>
{localStorage.getItem('login')!=='true'?navigate('/login'):
    <>
         

        <Navbar/>

        <div className='main_message'>
        <h1 >Welcome {(localStorage.getItem("name").charAt(0)).toUpperCase()}{localStorage.getItem("name").substring(1,localStorage.getItem("name").indexOf(' '))}</h1>
        </div>

        <div className='welcome_image'>
          <img src={welcome}  alt="login"/>
        </div> 

        <div className='upcoming_events'>
        
          {/* <h1 className='upcoming_header'>Upcoming Bookings </h1> */}
          {/* <h1 className='upcoming_header'>Today</h1> */}
          {/* <h1 className='upcoming_header'>Workstation Number 21 at Pasta Street 2nd Floor </h1> */}
          {/* <h1 className='upcoming_header'>Meeting room 1 at Pasta Street 2nd Floor </h1> */}

        </div>
        <div>
          <Upcoming>
          <h1 className='upcoming_header'>Upcoming Workstation Bookings </h1>
          {
          upcoming_workstations.length===0 ?
                    <h1 className='upcoming_body'>No Bookings for Today and Tomorrow </h1>
            :null
          }
          {
          upcoming_workstations.length===1 ?
          <h1 className='upcoming_body'>Workstation Number {upcoming_workstations[0].workstation_id} at {upcoming_workstations[0].building_name},{upcoming_workstations[0].floor_name} on {upcoming_workstations[0].date} </h1>

            :null
          }
          {
          upcoming_workstations.length >1 ?
          <>
          <h1 className='upcoming_body'>Workstation Number {upcoming_workstations[0].workstation_id} at {upcoming_workstations[0].building_name},{upcoming_workstations[0].floor_name} on {upcoming_workstations[0].date} </h1>
          <h1 className='upcoming_body'>Workstation Number {upcoming_workstations[1].workstation_id} at {upcoming_workstations[1].building_name},{upcoming_workstations[1].floor_name} on {upcoming_workstations[1].date} </h1>
          </>
            :null
          }

          </Upcoming>
        </div>

        <div>
          <Upcoming_meeting>
          {/* <h1 className='upcoming_header'>Upcoming Meeting Room Bookings </h1> */}
          {/* <h1 className='upcoming_body'>Workstation Number {upcoming_workstations[0].workstation_id} at {upcoming_workstations[0].building_name},{upcoming_workstations[0].floor_name} on {upcoming_workstations[0].date} </h1> */}
          {/* <h1 className='upcoming_body'>Meeting room 1 at Main, 2nd Floor on 26-05-2022  */}
          {/* <br/>from 9:00 to 10:00</h1>  */}
          <h1 className='upcoming_header'>Upcoming Meeting Room Bookings </h1>
          {
          upcoming_meetingrooms.length===0 ?
                    <h1 className='upcoming_body'>No Bookings for Today and Tomorrow </h1>
            :null
          }
          {
          upcoming_meetingrooms.length===1 ?
          <h1 className='upcoming_body'>Meeting Room {upcoming_meetingrooms[0].conf_room} at {upcoming_meetingrooms[0].buildingName}, {upcoming_meetingrooms[0].floorName} on {upcoming_meetingrooms[0].start_date} 
          <br/> from {upcoming_meetingrooms[0].start_time} to {upcoming_meetingrooms[0].end_time} </h1>

            :null
          }
          {
          upcoming_meetingrooms.length >1 ?
          <>
          <h1 className='upcoming_body'>Meeting Room {upcoming_meetingrooms[0].conf_room} at {upcoming_meetingrooms[0].buildingName}, {upcoming_meetingrooms[0].floorName} on {upcoming_meetingrooms[0].start_date} 
          <br/> from {upcoming_meetingrooms[0].start_time} to {upcoming_meetingrooms[0].end_time} </h1>
          <h1 className='upcoming_body'>Meeting Room {upcoming_meetingrooms[1].conf_room} at {upcoming_meetingrooms[1].buildingName}, {upcoming_meetingrooms[1].floorName} on {upcoming_meetingrooms[1].start_date} 
          <br/> from {upcoming_meetingrooms[1].start_time} to {upcoming_meetingrooms[1].end_time} </h1>
          </>
            :null
          }





          </Upcoming_meeting>
        </div>

    

     { localStorage.getItem('role') !=="HR" && <HomepageContainer>
       <h1 className='box_header_new'> Booking Options</h1>   
      <div className='button_display_emp'>
      <button data-testid='workstationbooking' className='button' onClick={handleCClick}> Book Workstation  <FaGreaterThan className='icon'/></button>
      <button className='button' onClick={handleCBClick}>Book Meeting Room  <FaGreaterThan className='icon'/></button>
      <button className='button' onClick={handleMClick}>View / Manage Bookings <FaRegEdit className='icon'/></button> 
      </div>
      </HomepageContainer>
      }
           
      {localStorage.getItem('role')==="HR" && <HomepageContainerhr>     
      <h1 className='box_header_new'>Booking Options</h1>
      <div className='button_display_hr'>
      <button className='button_hr' onClick={handleCClick}>Book Workstation  <FaGreaterThan className='icon'/></button>
      <button className='button_hr' onClick={handleCBClick}>Book Meeting Room <FaGreaterThan className='icon'/></button>
      <button className='button_hr' onClick={handleMClick}>View / Manage Bookings <FaRegEdit className='icon'/></button>
      <button className='button_hr' onClick={handleEClick}>Enable/Disable <FaBan className='icon'/> </button>
      <button className='button_hr' onClick={handleUClick}>File Upload <FaFileUpload className='icon'/> </button>
      <button className='button_hr'onClick={handleInClick}>Insights <FaSignal className='icon'/> </button>

      </div>
      </HomepageContainerhr>
      }
      </>}
    </>
  )}
    }
}

export default Homepage