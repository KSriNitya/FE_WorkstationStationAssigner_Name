import React, { useState,useEffect } from 'react'
import { StyledFloor1Button,StyledFloor2Button,StyledFloor3Button, StyledEnableButton1, StyledEnableButton2, StyledEnableButton3} from '../../Pages/Floorpage/FloorpageButtons.styled'
import { useNavigate } from 'react-router-dom'
import FloorpageContainer from '../../Pages/Floorpage/FloorpageContainer'
import { ButtonLabel, StyledHeader } from "../../components/Header.styled";
import logo from '../../logo (1).png'
import '../../Pages/Floorpage/Floorpage.css'
import {FaLevelUpAlt} from 'react-icons/fa';
import FloorpageContainerHr from '../../Pages/Floorpage/FloorpageContainerHr'
import Bccontainerf from '../../Pages/Floorpage/BreadcrumbscontainerF'
import CustomSeparator2 from '../../Pages/Floorpage/Breadcrumbsfloor'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer,toast } from 'react-toastify'
import { Navbar } from '../Navbar/Navbar'
import flooricon from '../../flooricon4.png'
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import errorimage from '../../components/errorimage.png'





function Floorpage() {

     let navigate=useNavigate()
     const [loading, setLoading] = useState(true);
     const [confirmdata,setConfirmData]=useState(JSON.parse(localStorage.getItem('editdata')))

     const editnames=JSON.parse(localStorage.getItem('editnames')) 
    const[ed1,setEd1]=useState(true)
    const[ed2,setEd2]=useState(true)
    const[ed3,setEd3]=useState(true)
    const edit=localStorage.getItem('edit')
    const editteam=localStorage.getItem('editteam')
    const nbuilding=localStorage.getItem('building')
    const building=parseInt(nbuilding)
  const [error,setError]=useState(false)
    const role=localStorage.getItem('role')
    const [floors,setFloors]=useState([])
    const [cfloors,setcFloors]=useState([])
    const editbid=JSON.parse(localStorage.getItem('editbid'))
    
      const editfid=JSON.parse(localStorage.getItem('editfid'))



 if( localStorage.getItem('meeting_status')==='false'){
  
 }
useEffect(()=>{let mounted=true
  if( localStorage.getItem('meeting_status')==='false'){

    
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
      { console.log(localStorage.getItem('building'))
         console.log(res.data)
      var p=localStorage.getItem('building');
     
       setFloors(res.data.filter(item=>(item._id==p))[0].floors)
       setLoading(false)
       console.log(res.data.filter(item=>(item._id==p))[0].floors)
      
         }
  })
  }
  else{
    
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
 console.log(localStorage.getItem('building'))
    console.log(res.data)
 var p=localStorage.getItem('building');
 console.log(p)

  setFloors(res.data.filter(item=>(item._id==p))[0].floors)
  setLoading(false)
  console.log(res.data)
  console.log(res.data.filter(item=>(item._id==p))[0].floors)
 
    
})

  }

return ()=>(mounted=false);
},[])



    
    const handleF1click=(item)=>{
   
   
     if(item.floor_state!=='disable')
     {
      localStorage.setItem('floor',item.Floor_no)
      localStorage.setItem('floor_name',item.floor_name)
      console.log(localStorage.getItem('edit')==='true')
      if(localStorage.getItem('edit')==='true'&localStorage.getItem('meeting_status')==='true')
      {
        console.log("hi")
        navigate('/cf')
      }
      else if(localStorage.getItem('meeting_status')==='true')
      {
        

        if(item.total_no_of_meeting_rooms===0)
        {
          toast.warning('Sorry, There are no meeting rooms in this floor',{position:"top-center",hideProgressBar: true,})


        }
        else
        {
          console.log("Hi")
        navigate('/cf')

        }
      }
      else if(localStorage.getItem('editteam')==='true')
      { 
        
        navigate('/wsedit')

       }
       else
       {
         console.log("Hi")
          navigate('/workstation')
       }
      
      }
      else
      {
        toast.warning('Sorry, The floor is disabled',{position:"top-center",hideProgressBar: true,})

      }
            
    }

    if(loading){
        return (
        <div className='loading_pos'>
          <ClipLoader size={'100px'} className='clip_pos'/>
          <img src={logo} height='auto' />
      
        </div>)
      
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
 

else{  return (
    <>
    {localStorage.getItem('login')!=='true'?navigate('/login'):
<>
   
      

            <Navbar/>
         <Bccontainerf>
            <CustomSeparator2 />
         </Bccontainerf>
         <ul className="showcase">
            
            <li>
                   <div className="seatna"></div>
                   <small className='legend_text'>Disabled</small>
               </li>
               <li>
                   <div className="previously_selected"></div>
                   <small className='legend_text'>Previuosly Selected</small>
               </li>
   
               <li>
                   <div className="seatavailable"></div>
                   <small className='legend_text'>Available</small>
               </li>
           </ul>

            
        <FloorpageContainer>
        <h1 className='box_header_building'>{localStorage.getItem('building_name')}{" "}(Floors)</h1>
            <div className='buttons_floor_container'>
                    
                    {editteam!=='true'?floors.map((item,index)=><Tippy content={item.floor_state==='disable'?'No Projects':(item.projects===null?'No Projects':item.projects)}><button className= {(item.floor_state!=='enable')?'button_floor_disable':(editteam==='true') ? (editbid===building & editfid===item.Floor_no?'button_floor_edit':'button_floor'):'button_floor'} key={index}  onClick={e=>handleF1click(item)}>
                    {(item.floor_state==='enable')&&<img src={flooricon} width="100px" height="100px" className='imgpos'/>}
                    {item.floor_state==='enable'&& <marquee><small className='sliding_text'>Projects: {item.projects!==null?item.projects:'None'}</small></marquee>}
                    {item.floor_name}
              
                    {(item.floor_state==='enable')?(localStorage.getItem('meeting_status')==='false'?<p1 className='available_tag'>Workstations : {item.no_of_workstations}/{item.total_no_of_workstations}</p1>:
         <p1 className='available_tag'>Meeting Rooms : {item.total_no_of_meeting_rooms!==0?(item.available_no_of_meeting_rooms+'/'+item.total_no_of_meeting_rooms):'NA'}</p1>):<div><p className='disabled_tag'>Reason:</p><p style={{fontSize:'18px',color:"white"}}>{item.reason_for_disabling}</p></div>}
                    </button></Tippy>):(localStorage.getItem('editteam')!=='true'?floors.map((item,index)=><Tippy content={(editbid.includes(building) & editfid.includes(item.Floor_no))?(confirmdata.filter(val=>(val.building_id*10)+val.floor_id===item.Floor_no).map(val=>{if(confirmdata[confirmdata.length-1].name!==val.name){return val.name+',' }else return val.name})):'No team members present'}><button className= {(item.floor_state!=='enable')?'button_floor_disable':(editteam==='true') ? (editbid.includes(building) & editfid.includes(item.Floor_no)?'button_floor_edit':'button_floor'):'button_floor'} key={index}  onClick={e=>handleF1click(item)}>
                    {(item.floor_state==='enable')&&<img src={flooricon} width="100px" height="100px" className='imgpos'/>}
                    {item.floor_name}
                    {(item.floor_state==='enable')?(localStorage.getItem('meeting_status')==='false'?<p1 className='available_tag'>Workstations : {item.no_of_workstations}/{item.total_no_of_workstations}</p1>:
         <p1 className='available_tag'>Meeting Rooms : {item.total_no_of_meeting_rooms!==0?(item.available_no_of_meeting_rooms+'/'+item.total_no_of_meeting_rooms):'NA'}</p1>):<div><p className='disabled_tag'>Reason:</p><p style={{fontSize:'18px',color:"white"}}>{item.reason_for_disabling}</p></div>}

                    
                    </button></Tippy>):(localStorage.getItem('meeting_status')==='true'?floors.map((item,index)=><Tippy content={item.floor_state==='disable'?'No Projects':(item.projects===null?'No Projects':item.projects)}><button className= {(item.floor_state!=='enable')?'button_floor_disable':(editteam==='true') ? (editbid===building & editfid===item.Floor_no?'button_floor_edit':'button_floor'):'button_floor'} key={index}  onClick={e=>handleF1click(item)}>
                    {(item.floor_state==='enable')&&<img src={flooricon} width="100px" height="100px" className='imgpos'/>}
                    {item.floor_state==='enable'&& <marquee><small className='sliding_text'>Projects: {item.projects!==null?item.projects:'None'}</small></marquee>}
                    

                    {item.floor_name}
                    {(item.floor_state==='enable')?(localStorage.getItem('meeting_status')==='false'?<p1 className='available_tag'>Workstations : {item.no_of_workstations}/{item.total_no_of_workstations}</p1>:
         <p1 className='available_tag'>Meeting Rooms : {item.total_no_of_meeting_rooms!==0?(item.available_no_of_meeting_rooms+'/'+item.total_no_of_meeting_rooms):'NA'}</p1>):<div><p className='disabled_tag'>Reason:</p><p style={{fontSize:'18px',color:"white"}}>{item.reason_for_disabling}</p></div>}

                    </button></Tippy>):floors.map((item,index)=><Tippy content={(editbid.filter(item=>item===building)[0]===building & editfid.filter(row=>row==item.Floor_no)[0]==item.Floor_no)?(confirmdata.filter(val=>((val.building_id*10+val.floor_id)===item.Floor_no)).map(val=>{if(confirmdata[confirmdata.length-1].name!==val.name){return val.name+',' }else return val.name})):'No team members present'}><button className= {(item.floor_state!=='enable')?'button_floor_disable':(editteam==='true') ? (editbid.includes(building) & editfid.includes(item.Floor_no)?'button_floor_edit':'button_floor'):'button_floor'} key={index}  onClick={e=>handleF1click(item)}>
                    {(item.floor_state==='enable')&&<img src={flooricon} width="100px" height="100px" className='imgpos'/>}
                    {item.floor_state==='enable'&& <marquee><small className='sliding_text'>Projects: {item.projects!==null?item.projects:'None'}</small></marquee>}
                   
                    {item.floor_name}
                    {(item.floor_state==='enable')?(localStorage.getItem('meeting_status')==='false'?<p1 className='available_tag'>Workstations : {item.no_of_workstations}/{item.total_no_of_workstations}</p1>:
         <p1 className='available_tag'>Meeting Rooms : {item.total_no_of_meeting_rooms!==0?(item.available_no_of_meeting_rooms+'/'+item.total_no_of_meeting_rooms):'NA'}</p1>):<div><p className='disabled_tag'>Reason:</p><p style={{fontSize:'18px',color:"white"}}>{item.reason_for_disabling}</p></div>}
                    </button></Tippy>)))}
            </div>
            </FloorpageContainer>
            <ToastContainer/>
            </>}
    </>
  )}
                }
}

export default Floorpage