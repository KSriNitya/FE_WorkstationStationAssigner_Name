import React, {useRef, useState, useEffect ,useMemo} from 'react'
import axios from 'axios'
import logo from '../../logo (1).png'
import{MdOutlineEdit,MdDeleteOutline, MdDateRange}from 'react-icons/md'
import ReactPaginate from 'react-paginate';
import './managenew.css'
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer,toast } from 'react-toastify'
import {useNavigate}from 'react-router-dom'
import CustomSeparatormb from '../../Pages/ManageBooking/breadcrumbsmb'
import Hpcntr from '../../Pages/Buildingspage/BreadcrumbsContainerB'
import Swal from 'sweetalert2';
import { useTable,useGlobalFilter,useRowSelect,usePagination } from 'react-table'
import { GlobalFilter } from '../../components/ColumnFilter'
import { Navbar } from '../Navbar/Navbar'
import { IndeterminateCheckbox } from '../../components/checkbox'
import MDaterange from './MDateRange'
import { FaDownload} from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import errorimage from '../../components/errorimage.png'

export const Context2=React.createContext()
function Table(){
    let navigate=useNavigate()
    const URL = 'http://72a6-106-51-81-179.ngrok.io/'
    const [loading, setLoading] = useState(true);
    const [search,setSearch]=useState("")
    const [error,setError]=useState(false)
    const [employees, setEmployees] = useState([])
    const [selectedpage,setSelectedpage]=useState()
    const [mbooking,setMbooking]=useState(localStorage.getItem('hrproject'))
    const [pagesize,setPagesize]=useState()
    const [mbFor,setmbFor]=useState(localStorage.getItem('mbFor'))
    const [mbForHr,setmbForHr]=useState(localStorage.getItem('mbForHr'))
    const [selectedproject,setSelectedproject]=useState(localStorage.getItem('hrproject'))
    const [selectedpmproject,setSelectedPmProject]=useState()
    const[meet,setMeet]=useState(localStorage.getItem('mb'))
    const [projects,setProjects]=useState([])
    const [projectdata,setProjectdata]=useState([])
    const [emptydata,setEmptydata]=useState(false)
    const [pageCount,setPageCount]=useState(0)
    const [kmembers,setkmembers]=useState([])
    const [confirmdata,setConfirmData]=useState([])
    const COLUMNS=[{Header:'DATE',accessor:'date'},{Header:"NAME",accessor:'name'},{Header:"BUILDING",accessor:"building_name"},{Header:"FLOOR",accessor:"floor_name"},{Header:"WORKSTATION",accessor:"workstation_id"}]
    const role=localStorage.getItem('role')
    // const d1=localStorage.getItem('start_date')
    // const d2=localStorage.getItem('end_date')
    // const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
    // const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
    localStorage.setItem('mbooking',selectedproject)
    localStorage.setItem('mbFor',mbFor)
    localStorage.setItem('mbForHr',mbForHr)
    localStorage.setItem('meet',meet)
    localStorage.setItem('editteam',false)    
    

    useEffect(()=>{
        let mounted=true;
        axios.get(URL+'find_projects_name',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
              }
              ,params:{email:localStorage.getItem('email')}

        })
        .catch((error) => {
        
            setError(true)
            setLoading(false)
        })
       .then(res=>{
           if(localStorage.getItem('hrproject')===undefined)
           {
            localStorage.setItem('hrproject',res.data[0])


           }
           if(mounted)
           {console.log(res.data)
var p=res.data

if(localStorage.getItem('hrproject')===null|localStorage.getItem('hrproject')==='All')

{
    res.data.filter(item=>item==localStorage.getItem('hrproject'))
    setSelectedPmProject(res.data.filter(item=>item===localStorage.getItem('hrproject')))
    console.log(res.data.filter(item=>item===localStorage.getItem('hrproject')))
    localStorage.setItem('hrproject',res.data.filter(item=>item===localStorage.getItem('hrproject')))

}
                    setProjects(p)
            localStorage.setItem('selectedproject',selectedproject)} })
            return ()=>(mounted=false)
            },[])
useEffect(()=>{

                if(role==='HR'|role==='Project manager')
                {
                    if(localStorage.getItem('mb')==='Workstations')
                {
                  if(mbForHr!=='Self') 
                   {
                       if(localStorage.getItem('hrproject')==='All')
                    {
                        axios.get(URL+'confirm_data',
                        {
                          params:{
                              start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
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
                          setkmembers(res.data.map(item=>(item.name)))
                          console.log(res.data.map(item=>(item.name)))
                          setEmployees(p)
                          if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                          console.log(res.data.length)
                          setLoading(false)
                 
                          console.log(p)
                      })


                    }
                    if(localStorage.getItem('hrproject')!=='All')
                    {
                        axios.get(URL+'Pjdata',
                        {
                          params:{
                              project_name:localStorage.getItem('hrproject'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
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
                          setkmembers(res.data.map(item=>(item.name)))
                          console.log(res.data.map(item=>(item.name)))
                          setEmployees(p)
                          if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                          console.log(res.data.length)
                          setLoading(false)
                 
                          console.log(p)
                      })


                    }
          
                       
}
if(role==='HR'&mbForHr==='Self')
{ 
    console.log(localStorage.getItem('role'))
    const email=localStorage.getItem('email')
     axios.get(URL+'userdata',{
       
         headers:{
             Authorization:`Bearer ${localStorage.getItem('token')}`,
             'Access-Control-Allow-Origin': '*',
             'Content-Type': 'application/json',
             withCredentials: true,
           },
           
           params:{
             email:email,start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
         },
         
     })
     .catch((error) => {
        
        setError(true)
        setLoading(false)
    })
    .then(res=>{
const p=res.data
if(res.data.length===0)
{
 setEmptydata(true)
}

console.log(res.data)
            setEmployees(p)
            if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
            console.log(res.data.totalrecords)
            console.log(res.data.length)
            setLoading(false)
         })

}

if(role==='Project manager'&mbFor==='Self')
{
    console.log(localStorage.getItem('role'))
    const email=localStorage.getItem('email')
     axios.get(URL+'userdata',{
       
         headers:{
             Authorization:`Bearer ${localStorage.getItem('token')}`,
             'Access-Control-Allow-Origin': '*',
             'Content-Type': 'application/json',
             withCredentials: true,
           },
           
           params:{
             email:email,start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
         },
         
     })
     .catch((error) => {
        
        setError(true)
        setLoading(false)
    })
    .then(res=>{
const p=res.data
if(res.data.length===0)
{
 setEmptydata(true)
}

console.log(res.data)
            setEmployees(p)
            if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
            console.log(res.data.length)
            setLoading(false)
         })

}

if(role==='Project manager'& mbFor==='Team')
{

    axios.get(URL+'Pjdata',{
        params:{project_name:localStorage.getItem('hrproject'),
            start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
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
        
        setEmployees(res.data)
        if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
        console.log(res.data.length)
        setLoading(false)
       
        
    })


}

if(localStorage.getItem('hrproject')!=='All' & mbFor!=='Self' & mbForHr!=='Self')
{
    axios.get(URL+'Pjdata',{
        params:{project_name:localStorage.getItem('hrproject'),
            start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
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
        setkmembers(res.data.map(item=>(item.name)))
        console.log(res.data.map(item=>(item.name)))
        setEmployees(p)
        if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
        console.log(res.data.length)
        setLoading(false)
       
        console.log(p)
    })


}


                }
                else {

                    if(role ==='HR' & mbForHr!=='Self') 
                   {
                       if(localStorage.getItem('hrproject')==='All')
                    {
                        axios.get(URL+'meeting-rooms/teams',{
                
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    withCredentials: true,
                  },
                  params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7}
            })
            .catch((error) => {
        
                setError(true)
                setLoading(false)
            })
            .then(res=>{console.log(res.data)
                const p=(res.data)
                setkmembers(res.data.map(item=>(item.name)))
                console.log(res.data.map(item=>(item.name)))
                setEmployees(p)
                if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                console.log(res.data.length)
                setLoading(false)

                console.log(p)
            })


                    }
          
                       
}
if(role==='HR' & mbForHr==='Self'|role==='Project manager' &mbFor==='Self')
{ axios.get(URL+'roomdata',{
    params:{
        email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
.then(res=>{
const p=res.data
console.log(res.data)
       setEmployees(p)
       setLoading(false)
       if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
       console.log(res.data.length)
    })

}

if(localStorage.getItem('hrproject')!=='All')
{
    axios.get(URL+'meeting-rooms/teams',{
            params:{
                project_name:localStorage.getItem('hrproject'),
                start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date')       ,offset:0,size:7     },
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
            setEmployees(res.data)
            if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
            console.log(res.data.length)
            setLoading(false)
        })


}


                }



                }

                
              else  {if(localStorage.getItem('mb')==='Workstations')
                {
                    console.log(localStorage.getItem('role'))
               const email=localStorage.getItem('email')
                axios.get(URL+'userdata',{
                  
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        withCredentials: true,
                      },
                      
                      params:{
                        email:email,start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
                    },
                    
                })
                .catch((error) => {
        
                    setError(true)
                    setLoading(false)
                })
               .then(res=>{
        const p=res.data
        if(res.data.length===0)
        {
            setEmptydata(true)
        }
        
        console.log(res.data)
                       setEmployees(p)
                       if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                       console.log(res.data.length)
                       setLoading(false)
                    })
                       

                }
                else {
  
                    axios.get(URL+'roomdata',{
                    params:{
                        email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
               .then(res=>{
        const p=res.data
        console.log(res.data)
                       setEmployees(p)
                       setLoading(false)
                       if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                       console.log(res.data.length)
                    })

                }
                }
                    
                    },[])

 
                        const columns=useMemo(()=>COLUMNS,[])
                        const data=useMemo(()=>[...employees],[employees])
            
                        const tableInstance=  useTable({
                            columns,
                            data:employees
                        },useGlobalFilter,usePagination,useRowSelect,(hooks)=>{
                            hooks.visibleColumns.push((columns)=>{
                                return [
                                    {
                                        id:'selection',
                                        Header:({getToggleAllRowsSelectedProps})=>(
                                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                                        ),
                                        Cell:({row})=>(<IndeterminateCheckbox {...row.getToggleRowSelectedProps()}/>)
                                    },
                                    ...columns
                                ]
                            })
                        })

                        const {getTableProps,getTableBodyProps,headerGroups,page,pageOptions,state,setGlobalFilter,prepareRow,selectedFlatRows}=tableInstance
                        const {globalFilter,pageIndex}=state

    const meetDropdown=(e)=>{
        // const d1=localStorage.getItem('start_date')
        //            const d2=localStorage.getItem('end_date')
        //            const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
        //            const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)

        localStorage.setItem('meet',e.target.value)
        
        
        setMeet(e.target.value)
        setLoading(true)
        if(e.target.value==='Workstations')
        {
            
            if(role==='HR' & mbForHr==='Self'|role==='Project manager' & mbFor==='Self'|role==='Employee' )
            {
                axios.get(URL+'userdata',{
                    params:{
                        email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
               .then(res=>{
        const p=res.data
        console.log(res.data)
                       setEmployees(p) 
                       if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                       console.log(res.data.length)
                       setLoading(false)
                   
                    })

            }
            else if(mbFor==='Team'|mbForHr==='Others' & selectedproject!=='All' )
            {
                console.log(selectedproject)
                axios.get(URL+'Pjdata',{
                    params:{project_name:localStorage.getItem('hrproject'),
                        start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
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
                    setkmembers(res.data.map(item=>(item.name)))
                    console.log(res.data.map(item=>(item.name)))
                    setEmployees(p)
                    if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                    console.log(res.data.length)
                    setLoading(false)
                   
                    console.log(p)
                })

            }

            else if(mbForHr==='Others' & selectedproject==='All'){

                axios.get(URL+'confirm_data',
       {
         params:{
             start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
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
         setkmembers(res.data.map(item=>(item.name)))
         console.log(res.data.map(item=>(item.name)))
         setEmployees(p)
         if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
         console.log(res.data.length)
         setLoading(false)

         console.log(p)
     })

            }
            

        }
        else
        {
            setLoading(true)
            if(role==='HR' & mbForHr==='Self'|role==='Project manager' & mbFor==='Self'|role==='Employee' )
            {
                axios.get(URL+'roomdata',{
                    params:{
                        email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
               .then(res=>{
        const p=res.data
        console.log(res.data)
                       setEmployees(p)
                       if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                       console.log(res.data.length)
                       setLoading(false)
                    })

            }

           else if(mbFor==='Team'|mbForHr==='Others' & selectedproject!=='All' )
           {
               
            axios.get(URL+'meeting-rooms/teams',{
                params:{
                    project_name:localStorage.getItem('selectedproject'),
                    start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
            setEmployees(res.data)
            if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
            console.log(res.data.length)
            setLoading(false)

            })

           }

           else if(mbForHr==='Others' & selectedproject==='All')
           {
               //all meeting rooms data api to be called

               axios.get(URL+'meeting-rooms/teams',{
                
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    withCredentials: true,
                  },
                  params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7}
              

            })
            .catch((error) => {
        
                setError(true)
                setLoading(false)
            })
            .then(res=>{console.log(res.data)
                const p=(res.data)
                setkmembers(res.data.map(item=>(item.name)))
                console.log(res.data.map(item=>(item.name)))
                setEmployees(p)
                if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                console.log(res.data.length)
                setLoading(false)

                console.log(p)
            })
           }
            
            
        }
    }
    const handleTeamDelete=()=>{
        console.log("hiiiiiiiii")
        if(selectedFlatRows.length!==0)
        {


            const id=selectedFlatRows.map(item=>item.original.id)
            const datee=selectedFlatRows[0].original.date
   
            
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'grey',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)

                  
                const mail=selectedFlatRows.map(item=>(item.original.email))
                const date=selectedFlatRows.map(item=>(item.original.date.substring(6)+item.original.date.charAt(5)+item.original.date.substring(3,5)+item.original.date.charAt(5)+item.original.date.substring(0,2)))

            axios.delete(`http://72a6-106-51-81-179.ngrok.io/delete`,{data:{email:mail,ldates:date},
            headers:{
             Authorization:`Bearer ${localStorage.getItem('token')}`,
             'Access-Control-Allow-Origin': '*',
             'Content-Type': 'application/json',
             withCredentials: true,
           }}
             
           
               
                 
                 
             
         )
         .catch((error) => {
        
            setError(true)
            setLoading(false)
        })
         .then(res=>{            setLoading(false)


             const del = employees.filter(employee => !id.includes(employee.id))
         console.log(del)
         setEmployees(del)
           toast.success('Booking deleted successfully',{position:"top-center",hideProgressBar: true,})
         })
              
            }
          })
   
        }
        else
        {
            toast.warning('Please select the bookings to delete',{position:"top-center",hideProgressBar: true,})
        }
    }

    const handleTeamEdit=(item)=>
    {
        console.log("Heyyyy")
        
        if(selectedFlatRows.length!==0)
        {
            localStorage.setItem('meeting_status','false')
            console.log(selectedFlatRows)
            const datee=selectedFlatRows[0].original.date
            var p=false
            selectedFlatRows.map(item=>{

                console.log(item.original.date)
                if(item.original.date!==datee) 
                {

                    p=true;
                }

            })

           if(p===false){ localStorage.setItem('editteam',true)
         localStorage.setItem('edit','true')

         const mail=selectedFlatRows.map(item=>(item.original.email))
         const names=selectedFlatRows.map(item=>(item.original.name))
         const bid=selectedFlatRows.map(item=>item.original.building_id)
         const fid=selectedFlatRows.map(item=>item.original.building_id*10+item.original.floor_id)
         const wid=selectedFlatRows.map(item=>(item.original.workstation_id))
         const data=selectedFlatRows.map(item=>item.original)
         setConfirmData(selectedFlatRows.map(item=>item.original))
         
         const date=selectedFlatRows[0].original.date
         const date_format=date.substring(6)+date.charAt(5)+date.substring(3,5)+date.charAt(5)+date.substring(0,2)
         localStorage.setItem('editdata',JSON.stringify(data))
         localStorage.setItem('end_date',date_format)
         localStorage.setItem('editmail',JSON.stringify(mail))
         localStorage.setItem('editnames',JSON.stringify(names))
         localStorage.setItem('editwid',JSON.stringify(wid))
         localStorage.setItem('editbid',JSON.stringify(bid))
         localStorage.setItem('editfid',JSON.stringify(fid))
         localStorage.setItem('editdate',date_format)
         role==='HR'?localStorage.setItem('editproject',selectedproject):localStorage.setItem('editproject',selectedpmproject)
         
            
     navigate('/building')
    }
    else{
        toast.warning('Please select same dates',{position:"top-center",hideProgressBar: true,})

        
    }
 
        }
        else
        {
         toast.warning('Please select the bookings to edit',{position:"top-center",hideProgressBar: true,})
 
        }

    }
   const mbFordropdownSelected=(e)=>{
       setLoading(true)
    // const d1=localStorage.getItem('start_date')
    // const d2=localStorage.getItem('end_date')
    // const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
    // const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
       localStorage.setItem('mbFor',e.target.value)
       setmbFor(e.target.value)
       console.log(e.target.value)
      if(e.target.value==='Self')
      {
          if(meet==='Workstations')
    {        
     //api call
         axios.get(URL+'userdata',{
            params:{
                email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
       .then(res=>{
const p=res.data
console.log(res.data)
               setEmployees(p)
               setLoading(false)

               if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
               console.log(res.data.length) })
            }
            else
            {

                

                 //meeting room for pm for self

                 axios.get(URL+'roomdata',{
                    params:{
                        email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
               .then(res=>{
        const p=res.data
        console.log(res.data)
                       setEmployees(p)
                       setLoading(false)

                       if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                       console.log(res.data.length) })


            }
      }
      else
      {

        if(meet==='Workstations')
          //api call
       {
          console.log(selectedproject)
          console.log(localStorage.getItem('date'))
          axios.get(URL+'Pjdata',{
            params:{project_name:localStorage.getItem('hrproject'),
                start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
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
            setkmembers(res.data.map(item=>(item.name)))
            console.log(res.data.map(item=>(item.name)))
            setEmployees(p)
            setLoading(false)

            if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
            console.log(res.data.length)
            console.log(p)
        })}

        else
        {
            //api call for meeting room for pm team
            axios.get(URL+'meeting-rooms/teams',{
                params:{
                    project_name:localStorage.getItem('hrproject'),
                    start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
            setEmployees(res.data)
            setLoading(false)

            if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
            console.log(res.data.length)
            })
        }
          
      }
   }

   const componentRef = useRef();
   const handlePrint = useReactToPrint({
       content: () => componentRef.current,
      });
   


   const mbForHrdropdownSelected=(e)=>{
    // const d1=localStorage.getItem('start_date')
    // const d2=localStorage.getItem('end_date')
    // const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
    // const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
       localStorage.setItem('mbForHr',mbForHr)
       setLoading(true)
    setmbForHr(e.target.value)
    console.log(e.target.value)
   if(e.target.value==='Self')      
   {
       if(meet==='Workstations')
      { 
          setSelectedproject("All")
      //api call
      axios.get(URL+'userdata',{
         params:{
             email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
    .then(res=>{
const p=res.data
console.log(res.data)
            setEmployees(p)
            if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
            console.log(res.data.length)
            setLoading(false)
        })
        }
        else
        {
            //api call for meeting rooms for hr self

            axios.get(URL+'roomdata',{
                params:{
                    email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
           .then(res=>{
    const p=res.data
    console.log(res.data)
                   setEmployees(p) 
                   if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                   console.log(res.data.length)
            setLoading(false)
        })
            
        }
   }
   else if(e.target.value==='Others'& selectedproject==='All')
   {
    if(meet==='Workstations')
       //api call
     { 
          console.log(selectedproject)
       console.log(localStorage.getItem('date'))
       axios.get(URL+'confirm_data',
       {
         params:{
             start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
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
         setkmembers(res.data.map(item=>(item.name)))
         console.log(res.data.map(item=>(item.name)))
         setEmployees(p)
         if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
         console.log(res.data.length)
         setLoading(false)

         console.log(p)
     })
    }
    else
    {
        //api call for meeting room for getting all details

        axios.get(URL+'meeting-rooms/teams',{
            
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
              },
              params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7}
        })
        .catch((error) => {
        
            setError(true)
            setLoading(false)
        })
        .then(res=>{console.log(res.data)
            const p=(res.data)
            setkmembers(res.data.map(item=>(item.name)))
            console.log(res.data.map(item=>(item.name)))
            setEmployees(p)
            if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
            console.log(res.data.length)
            setLoading(false)

            console.log(p)
        })



    
    }
       
   }
   else if(e.target.value==='Others'& selectedproject!=='All')
   {
       if(meet==='Workstations')
       {
        //api call for workstations for others who are in a project
        axios.get(URL+'Pjdata',{
            params:{project_name:selectedproject,
                start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
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
            setkmembers(res.data.map(item=>(item.name)))
            console.log(res.data.map(item=>(item.name)))
            setEmployees(p)
            if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
            console.log(res.data.length)
            setLoading(false)

            console.log(p)
        })

       }
       else
       {
         //api call for meeting rooms for others who are in a project
         axios.get(URL+'meeting-rooms/teams',{
            params:{
                project_name:selectedproject,
                start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
        setEmployees(res.data)
        if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
        console.log(res.data.length)
        setLoading(false)

        })

       }

   }
}
   
   const projectdropdownSelected=(e)=>{
    localStorage.setItem('hrproject',e.target.value)
    // const d1=localStorage.getItem('start_date')
    // const d2=localStorage.getItem('end_date')
    // const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
    // const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
       setLoading(true)
  if(e.target.value==='All'){
   localStorage.setItem('hrproject',e.target.value)
      
       if(meet==='Workstations')
      { setSelectedproject(e.target.value)
    axios.get(URL+'confirm_data',{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
              },
              params:{start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7}

        })
        .catch((error) => {
        
            setError(true)
            setLoading(false)
        })
       .then(res=>{
           
           console.log(res.data)
var p=res.data

               setEmployees(res.data)
               if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
               console.log(res.data.length)
               setLoading(false)

            localStorage.setItem('selectedproject',p[0]) })}
            
            else
            {
                setSelectedproject(e.target.value)
                axios.get(URL+'meeting-rooms/teams',{
                    params:{
                        start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
                setEmployees(res.data)
                if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                console.log(res.data.length)
                setLoading(false)

                }) 
            }

  }
  else  {  
    if(meet==='Workstations')
    {
        setSelectedproject(e.target.value)
    setSelectedPmProject(e.target.value)
    
    localStorage.setItem('selectedproject',e.target.value)
    console.log(localStorage.getItem('date'))
    const pdate=localStorage.getItem('date')
    axios.get(URL+'Pjdata/',{
        params:{project_name:e.target.value,
            start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
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
        const p=(res.data.filter(item=>item.length!==0))
        setEmployees(p)
        setkmembers(res.data.map(item=>(item.name)))
        console.log(res.data.map(item=>(item.name)))
        console.log(p)
        if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
        console.log(res.data.length)
        setLoading(false)

    })
}
else{
    //api call for meeting room for different projects
    setSelectedproject(e.target.value)
    setSelectedPmProject(e.target.value)
    localStorage.setItem('selectedproject',e.target.value)

    if(role==='HR')
    {
        axios.get(URL+'meeting-rooms/teams',{
            params:{
                project_name:localStorage.getItem('selectedproject'),
                start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
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
        setEmployees(res.data)
        if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
        console.log(res.data.length)
        setLoading(false)

        })
    }
    else
    {
        axios.get(URL+'meeting-rooms/teams',{
            params:{
                project_name:localStorage.getItem('hrproject'),
                start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date') ,offset:0,size:7           },
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
            setEmployees(res.data)
            if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
            console.log(res.data.length)
            setLoading(false)
        })
    }
}
}
   }


   const editDatameet= async (item) =>{
       
    const date1=item.start_date
    const date2=item.end_date
    const start_date_format=date1.substring(6)+date1.charAt(5)+date1.substring(3,5)+date1.charAt(5)+date1.substring(0,2)
    const end_date_format=date2.substring(6)+date2.charAt(5)+date2.substring(3,5)+date2.charAt(5)+date2.substring(0,2)

  
    localStorage.setItem('edit_conf',(item.building_id*100)+(item.floor_id*10)+item.conf_room)
    console.log("Hii")
    localStorage.setItem('editteam',true)
    localStorage.setItem('meeting_status',true)
    localStorage.setItem('team',true)
    localStorage.setItem('editemail',item.email)
    localStorage.setItem('editname',item.name)
    localStorage.setItem('editwid',item.workstation_id)
    localStorage.setItem('editbid',item.building_id)
    localStorage.setItem('editfid',item.building_id*10+item.floor_id)
    localStorage.setItem('editstartdate',start_date_format)
    localStorage.setItem('editenddate',end_date_format)
    localStorage.setItem('editstarttime',item.start_time)
    localStorage.setItem('editendtime',item.end_time)


    localStorage.setItem('editproject',item.project_name)
    navigate('/building')
   }

   const removeDatameet=(item)=>{
    const date1=item.start_date
    const date2=item.end_date
    const start_date_format=date1.substring(6)+date1.charAt(5)+date1.substring(3,5)+date1.charAt(5)+date1.substring(0,2)
 const end_date_format=date2.substring(6)+date2.charAt(5)+date2.substring(3,5)+date2.charAt(5)+date2.substring(0,2)

        console.log("Heyy")
        

 
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: 'grey',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem('mb','Meeting Rooms')
                setLoading(true)

                if(item.project_name!=='NA')
                {
                    axios.delete(`http://72a6-106-51-81-179.ngrok.io/meeting-rooms`,
            
        {data:{
            
            
                building_id:item.building_id,
                floor_id:item.floor_id,
                conf_room:item.conf_room,
                start_date:start_date_format,
                end_date:end_date_format,
                start_time:item.start_time,
                end_time:item.end_time,
                email:item.email,
                name:item.name,
                project_name:item.project_name
        },
        
                  
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        withCredentials: true,
                      },
                      
                })
                .catch((error) => {
        
                    setError(true)
                    setLoading(false)
                })
                .then(res=>{
                    
                    console.log(employees.filter(row=>item.id!==row.id))
                    employees.filter(row=>item.id!==row.id)

                    toast.success('Booking deleted successfully',{position:"top-center",hideProgressBar: true,})

                    setTimeout(function(){
                        window.location.reload()
                          
                           }, 1600);

                })

                }
                else
                {
                    axios.delete(`http://72a6-106-51-81-179.ngrok.io/meeting-rooms`,
            
        {data:{
            
            
                building_id:item.building_id,
                floor_id:item.floor_id,
                conf_room:item.conf_room,
                start_date:start_date_format,
                end_date:end_date_format,
                start_time:item.start_time,
                end_time:item.end_time,
                email:item.email,
                name:item.name
        },
        
                  
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        withCredentials: true,
                      },
                      
                })
                .catch((error) => {
        
                    setError(true)
                    setLoading(false)
                })
                .then(res=>{
                    
                    console.log(employees.filter(row=>item.id!==row.id))
                    employees.filter(row=>item.id!==row.id)

                    toast.success('Booking deleted successfully',{position:"top-center",hideProgressBar: true,})

                    setTimeout(function(){
                        window.location.reload()
                          
                           }, 1600);

                })

                }
        
                
                  
              
            }
          })
         
        
               
            
}
   

    const renderHeader = () => {

        if(meet==='Workstations')
        {
            const headerElement = ['Date', 'Name', 'Building', 'Floor', 'Workstation']
        
            return headerElement.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
        }
        else
        {
          if(mbFor==='Team'|mbForHr==='Others'){  const headerElement = ['FROM', 'TO', 'FROM (HRS)', 'TO (HRS)','BOOKED BY', 'PROJECT','BUILDING','FLOOR','ROOM']
        
        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>
        })}

        else if(mbFor==='Self'|mbFor==='Self')
        {
            console.log("hi")
            const headerElement = ['FROM', 'TO', 'FROM (HRS)', 'TO (HRS)','BUILDING','FLOOR','ROOM']
        
        return headerElement.map((key, index) => {
            return <th key={index}>{key}</th>})
        }
        else {
            const headerElement = ['FROM', 'TO', 'FROM (HRS)', 'TO (HRS)','BUILDING','FLOOR','ROOM']
            return headerElement.map((key, index) => {
                return <th key={index}>{key}</th>})
        }
        }
    
        
    }

    

    const renderBody = () => {
        if(employees.length!==0)
        {
           if(meet==='Workstations') {
                return employees && employees.filter(val=>{
            if(search==="")
            {
                
                return val;
            }
            else if(val.date.toLowerCase().includes(search.toLowerCase()) ||
            val.name.toLowerCase().includes(search.toLowerCase()) ||
            val.building_name.toLowerCase().includes(search.toLowerCase()) ||
            val.floor_name.toLowerCase().includes(search.toLowerCase()) ||
            val.workstation_id.toString().includes(search.toLowerCase()) 
            
            )
            {
                return val;
            }
        }).map((item,index) => { 
            return (    

               
                
                <tr key={index}>
                    <td>{item.date}</td>
                   <td>{item.name}</td>
                    <td>{item.building_name}</td>
                    <td>{(item.floor_name)}</td>
                    <td>{item.workstation_id}</td>
                    <td >
                       
                       <button className='button_edit' onClick={() => editDatameet(item)}><MdOutlineEdit/></button>
                        <button className='button_delete' onClick={() => removeDatameet(item)}><MdDeleteOutline/></button>

                    </td>
                </tr>
            )
        })}
        else
        {
            if(mbFor==='Team'|mbForHr==='Others'& selectedproject!=='All') 
            {return employees && employees.filter(val=>{
                if(search==="")
                {
                    
                    return val;
                }
                else if(val.start_date.toLowerCase().includes(search.toLowerCase()) ||
                val.end_date.toLowerCase().includes(search.toLowerCase()) ||
                val.start_time.toLowerCase().includes(search.toLowerCase()) ||
                val.end_time.toLowerCase().includes(search.toLowerCase()) ||
                val.project_name.toLowerCase().includes(search.toLowerCase()) ||
                val.buildingName.toLowerCase().includes(search.toLowerCase()) ||
                val.floorName.toLowerCase().toLowerCase().includes(search.toLowerCase()) ||
                val.conf_room.toString().toLowerCase().includes(search.toLowerCase()) ||
                val.bookedBy.toLowerCase().includes(search.toLowerCase()) ||
                val.project_name.toLowerCase().includes(search.toLowerCase()) 



                
                )
                {
                    return val;
                }
            }).map((item,index) => { 
                return (    
    
                   
                    
                    <tr key={index}>
                            <td>{item.start_date}</td>
                            <td>{item.end_date}</td>
                       
                        <td>{item.start_time}</td>
                        <td>{item.end_time}</td>
                        <td>{item.bookedBy}</td>
                        <td>{item.project_name}</td>
                        <td>{item.buildingName}</td>
                        <td>{(item.floorName)}</td>
                        <td>{item.conf_room}</td>
                        <td >
                           
                           <button className='button_edit' onClick={() => editDatameet(item)}><MdOutlineEdit/></button>
                            <button className='button_delete' onClick={() => removeDatameet(item)}><MdDeleteOutline/></button>
    
                        </td>
                    </tr>
                )
            })
            }
            else if (mbForHr==='Others'& selectedproject==='All')
            {
                console.log("hi")
                return employees && employees.filter(val=>{
                    if(search==="")
                    {
                        
                        return val;
                    }
                    else if(val.start_date.toLowerCase().includes(search.toLowerCase()) ||
                    val.end_date.toLowerCase().includes(search.toLowerCase()) ||
                    val.start_time.toLowerCase().includes(search.toLowerCase()) ||
                    val.end_time.toLowerCase().includes(search.toLowerCase()) ||
                    val.buildingName.toLowerCase().includes(search.toLowerCase()) ||
                    val.floorName.toLowerCase().includes(search.toLowerCase()) ||
                    val.conf_room.toString().toLowerCase().includes(search.toLowerCase()) ||
                    val.bookedBy.toLowerCase().includes(search.toLowerCase()) ||
                    val.project_name.toLowerCase().includes(search.toLowerCase()) 
                    
                    )
                    {
                        return val;
                    }
                }).map((item,index) => { 
                    return (    
        
                       
                        
                        <tr key={index}>
                            <td>{item.start_date}</td>
                            <td>{item.end_date}</td>
                           <td>{item.start_time}</td>
                            <td>{item.end_time}</td>
                            <td>{item.bookedBy}</td>
                        <td>{item.project_name}</td>
                            <td>{item.buildingName}</td>
                            <td>{(item.floorName)}</td>
                            <td>{item.conf_room}</td>
                            <td >
                               
                               <button className='button_edit' onClick={() => editDatameet(item)}><MdOutlineEdit/></button>
                                <button className='button_delete' onClick={() => removeDatameet(item)}><MdDeleteOutline/></button>
        
                            </td>
                        </tr>
                    )
                })

            }
            else{
                return employees && employees.filter(val=>{
                    if(search==="")
                    {
                        
                        return val;
                    }
                    else if(val.start_date.toLowerCase().includes(search.toLowerCase()) ||
                    val.end_date.toLowerCase().includes(search.toLowerCase()) ||
                    val.start_time.toLowerCase().includes(search.toLowerCase()) ||
                    val.end_time.toLowerCase().includes(search.toLowerCase()) ||
                    val.buildingName.toLowerCase().includes(search.toLowerCase()) ||
                    val.floorName.toLowerCase().includes(search.toLowerCase()) ||
                    val.conf_room.toString().includes(search.toLowerCase()) 
                    
                    )
                    {
                        return val;
                    }
                }).map((item,index) => { 
                    return (    
        
                       
                        
                        <tr key={index}>
                             <td>{item.start_date}</td>
                            <td>{item.end_date}</td>
                           <td>{item.start_time}</td>
                            <td>{item.end_time}</td>
                           <td>{item.buildingName}</td>
                            <td>{(item.floorName)}</td>
                            <td>{item.conf_room}</td>
                            <td >
                               
                               <button className='button_edit' onClick={() => editDatameet(item)}><MdOutlineEdit/></button>
                                <button className='button_delete' onClick={() => removeDatameet(item)}><MdDeleteOutline/></button>
        
                            </td>
                        </tr>
                    )
                })




            }
        }
    }
        else
        {
            if(meet==='Workstations')
            {
                console.log("hi")
                return <tr>
                <td></td>
                <td></td>
                <td></td>
                <td> You don't have any active bookings</td>
                <td></td>
                <td></td>
                </tr>

            }
            else
            {
                if(role==='Employee')
                {
                    
                    return <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>You don't have any active bookings </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
               
                </tr>
            
                    

                }
                else
                {
                    if(mbForHr==='Self')
                    {
                        return <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>You don't have any active bookings </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
               
                
            
            
                
                </tr>

                    }
                    else
                    {
                        return <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>You don't have any active bookings </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
               
                
            
            
                
                </tr>

                        
                    }
                    }
            }
            
            
        }
    }
    

    const handlePageClick=(res)=>{
        let currentpage=res.selected
        
        setLoading(true)
        setSelectedpage(currentpage)
        console.log(currentpage)
        const d1=localStorage.getItem('start_date')
                   const d2=localStorage.getItem('end_date')
                   const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
                   const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)

                   
                    if(role==='Project manager'& localStorage.getItem('mbfor'!=='Self'))
                    {
                      localStorage.setItem('mbfor','Team')
          
                    }
                    else if(role==='HR' & localStorage.getItem('mbfor'!=='Self'))
                    {
                      localStorage.setItem('mbfor','Others')
          
                    }
  
                
          
                    if(role==='HR' & meet==='Workstations' & mbForHr==='Self'){   axios.get(URL+'userdata',{
            params:{
                email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:currentpage,size:7
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
          .then(res=>{
          const p=res.data
          console.log(res.data)
               setEmployees(p) 
               if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
          setLoading(false)

               console.log(res.data.length)
               
            })
          }
            else if(role==='HR' & meet==='Meeting Rooms' & mbForHr==='Self'){  axios.get(URL+'roomdata',{
              params:{
                  email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:currentpage,size:7
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
          .then(res=>{
          const p=res.data
          console.log(res.data)
                 setEmployees(p)
                 if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
          setLoading(false)

                 console.log(res.data.length)
                 
              })
            }
          
              else if(role==='Project manager' & meet==='Workstations' & mbFor==='Self')
              {
                console.log(localStorage.getItem('role'))
                const email=localStorage.getItem('email')
                 axios.get(URL+'userdata',{
                   
                     headers:{
                         Authorization:`Bearer ${localStorage.getItem('token')}`,
                         'Access-Control-Allow-Origin': '*',
                         'Content-Type': 'application/json',
                         withCredentials: true,
                       },
                       
                       params:{
                         email:email,start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:currentpage,size:7
                     },
                     
                 })
                 .catch((error) => {
        
                    setError(true)
                    setLoading(false)
                })
                .then(res=>{
          const p=res.data
          
          console.log(res.data)
                        setEmployees(p)
                        if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                        setLoading(false)

                        console.log(res.data.length)
               
                     })
          
          
              }
              else if(role==='Project manager' & meet==='Meeting Rooms'& mbForHr==='Self')
              {
                axios.get(URL+'roomdata',{
                            params:{
                                email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:currentpage,size:7
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
                       .then(res=>{
                const p=res.data
                console.log(res.data)
                               setEmployees(p)
                               
                               if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                                setLoading(false)

                               console.log(res.data.length)
                            })
              }
              else if(role==='Employee' & meet==='Meeting Rooms')
              {
                axios.get(URL+'roomdata',{
                              params:{
                                  email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:currentpage,size:7
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
                         .then(res=>{
                  const p=res.data
                  console.log(res.data)
                                 setEmployees(p)
                                 if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                                setLoading(false)

                                 console.log(res.data.length)
                                
                              })
          
          
              }
              else if (role==='Employee' & meet==='Workstations')
              {
                axios.get(URL+'userdata',{
                  params:{
                      email:localStorage.getItem('email'),start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:currentpage,size:7
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
             .then(res=>{
          const p=res.data
          console.log(res.data)
                     setEmployees(p) 
                     if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                                setLoading(false)

                     console.log(res.data.length)
                     
                  })
          
              }
          
              else
              {
                { role==='HR'?  (meet==='Meeting Rooms'& mbooking!=='All'?axios.get(URL+'meeting-rooms/teams',{
                  params:{
                      project_name:localStorage.getItem('selectedproject'),
                      start_date:start_date,
                      end_date:end_date,offset:currentpage,size:7
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
              .then(res=>{
                setEmployees(res.data)
                if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                  setLoading(false)

                console.log(res.data.length)
              })
              :( meet==='Meeting Rooms' & mbooking==='All'?axios.get(URL+'meeting-rooms/teams',{
                params:{
                    start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:currentpage,size:7},
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
                
                console.log(res.data.map(item=>(item.name)))
                setEmployees(p)
                if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                  setLoading(false)

                console.log(res.data.length)
                console.log(p)
            })
              :
              //api call for pj data 
          
            (  (meet==='Workstations' & mbooking !=='All')?
            
            axios.get(URL+'Pjdata',{
                params:{project_name:localStorage.getItem('selectedproject'),
                    start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:currentpage,size:7},
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
                
                console.log(res.data.map(item=>(item.name)))
                setEmployees(p)
                if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
                  setLoading(false)

                console.log(res.data.length)
                console.log(p)
            })
            
            :axios.get(URL+'confirm_data',
            {
              params:{
                  start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:currentpage,size:7},
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
            
              setEmployees(p)
              if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
              setLoading(false)

              console.log(res.data.length)
              console.log(p)
          })
            
            
            )
              
              )
              
              )
          
              //for pm
          
          : (meet==='Meeting Rooms'?axios.get(URL+'meeting-rooms/teams',{
          params:{
              project_name:localStorage.getItem('selectedpmproject'),
              start_date:start_date,
              end_date:end_date,offset:currentpage,size:7
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
          setEmployees(res.data)
          if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
          setLoading(false)

          console.log(res.data.length)
          })
          :
          (axios.get(URL+'Pjdata',{
          params:{project_name:localStorage.getItem('hrproject'),
            start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:currentpage,size:7},
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
          
          console.log(res.data.map(item=>(item.name)))
          setEmployees(p)
          if(res.data.length!==0){setPageCount(res.data[0].totalrecords)}
          setLoading(false)

          console.log(res.data.length)
          console.log(p)
          })
          )
          
          )
          
          }
          
              }
           
          
          
          
                  
                  





    }


    if(loading){
        return (<>
        <ToastContainer/>
        <div className='loading_pos'>
          <ClipLoader size={'100px'} className='clip_pos'/>
          <img src={logo} height='auto' />
         
        </div>
        </>)
      
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
        <Context2.Provider value={{emp:[employees,setEmployees],count:[pageCount,setPageCount],load:[loading,setLoading],spage:[selectedpage,setSelectedpage],Confirmdata:[confirmdata,setConfirmData]}}>
     

            <Navbar/>
        <Hpcntr>
        <CustomSeparatormb/>
        </Hpcntr>
        


      {  (role==='HR'|role==='Project manager')?  
<div className='filters'>
            { 
       <div >
           
       <form className='pm_select_box'>
       <div className='booking'>
       <label>
           
       Bookings of  : <select value={meet} onChange={meetDropdown} >
       <option value='Workstations'>Workstations</option>
       <option value="Meeting Rooms">Meeting Rooms</option>
        </select>
       
        </label>
        </div>
        
        </form>
       
    </div>}

       {(role==='Project manager') ? 
       <div >
           
       <form className='pm_select_box'>
       <label>
       Bookings For  : <select value={mbFor} onChange={mbFordropdownSelected} >
       <option  value='Self'>Self</option>
       <option value="Team">Team</option>
        </select>
        </label>
        </form>
       
    </div>:null}


    {(role==='HR') ? 
       <div >
           
       <form className='pm_select_box'>
       <label>
       Bookings For  : <select value={mbForHr} onChange={mbForHrdropdownSelected} >
       <option value='Self'>Self</option>
       <option value="Others">Others</option>
        </select>
        </label>
        </form>
       
    </div>:null}
    {(mbFor==="Team") ?
        
        <div>
        
        <form className='pm_select_box_project'>
        <label>
        Select the Project : <select value={localStorage.getItem('hrproject')} onChange={projectdropdownSelected} >
            
        {projects.map((item,index)=>( <option key={index}   value={item}>{item}</option>))}
        </select>
        </label>
        </form>
        
        
    </div>  
  :null }
    


   
    {(mbForHr==='Others' ) ?
        
            <div>
            
            <form className='pm_select_box_project'>
            <label>
            Select the Project : <select value={localStorage.getItem('hrproject')} onChange={projectdropdownSelected} >
                <option value="All">All</option>
            {projects.map((item,index)=>( <option key={index}   value={item}>{item}</option>))}
            </select>
            </label>
            </form>
            
            
        </div>  
      :null }
     
       {
        <div><MDaterange/></div>
       }
       

       
        </div>:null
      }

{  (role==='Employee')?  
<div className='filters2'>
            { 
       <div >
           
       <form className='pm_select_box' >
           <div className='booking'>
       <label>
       Bookings of  : <select value={meet} onChange={meetDropdown} >
       <option value='Workstations'>Workstations</option>
       <option value="Meeting Rooms">Meeting Rooms</option>
        </select>
        </label>
        </div>
        
        </form>
       
    </div>}

       {(role==='Project manager') ? 
       <div className='bookingsof'>
           
       <form className='pm_select_box'>
       <label>
       Bookings For  : <select value={mbFor} onChange={mbFordropdownSelected} >
       <option  value='Self'>Self</option>
       <option value="Team">Team</option>
        </select>
        </label>
        </form>
       
    </div>:null}


    {(role==='HR') ? 
       
           
       <form className='pm_select_box'>
           <div className='bookingsof'>
       <label>
       Bookings For  : <select value={mbForHr} onChange={mbForHrdropdownSelected} >
       <option value='Self'>Self</option>
       <option value="Others">Others</option>
        </select>
        </label>
        </div>
        </form>
       
    :null}
    {(mbFor==="Team") ?
        
        <div>
        
        <form className='pm_select_box_project'>
        <label>
        Select the Project : <select value={localStorage.getItem('hrproject')} onChange={projectdropdownSelected} >
            
        {projects.map((item,index)=>( <option key={index}   value={item}>{item}</option>))}
        </select>
        </label>
        </form>
        
        
    </div>  
  :null }
    


   
    {(mbForHr==='Others' ) ?
        
            <div>
            
            <form className='pm_select_box_project'>
            <label>
            Select the Project : <select style={{border:'2px solid black'}} value={localStorage.getItem('hrproject')} onChange={projectdropdownSelected} >
                <option value="All">All</option>
            {projects.map((item,index)=>( <option key={index}   value={item}>{item}</option>))}
            </select>
            </label>
            </form>
            
            
        </div>  
      :null }
    
       {
        <div><MDaterange/></div>
       }
       

    
        </div>:null
      }
      


        {meet!=='Workstations'?<div className='search_box'>
        <input type='text' className='search' placeholder='Search name , building and floor' style={{marginTop:75,marginBottom:20,marginLeft:20,height:39,border:'2px solid black'}} onChange={e=>{setSearch(e.target.value)}}></input>

        </div>:null}


{ (role==='Employee' & meet==='Meeting Rooms'|(role==='HR' & mbForHr==='Self' & meet==='Meeting Rooms') |(role==='Project manager'& mbFor==='Self'& meet==='Meeting Rooms')) ?
<>
                  

                <div className='tableapp' ref={componentRef}>
                <table className='table_mb'>
                <thead>
                    
                    <tr>{renderHeader()} <th>EDIT/DELETE</th> </tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
            </div></>
            :null}



            { (mbFor==='Team' & meet==='Meeting Rooms') ?
                 <>
                 <div className='tableapp' ref={componentRef}>
                 <table className='table_mb'>
                 <thead>
                     <tr>{renderHeader()} <th>EDIT/DELETE</th></tr>
                     
                 </thead>
                 <tbody>
                     {renderBody()}
                 </tbody>
             </table>
             </div></>:null
            }

            

            { (mbForHr==='Others' & selectedproject!=='All' & meet==='Meeting Rooms') ? 
                <>
                <div className='tableapp' ref={componentRef}>
                <table className='table_mb'>
                <thead>
                <tr>{renderHeader()}<th>EDIT/DELETE</th></tr>
                    
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
            </div></>:null
            }

{ (mbForHr==='Others' & selectedproject==='All' & meet==='Meeting Rooms') ? 
                <>
                <div className='tableapp' ref={componentRef}>
                <table className='table_mb'>
                <thead>
                <tr>{renderHeader()}<th>EDIT/DELETE</th> </tr>
                    
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
            </div></>:null
            }
             {meet==='Workstations'?<div>
            <button className='edit_all' onClick={handleTeamEdit}>Edit Booking</button>
            <button className='delete_all' onClick={handleTeamDelete}>Delete Booking</button>
            </div>:null}


            {(meet==='Workstations') ?<>
            <div className='search_box'>
            <GlobalFilter className='global_filter'  filter={globalFilter}   setFilter={setGlobalFilter}/>
            </div>
           
             <div className='tableapp' ref={componentRef}>

            <table className='table_mb' {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup)=>(
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                
                                {
                                    
                                    headerGroup.headers.map((column)=>
                                    (
                                        <th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                          

                                        </th>

                                    ))
                                }
                            
                            
                        
                    </tr>

                        ))
                    }
                    
                </thead>
                <tbody {...getTableBodyProps()}>
                {employees.length===0  ?<tr>
                <td></td>
                <td></td>
                <td></td>
                <td> You don't have any active bookings</td>
                <td></td>
                <td></td>
                </tr>  
                
              :null}
                    {
                        page.map(row=>{
                            prepareRow(row)
                            return(
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell=>{
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                    
                        
                    </tr>
                            )
                        })
                    }
                    

                    
                </tbody>
                
            </table>
          
            </div></>

            :null}



            {
                 <div style={{marginTop:'19px'}}>
                 <ReactPaginate
                 previousLabel={'<'}
                 nextLabel={'>'}
                 breakLabel={'...'}
                 pageCount={Math.ceil(pageCount/7)}
                 marginPagesDisplayed={3}
                 pageRangeDisplayed={6}
                 onPageChange={handlePageClick}
                 containerClassName={'pagination'}
                 pageClassName={'page-item'}
                 pageLinkClassName={'page-link'} 
                 previousClassName={'page-item'}
                 previousLinkClassName={'page-link'}
                 nextClassName={'page-item'}
                 nextLinkClassName={'page-link'}
                 breakClassName={'page-item'}
                 breakLinkClassName={'page-link'}
                 activeClassName={'active'}
                 disabledClassName={'disable'}
                 forcePage={selectedpage}
                 
         
                 />
             </div>
            }

            
       
        {role==='HR'?    <div className='printbutton_mb' style={{textAlign:"center"}}> <button onClick={handlePrint} className="print__button" style={{backgroundColor:"#0892d0",fontFamily:"sans-serif",fontSize :"20px",color:"#ffffff",border:'none',borderRadius:"3px"}}>  Download   <FaDownload/></button> 
       </div>:null}
            
            <ToastContainer/>
            </Context2.Provider>
    )}
      }
}


export default Table
