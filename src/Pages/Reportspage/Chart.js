import React, { useRef, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import Daterange from './DateRange';
import Newdpicker from './Newdpicker';

import { useReactToPrint } from 'react-to-print';


import axios, { Axios } from 'axios'

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
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
            text: ' Seats booked in each building',
            fontSize: "16px"
        },
    },
    
};



function Chart() {
    const buildingDetails = {};
    let navigate=useNavigate()
    const handleClick=()=>{
        
            navigate("/home");
    }

    const [buildingData, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Seates Booked in buildings',
                data: [],
                // borderColor: 'rgb(255, 99, 132)',
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
                // borderColor: 'rgb(255, 99, 132)',
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
                // borderColor: 'rgb(255, 99, 132)',
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
                // borderColor: 'rgb(255, 99, 132)',
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
                // borderColor: 'rgb(255, 99, 132)',
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
                // borderColor: 'rgb(255, 99, 132)',
                backgroundColor: '#003152',
            },
        ],
    });

    useEffect(() => {
        let bdN = [];
        let bWs = [];
        let mounted = true;

        axios.get('http://localhost:8088/details', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
            }, params: { start_date: localStorage.getItem('start_date'), end_date: localStorage.getItem('end_date') }

        }).then(res => {
            console.log(res.data)
            localStorage.getItem("token")

            console.log(res);


            for (const dataObj of res.data) {
                const floorNames = dataObj.floors.map(floor => floor.floor_name);
                const floorBookingCount = dataObj.floors.map(floor => parseInt((floor.total_fws - floor.no_of_workstations)))
              
             
                buildingDetails[dataObj.name] = {
                  
                    labels: floorNames,
                    datasets: [
                        {
                            label: `Seates Booked in buildings ${dataObj.name}`,
                            data: floorBookingCount,
                            
                            backgroundColor: '#003152',
                        },
                    ],
                }
                console.log(buildingDetails, 'building detailsssssssssssss');
                bdN.push(dataObj.name);
                console.log(bdN);
                bWs.push(parseInt((dataObj.total_bws - dataObj.no_of_workstations)));
                console.log(bWs);
            }

            console.log(buildingDetails, 'Building details');
            setData({
                labels: [bdN[0], bdN[1], bdN[2], bdN[3], bdN[4]],
                datasets: [
                    {
                        label: 'Seates Booked ',
                        data: bWs,

                       onClick:{handleClick},
                        
                        
                        //  borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: '#003152',
                    }
                ],
            })
            setData1(buildingDetails.CCD);
           setData2(buildingDetails.Main);
            setData3(buildingDetails.Roush);
            setData4(buildingDetails.SVC);
            
      //      setData5(buildingDetails.Pasta_Street)
         // setData5(buildingDetails.'Pasta Street');
           // const Pasta+' '+StreetbuildingDetails.P

        //  setData5(buildingDetails.`${Pasta Street}`);
         // setData5(buildingDetails.name[2]);
         // setData5({
           setData5(buildingDetails['Pasta Street'])
           // labels: [floorNames[0], floorNames[1], floorNames[2]],
            //datasets: [
              //  {
                //    label: 'Seates Booked',
                  //  data: floorBookingCount[2],
                    //  borderColor: 'rgb(255, 99, 132)',
                    //backgroundColor: '#003152',
                //}
            //],
          //})
            console.log("arrData", bdN, bWs)
            //setChart(res.data)

        }).catch(e => {
            console.log("error", e)
        })
    }, [])
    //const b=  buildingDetails.bdstate==='enable'
    //const a=  buildingDetails.fstate==='enable'

    return (
        <>
            <Newdpicker/>
          
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
           
            <div style={{ width: '50%', height: '50%' }}>
                {
                    console.log("data building dadadadadadadadad", buildingDetails)
                }
                <Bar data={buildingData} options={options} />
            </div>
           
            <div style={{ width: '50%', height: '50%' }}>
                {
                    console.log("data", data1)
                }
                <Bar data={data1} options={options} />
            </div>
           
            <div style={{ width: '50%', height: '50%' }}>
                {
                    console.log("data", data2)
                }
                <Bar data={data2} options={options} />
            </div>
           
            <div style={{ width: '50%', height: '50%' }}>
                {
                    console.log("data", data3)
                }
                <Bar data={data3} options={options} />
            </div>
           
            <div style={{ width: '50%', height: '50%' }}>
                {
                    console.log("data", data4)
                }
                <Bar data={data4} options={options} />
            </div>

           
            <div style={{ width: '50%', height: '50%' }}>
                {
                    console.log("data", data5)
                }
                <Bar data={data5} options={options} />
            </div>
        </>
    )
}

export default Chart