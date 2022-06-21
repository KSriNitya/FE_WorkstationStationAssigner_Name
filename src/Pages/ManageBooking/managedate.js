import ReactDatePicker from "react-datepicker";
import React,{useState} from 'react'
import '../../Pages/Buildingspage/Rdp.css'
import axios from "axios";
import { Context } from "./managebooking";


function ManageDate() {

const[selectdate,setSelectdate]=useState(new Date())
    const[selectedDate, setselectedDate]=useState((new Date()).toISOString().split('T')[0])

  return (<Context.Consumer>
   {setEmployees=> {return <div className="date_container">
        
        <ReactDatePicker className="dp"
        selected={selectdate} 
        onChange={date =>{ console.log('hi')
        const d=(date).toISOString().slice(0, 10)
        localStorage.setItem('date',d)
        console.log(localStorage.getItem('selectedproject'))
          setselectedDate(date)
          setSelectdate(date)
          console.log(localStorage.getItem('selectedproject'))
          axios.get('http://e4f7-160-238-74-151.ngrok.io/Pjdata',{
            params:{project_name:localStorage.getItem('selectedproject'),
                date:(date).toISOString().slice(0, 10)},
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
              }
        })
        .then(res=>{
          console.log(res.data)
          setEmployees(res.data)
          

        })
        .then(
          window.location.reload()
         )
        }}
        dateFormat='dd/MM/yyyy'
        minDate={new Date()} 

        >
            
        </ReactDatePicker>
    </div>}}
    </Context.Consumer>
  )
}

export default ManageDate;

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import { Context } from "./managebooking";
// import '../../Pages/daterange/Daterange.css'


// const ManageDate = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   // localStorage.setItem('start_date',(date).toISOString().split('T')[0])
//   // console.log((date).toISOString().split('T')[0])
//   return (<Context.Consumer>
//     {
//       setEmployees=>{
//         return <>
//         <div className="drcontainer">
//           <div className="space">
//           <p1 className='label_mesg'>From :</p1>
//           </div>
//           <div>
//           <DatePicker className="dr1"
//             selected={startDate}
//             onChange={(date) => {setStartDate(date)
//               localStorage.setItem('start_date',(date).toISOString().split('T')[0])
              
//               console.log((date).toISOString().split('T')[0])}}
            
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             minDate={new Date()}
//             dateFormat='dd/MM/yyyy'
//             popperPlacement="auto" 
//           />
//           </div>
//           <div className="space">
//           <p1 className='label_mesg'>To :</p1>
//           </div>
//           <div>
//           <DatePicker className="dr2"
//             selected={endDate}
//             onChange={(date) => {setEndDate(date)
//               localStorage.setItem('end_date',(date).toISOString().split('T')[0])
              
//               console.log((date).toISOString().split('T')[0])}}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             minDate={startDate}
//             dateFormat='dd/MM/yyyy'
//             popperPlacement="auto"
//           />
//           </div>
//           </div>
//         </>
//       }
//     }
    
//     </Context.Consumer>);
//   }


// export default ManageDate


