import React from 'react'
import { StyledContainerNotPm } from './Divisions.styled'
import { StyledDivWorkstationsNotPm } from './Divisions.styled'
import { Gridtd, Memberss } from './Table.styled'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import logo from '../../../logo (1).png'
import Bccontainerw from './Bccontainerw'
import CustomSeparatorWed from './breadcrumbsedit'
import ClipLoader from "react-spinners/ClipLoader";
import CustomSeparatorEdit from './breadcrumbsedit'
import { Navbar } from '../../Navbar/Navbar'
import errorimage from '../../../components/errorimage.png'




function Wsedit() { 
    const nbuilding=localStorage.getItem('building')
    const nfloor=localStorage.getItem('floor')
        const building=parseInt(nbuilding)
        const floor=parseInt(nfloor)
        const role=localStorage.getItem('role')

const wsedit=JSON.parse(localStorage.getItem('editdata')).filter(item=>item.building_id===building&item.floor_name===localStorage.getItem('floor_name')).map(item=>item.workstation_id)
localStorage.setItem('editwid',wsedit)
    const [loading, setLoading] = useState(true);
    const [error,setError]=useState(false)
    const [kmembers,setkmembers]=useState([])
    const [checkedMembers,setCheckedmembers]=useState([])
const k=567
console.log(k.length)
    const edit=localStorage.getItem('edit')
var [checkedvalue,setCheckedvalue]=useState(0);
const myemail= localStorage.getItem('editemail')

    const [ws,setWs]=useState([])
        const[seatsReserved,setSeatsreserved]=useState([])

    const[workstationselected,setWorkstationselected]=useState(null)
   
        
      const editbid=JSON.parse(localStorage.getItem('editbid'))
    
      const editnames=JSON.parse(localStorage.getItem('editnames'))
      const editfid=JSON.parse(localStorage.getItem('editfid'))
    const d1=localStorage.getItem('start_date')
    const d2=localStorage.getItem('end_date')
    const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
    const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
        
console.log(building)
console.log(floor)
let navigate=useNavigate()
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
        { 
          console.log(res.data)
        console.log(res.data.map(item=>{if(item._id===building) return item.floors.map(item=>{if(item.Floor_no===floor) return item.workstations})})[building-1][(floor%10)-1])
         setWs(res.data.map(item=>{if(item._id===building) return item.floors.map(item=>{if(item.Floor_no===floor) return item.workstations})})[building-1][(floor%10)-1])
        setLoading(false)
           }
    })
    return ()=>(mounted=false);
},[])

// useEffect(()=>{
//     axios.get(`http://72a6-106-51-81-179.ngrok.io/employee/`,{
//         headers:{
//             Authorization:`Bearer ${localStorage.getItem('token')}` ,
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json',
//         withCredentials: true,
//           },
//           params:{project_name:localStorage.getItem('editproject'),date:localStorage.getItem('editdate')}
//     })
//     .then(res=>{
    
//         console.log(res.data)
//             var p=res.data
        
//            setkmembers(p)} )

// },[])




const handleConfirm=()=>{

    localStorage.setItem('mb','Workstations')
    // if(role==='HR')
    // {   
    //     if(wsFor!=='Self')
    //     {
    //         localStorage.setItem('mbForHr','Others')


    //     }
    //     else
    //     {
    //         localStorage.setItem('mbForHr','Self')


    //     }
    // }
    // if(role==='Project manager')
    // {
    //     if(wsFor!=='Self')
    //     {
    //         localStorage.setItem('mbFor',wsFor)


    //     }
    //     else
    //     {
    //         localStorage.setItem('mbFor','Self')


    //     }

       


    // }
    if(localStorage.getItem('editteam')!=='true')
    {
        if(workstationselected!==null)
           
    {  var p=false
    setLoading(true)
         axios.put(`http://72a6-106-51-81-179.ngrok.io/Edit2`,{
            email:myemail,
          workstation_id:workstationselected.number,
          date:localStorage.getItem('editdate')
      },{
        params:{
            email:myemail,
          workstation_id:workstationselected.number,
          date:localStorage.getItem('editdate')
      },
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
                 toast.success("Edit Successful",{position:"top-center",hideProgressBar: true,})
                
        
         setTimeout(function(){
             setLoading(true)
             navigate('/manage')
               
                }, 1400);
 
 }
 else
 { setLoading(true)
     toast.error("Booking Failed",{position:"top-center",hideProgressBar: true,})

     setTimeout(function(){
         setLoading(true)
         navigate('/manage')
           
            }, 1600);
    
 }
     })
      
   

    localStorage.setItem('edit',false)
    setLoading(true)

    }
    else
    {
        console.log("hi")
        toast.warning("Please select a workstation",{position:"top-center",hideProgressbar:true})
    }
}
    else
    {
        if(checkedvalue>seatsReserved.length)
        {
            toast.warning('Please select workstations',{position:"top-center",hideProgressBar: true,})
        }
        
       else {
        if(seatsReserved.length!==0)
        {
            var p=false
            const editdates=JSON.parse(localStorage.getItem('editdata')).map(item=>item.date)
            console.log(JSON.parse(localStorage.getItem('editmail')))
            axios.put(`http://72a6-106-51-81-179.ngrok.io/Edit`,{
            email:JSON.parse(localStorage.getItem('editmail')),
            date:localStorage.getItem('editdate'),
            date_end:localStorage.getItem('editdate') , 
             workstation_id:seatsReserved.map(item=>(item.number))


          
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
                 toast.success("Edit Successful",{position:"top-center",hideProgressBar: true,})
                
        
         setTimeout(function(){
             setLoading(true)
             navigate('/manage')
               
                }, 1400);
 
 }
 else
 { setLoading(true)
     toast.error("You have already booked a workstation on this date",{position:"top-center",hideProgressBar: true,})

     setTimeout(function(){
         setLoading(true)
         navigate('/manage')
           
            }, 1600);
    
 }
     })
      
   

    localStorage.setItem('edit',false)
    setLoading(true)
        }
    }
        
    }
    localStorage.setItem('editteam',false)
}


const handleCancel=()=>{
    localStorage.setItem('edit',false)
navigate('/manage')
setLoading(true)
}
const print=(row)=>{
    console.log(wsedit)
    console.log(row.workstation_id)
}
function onClickSeat(seat)                                                  //When user clicks on a seat
    {
        
        if(seat.state===false & seat.workstation_state==='enable')
        {
            if(localStorage.getItem('editteam')==='true')                                                            // For Project manager 
            {
                
                    let countChecked=editbid.length
                    
                setCheckedvalue(countChecked);
        
                if(seatsReserved.indexOf(seat)>-1)
                {
                    
                    
                    setSeatsreserved(seatsReserved.filter(res=>res!==seat))
                }
                else{
                 
if(seatsReserved.length>=countChecked ){
                        toast.warning(`Sorry! You can select upto ${countChecked} seats only `,{position:"top-center",hideProgressBar: true,})
                    }
                    else{ setSeatsreserved(seatsReserved.concat(seat))}
                 }
                
            }
                

                else if(localStorage.getItem('editteam')!=='true'){
                    
                

            
            if(workstationselected===seat)
        {
            
            
            setWorkstationselected(null)
        }
            else{ setWorkstationselected(seat) }
            }
        

        else if(seat.state==='false')
        {
            toast.warning("Sorry! The seat is booked already",{position:"top-center",hideProgressBar: true,})
        }
        else if(seat.workstation_state==='disable'){
            toast.warning("Sorry! The seat is disabled",{position:"top-center",hideProgressBar: true,})
            }
        }
    }

        if(loading){
            return (
                <><ToastContainer/>
            <div className='loading_pos'>
              <ClipLoader size={'100px'} className='clip_pos'/>
              <img src={logo} height='auto' />
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
        

    <div>
    <Navbar/>

        <Bccontainerw>
            <CustomSeparatorEdit/>        
        </Bccontainerw>
        <ul className="showcase">
            
           
            <li>
                <div className="seatna"></div>
                <small className='legend_text'> Disabled</small>
            </li>
            <li>
                <div className="seatbooked"></div>
                <small className='legend_text'>Booked</small>
            </li>
            <li>
                <div className="seatavailable"></div>
                <small className='legend_text'>Available</small>
            </li>
            <li>
                <div className="seatselected"></div>
                <small className='legend_text'>Selected</small>
            </li>
        </ul>
        <StyledContainerNotPm>
    <StyledDivWorkstationsNotPm>
    <table className='grid'>
        <tbody>
          <td>
              
           {localStorage.getItem('editteam')!=='true' ? ws.map( (row,index) =>
              <Gridtd 
                className={row.workstation_state==='disable'?'disabled':(edit==='true'?((editbid===building & editfid===floor &  ((row.number.toString().length===4)?wsedit===row.number%100:wsedit===row.number%10))?'seatedit':(row.state===true ?'booked':((workstationselected===row)? 'reserved': 'available'))):null)}
                key={index} onClick = {e => onClickSeat(row)}>
                    {print(row)}
                    {index+1} </Gridtd>) :ws.map( (row,index) =><Gridtd 
              className={row.workstation_state==='disable'?'disabled':((editbid.filter(item=>(item===(building)))[0]===building & editfid.filter(item=>(item===(floor)))[0]===floor & ((row.number.toString().length===4)?wsedit.includes(row.number%100):wsedit.includes(row.number%10)))?'seatedit':(row.state===true ?'booked':(seatsReserved.indexOf(row) > -1? 'reserved': 'available')))}
                key={index} onClick = {e => onClickSeat(row)}>
                    {print(row)}
                    {index+1} </Gridtd>)}

              
          </td>
      </tbody>

    </table>
    </StyledDivWorkstationsNotPm>
    <div className='savedinfo'>
                <h2>Selected Information </h2>
    <div className='savedinfo1'>

                <h4>Building : {localStorage.getItem("building_name")}</h4>
                <h4>Floor    : {localStorage.getItem("floor_name")}</h4>
                <h4>Date    : {localStorage.getItem("editdate").substring(8)}{localStorage.getItem("editdate").charAt(7)}{localStorage.getItem("editdate").substring(5,8)}{localStorage.getItem("editdate").substring(0,4)}</h4>
      <h4>Names: {editnames.join(',')}</h4>
      </div>
       </div>
       

 <div className='buttons_container_ws'>
     <button className='button_ws_cancel' onClick={handleCancel}>Cancel</button>
     <button className='button_ws_confirm' onClick={handleConfirm}>Confirm</button>
 </div>
    </StyledContainerNotPm>
    </div>
    <ToastContainer/>
    </>}
    </>
    )}
}}


export default Wsedit