import React,{useState,useEffect} from 'react' 
import BuildingpageContainer from '../../Pages/Buildingspage/BuildingPageContainer'
import axios from 'axios';
import {Link, useNavigate}from 'react-router-dom'
import "../../Pages/Buildingspage/BuildingPage.css";
import Datepage from '../../Pages/Buildingspage/Datepage'
import logo from '../../logo (1).png'
import Hpcntr from '../../Pages/Buildingspage/BreadcrumbsContainerB'
import CustomSeparator from '../../Pages/Buildingspage/BreadcrumbsBp'
import Datep from '../../Pages/Buildingspage/Datep'
import "../../App.css"
import Rdp from './Rdp';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer,toast } from 'react-toastify'
import DateContainer from './DateContainer';
import { Navbar } from '../Navbar/Navbar';
import { Context2 } from "../ManageBooking/managebooking";
import bd2 from '../../Assets/building5.png'
import Daterange from '../daterange/Daterange';
import TimePickerTest from '../daterange/Timepicker';
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css'
import errorimage from '../../components/errorimage.png'
export const Context=React.createContext()

function BuildingPage(){

      const [loading, setLoading] = useState(true);
      const edit=localStorage.getItem('edit')
      const editteam=localStorage.getItem('editteam')
      const editnames=JSON.parse(localStorage.getItem('editnames'))
      const editbid=JSON.parse(localStorage.getItem('editbid'))
      const [buildingprojects,setBuildingProjects]=useState([])
      const [confirmdata,setConfirmData]=useState(JSON.parse(localStorage.getItem('editdata')))
      let navigate=useNavigate()
      const[buildings,setBuildings]=useState([])
      const[meetbuildings,setmeetBuildings]=useState([])
      const [error,setError]=useState(false)
   


    useEffect(()=>{
      const edit=localStorage.getItem('edit')
    
      console.log(edit)
      const d1=localStorage.getItem('start_date')
      const d2=localStorage.getItem('end_date')
      const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
      const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
      let mounted=true
   
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
        .then(res=>{let mounted=true;
          if(mounted)
         { 
           console.log(res)
            console.log('non edited')
         let p=res.data;
          console.log(res.data)
          setBuildings(res.data)
          setLoading(false)
         
            }})
          
    
    return ()=>(mounted=false);
    },[])



    

    const handleB5click=(item)=>{

      if(localStorage.getItem('start_time')<localStorage.getItem('end_time'))
      {
     if(item.building_state !=='disable')
        {console.log(item._id)
        localStorage.setItem('building',item._id)
        localStorage.setItem('building_name',item.name)
        let path='/floor'
        navigate(path)}
        else{
          toast.warning('Sorry, The building is disabled',{position:"top-center",hideProgressBar: true,})
        }}
        else{
          toast.warning('Start time should be less than end time ',{position:"top-center",hideProgressBar: true,})
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
           
    

else{
  console.log(error)

return(
    <>
    {console.log(error)}
    {localStorage.getItem('login')!=='true'?navigate('/login'):
    <Context.Provider value={setBuildings}>
   
            <Navbar/>
          <Hpcntr>
              <CustomSeparator />
            </Hpcntr>

          
          {localStorage.getItem('editteam')==='false'?<Daterange/>:null}
          

   
    
    

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
        

    <BuildingpageContainer>
    <h1 className='box_header_building'>Building Options</h1>
    
     <div className='buttons_container'>
        
         {editteam!=='true'?buildings.map((item,index)=><Tippy content={item.building_state==='disable'?'No Projects':(item.projects===null?'No Projects':item.projects)}><button className= {(item.building_state!=='enable')?'button_building_disable':(editteam==='true')? (editbid===item._id?'button_building_edit':'button_building'):'button_building'} key ={index}   onClick={e=>handleB5click(item)}>
         <img src={bd2} width="120px" height="85px" className='imgpos'/>
         {item.name}
         {item.building_state==='enable'&&<marquee><small className='sliding_text'>Projects: {item.projects!==null?item.projects:'None'}</small></marquee>}

         {(item.building_state==='enable')?(localStorage.getItem('meeting_status')==='false'?<p1 className='available_tag'>Workstations : {item.no_of_workstations}/{item.total_no_of_workstations}</p1>:
         <p1 className='available_tag'>Meeting Rooms : {item.available_no_of_meeting_rooms}/{item.total_no_of_meeting_rooms}</p1>):<div><p className='disabled_tag'>Reason:</p><p style={{fontSize:'18px',color:"#dce0dc"}}>{item.reason_for_disabling_building}</p></div>}
        
         
         </button></Tippy>):(localStorage.getItem('editteam')==='true'&localStorage.getItem('meeting_status')==='false'?buildings.map((item,index)=><Tippy content={editbid.includes(item._id)?(confirmdata.filter(val=>val.building_id===item._id).map(val=>{if(confirmdata[confirmdata.length-1].name!==val.name){return val.name+',' }else return val.name})):'No team members present'}><button className= {(item.building_state!=='enable')?'button_building_disable':(editteam==='true')? (editbid.includes(item._id)?'button_building_edit':'button_building'):'button_building'} key ={index}   onClick={e=>handleB5click(item)}>
         <img src={bd2} width="120px" height="85px" className='imgpos'/>
         {item.name}

         {(item.building_state==='enable')?<p1 className='available_tag'>Workstations : {item.no_of_workstations}/{item.total_no_of_workstations}</p1>:<div><p className='disabled_tag'>Reason:</p><p style={{fontSize:'18px',color:"#dce0dc"}}>{item.reason_for_disabling_building}</p></div>}
         
         </button></Tippy>):(localStorage.getItem('meeting_status')==='true'?buildings.map((item,index)=><Tippy content={item.building_state==='disable'?'No Projects':(item.projects===null?'No Projects':item.projects)}><button className= {(item.building_state!=='enable')?'button_building_disable':(editteam==='true')? (editbid===item._id?'button_building_edit':'button_building'):'button_building'} key ={index}   onClick={e=>handleB5click(item)}>
         <img src={bd2} width="120px" height="85px" className='imgpos'/>
         {item.name}
         {item.building_state==='enable'&&<marquee><small className='sliding_text'>Projects: {item.projects!==null?item.projects:'None'}</small></marquee>}

         {(item.building_state==='enable')?<p1 className='available_tag'>Meeting Rooms : {item.available_no_of_meeting_rooms}/{item.total_no_of_meeting_rooms}</p1>:<div><p className='disabled_tag'>Reason:</p><p style={{fontSize:'18px',color:"#dce0dc"}}>{item.reason_for_disabling_building}</p></div>}
         
         </button></Tippy>):buildings.map((item,index)=><Tippy content={item.building_state==='disable'?'No Projects':(item.projects===null?'No Projects':item.projects)}><button className= {(item.building_state!=='enable')?'button_building_disable':(editteam==='true')? (editbid.includes(item._id)?'button_building_edit':'button_building'):'button_building'} key ={index}   onClick={e=>handleB5click(item)}>
         <img src={bd2} width="120px" height="85px" className='imgpos'/>
         {item.building_state==='enable'&&<marquee><small className='sliding_text'>Projects: {item.projects!==null?item.projects:'None'}</small></marquee>}
         {item.name}
         {(item.building_state==='enable')?(localStorage.getItem('meeting_status')==='false'?<p1 className='available_tag'>Workstations : {item.no_of_workstations}/{item.total_no_of_workstations}</p1>:
         <p1 className='available_tag'>Meeting Rooms : {item.available_no_of_meeting_rooms}/{item.total_no_of_meeting_rooms}</p1>):<div><p className='disabled_tag'>Reason:</p><p style={{fontSize:'18px',color:"#dce0dc"}}>{item.reason_for_disabling_building}</p></div>}
         
         </button></Tippy>)))}

        

         

         
     </div>
     
     </BuildingpageContainer>
     {localStorage.getItem('meeting_status')==='true' &   localStorage.getItem('editteam')==='false'?<TimePickerTest/>:''}

   
        </Context.Provider>  
        
        }
          <ToastContainer/>
    </>
    )}
        }
  }
        export default BuildingPage