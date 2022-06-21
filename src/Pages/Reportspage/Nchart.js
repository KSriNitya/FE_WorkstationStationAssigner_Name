import React, { useRef, useState, useEffect } from 'react';
import { useLinkClickHandler, useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { FaDownload} from 'react-icons/fa';
import Newdpicker from './Newdpicker';
import { useReactToPrint } from 'react-to-print';
import ClipLoader from "react-spinners/ClipLoader";
import logo from '../../logo (1).png'
import axios, { Axios } from 'axios';
import  './Newdpicker.css';
import CustomSeparatorRe from './breadcrumbsrep';
import Hpcntr from '../../Pages/Buildingspage/BreadcrumbsContainerB'
import { Bar,Line,Pie,Doughnut } from 'react-chartjs-2';
import errorimage from '../../components/errorimage.png'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, PointElement,
    LineElement,
    ArcElement
);

const options = {
  indexAxis: 'x',
  elements: {
      bar: {
          borderWidth: 2,
      },
  },
  responsive: true,
  plugins: {
      legend: {
          position: 'bottom',
      },
      title: {
          display: true,
          text: ' ',
          fontSize: "16px"
      },
  },
  
};



function Nchart() {
    const [bName,setBName]=useState('Main')
    const [loading, setLoading] = useState(true);

const [error,setError]=useState(false)
    const [build,setBuild]=useState([])
    const[user,setUser]=useState([])
    const[user1,setUser1]=useState([])
   const[user2,setuser2]=useState([])
   const start_date=localStorage.getItem('start_date')
    //     const end_date=start_date1.substring(8)+
    //     start_date1.charAt(7)+start_date1.substring(5,8)+start_date1.substring(0,4)
        const end_date=localStorage.getItem('end_date')
    //    const new_date2=end_date1.substring(8)+
    //     end_date1.charAt(7)+end_date1.substring(5,8)+end_date1.substring(0,4)
        const role=localStorage.getItem('role')

    console.log(user)
    localStorage.setItem('building',build)

const buildDropdown=(e)=>{
    setLoading(true)

    const start_date=localStorage.getItem('start_date')
    //     const end_date=start_date1.substring(8)+
    //     start_date1.charAt(7)+start_date1.substring(5,8)+start_date1.substring(0,4)
        const end_date=localStorage.getItem('end_date')
    //    const new_date2=end_date1.substring(8)+
    //     end_date1.charAt(7)+end_date1.substring(5,8)+end_date1.substring(0,4)
    
     
        setBName(e.target.value)
               
    axios.get('http://72a6-106-51-81-179.ngrok.io/details',{
                    params:{
                       start_date:start_date,end_date:end_date,

                        report:true
                    },
        
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
                setUser(res.data)
                setLoading(false)
                }) 
            }


  const buildingDetails = {};





  
  //to print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
   content: () => componentRef.current,
  });

  

  const [buildingData, setData] = useState({
    labels: [],
    datasets: [
        {
            label: 'Seats booked in building',
            data: [],
            backgroundColor: '#003152',
        },
    ],
});

const [data1, setData1] = useState({
    labels: [],
    datasets: [
        {
            label: 'Seates Booked in each floor of building1',
            data: [],
            backgroundColor: '#003152',
        },
    ],
});

const [data2, setData2] = useState({
    labels: [],
    datasets: [
        {
            label: 'Seates Booked in each floor of building1',
            data: [],
            backgroundColor: '#003152',
        },
    ],
});


const [data3, setData3] = useState({
    labels: [],
    datasets: [
        {
            label: 'Seates Booked in each floor of building1',
            data: [],
            backgroundColor: '#003152',
        },
    ],
});

const [data4, setData4] = useState({
    labels: [],
    datasets: [
        {
            label: 'Seates Booked in each floor of building1',
            data: [],
            backgroundColor: '#003152',
        },
    ],
});

const [data5, setData5] = useState({
    labels: [],
    datasets: [
        {
            label: 'Seates Booked in each floor of building1',
            data: [],
            backgroundColor: '#003152',
        },
    ],
});
useEffect (()=>{

  let bdN = [];
        let bWs = [];
        let mounted = true;
 
        const start_date=localStorage.getItem('start_date')
    //     const start_date=start_date.substring(8)+
    //     start_date.charAt(7)+start_date.substring(5,8)+start_date.substring(0,4)
        const end_date=localStorage.getItem('end_date')
    //    const end_date=end_date.substring(8)+
    //     end_date.charAt(7)+end_date.substring(5,8)+end_date.substring(0,4)
      
  axios.get('http://72a6-106-51-81-179.ngrok.io/details', {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        withCredentials: true,
    }, params: {
        
        start_date: start_date, end_date: end_date, report:true
         }

})
.catch((error) => {
        
    setError(true)
    setLoading(false)
  })
.then(res => { setLoading(false)
    console.log(res.data)
    localStorage.getItem("token")

setUser1(res.data)
setuser2(res.data)
    for (const dataObj of res.data){
     //building
      bdN.push(dataObj.name);
      console.log(bdN);

      bWs.push(parseInt((dataObj.total_no_of_workstations - dataObj.no_of_workstations)));
      console.log(bWs);
      //floors of each building
      const floorNames = dataObj.floors.map(floor => floor.floor_name);
      const floorBookingCount = dataObj.floors.map(floor => parseInt((floor.total_no_of_workstations - floor.no_of_workstations)))
      
      buildingDetails[dataObj.name] = {
        labels: floorNames,
       
        datasets: [
            {
                label: `Seats booked- ${dataObj.name} Building`,
                
                data: floorBookingCount,
               
                backgroundColor: '#003152'
           },
        ],
    }
    console.log(buildingDetails, 'building details');


    }

    //set data of building
    setData({
      labels: [bdN[0], bdN[1], bdN[2], bdN[3], bdN[4]],
      datasets: [
          {
              label: 'Seats booked',
              data: bWs,

             // onClick:{handleClick},

              backgroundColor: '#003152',
          }
      ],
      options:{
       //  onclick:{clickHandler}  ,  
         events:['click']
          //onClick:graphClickevent
      }
  })

  //setdata for floors of each building

  setData1(buildingDetails.CCD);
 
  setData2(buildingDetails.Main);
  setData3(buildingDetails.Roush);
  setData4(buildingDetails.SVC);
  setData5(buildingDetails['Pasta Street'])

  }).catch(e => {
    console.log("error", e)
  })

},[])
if(loading){
    return (
    <div className='loading_pos'>
      <ClipLoader size={'100px'} className='clip_pos'/>
      <img src={logo} height='auto' />
  
    </div>)
  
  }
  else
  {
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
      <Navbar/>
     <Hpcntr>
        <CustomSeparatorRe/>
        </Hpcntr>
    <br></br>
    <br></br>
    <br></br>
    <br></br>


    <h1 className='all_b_mesg'>Seats booked in all buildings </h1>

    <h1 className='selected_b_mesg'>Seats booked in each floor of the selected building</h1>

    <form className='dropdown_building' >
       <label>
      Choose Building  : <select value={bName} onChange={buildDropdown} >
       <option value='Main'>Main</option>
       <option value="SVC">SVC</option>
       <option value="CCD">CCD</option>
       <option value="Roush">Roush</option>
       <option value="Pasta Street">Pasta Street</option>
        </select>
        </label>
        </form>
    <Newdpicker/>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
<div ref={componentRef} style={{textAlign:"center"}}>
    


            <div className='all_graph' style={{ width: '40%', height: '40%' }}>
                {
                    console.log("data building all", buildingDetails)
                }
                <Bar data={buildingData} options={options}    />
          < div className='report1'>    
          
           
            </div>
            </div>


{bName==='CCD'&&
           <div className='selected_graph' style={{ width: '40%', height: '40%' }}>
                {
                    console.log(user1)
                    
                }
                <Bar data={data1} options={options} />
                

            </div>}
            {bName==='Main'&&   <div className='selected_graph' style={{ width: '40%', height: '40%' }}>
                {
                    console.log("data", data2)
                }
                <Bar data={data2} options={options} />
                
               <div classname='reportb1'> 
              
                
            </div></div>}
            {bName==='Roush'&&  <div className='selected_graph' style={{ width: '40%', height: '40%' }}>
                {
                    console.log("data", data3)
                }
                <Bar data={data3} options={options} />
                <div classname='reportb2'> 
            
                
            </div></div>}
            {bName==='SVC'&&  <div className='selected_graph' style={{ width: '40%', height: '40%' }}>
                {
                    console.log("data", data4)
                }
                <Bar data={data4} options={options} />
               
                <div classname='reportb2'>
                
                
               
            </div></div>}
            {bName==='Pasta Street'&& <div className='selected_graph' style={{ width: '40%', height: '40%' }}>
                {
                    console.log("data", data5)
                }
                <Bar data={data5} options={options} />
                <div className='reportb3'>
              
              </div>
            </div>}
            </div>



                

          { role==='HR'?<div className='printbutton' style={{textAlign:"center"}}> <button onClick={handlePrint} className="print__button" style={{backgroundColor:"#0892d0",fontFamily:"sans-serif",fontSize :"20px",color:"#ffffff",border:'none',borderRadius:"3px"}}>  Download   <FaDownload/></button> 
           <br></br>
           <br></br>
           </div>:null}
            
    </>
  )}
        }
}

export default Nchart