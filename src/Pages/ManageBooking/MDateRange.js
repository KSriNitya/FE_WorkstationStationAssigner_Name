import React, { useState } from "react";
import DatePicker from "react-datepicker";
import '../../Pages/Buildingspage/Rdp.css'
import { ToastContainer,toast } from 'react-toastify'


import { Context2 } from "./managebooking";
import axios from "axios";

const Daterange = () => {
  
const {emp,count,load,spage}=React.useContext(Context2)
const [employees,setEmployees]=emp
const [pageCount,setPageCount]=count
const [selectedpage,setSelectedpage]=spage
const [loading,setLoading]=load


const meet=localStorage.getItem('meet')
const mbooking=localStorage.getItem('mbooking')
  const [startDate, setStartDate] = useState(new Date(localStorage.getItem('start_date')));
  const [endDate, setEndDate] = useState(new Date(localStorage.getItem('end_date')));
  const mbFor=localStorage.getItem('mbFor')
  const mbForHr=localStorage.getItem('mbForHr')
  localStorage.setItem('start_date',startDate.toISOString().split('T')[0])
  localStorage.setItem('end_date',endDate.toISOString().split('T')[0])


  const role=localStorage.getItem('role')


 
  return (
    <>
    {/* <div>
      <h1>{today}</h1>
    </div> */}
    <div className='From_To'>
      
      <div className="from_text">From </div><DatePicker className="from_date1"
      
        selected={startDate}
        onChange={(date) => {
          setLoading(true)

          if(role==='Project manager'& localStorage.getItem('mbfor'!=='Self'))
          {
            localStorage.setItem('mbfor','Team')

          }
          else if(role==='HR' & localStorage.getItem('mbfor'!=='Self'))
          {
            localStorage.setItem('mbfor','Others')

          }
         
          if(date>endDate)
          {
            setEndDate(date)
            localStorage.setItem('end_date',(date).toISOString().split('T')[0])

          }
         
          console.log("Hi")

            
            setStartDate(date)
          localStorage.setItem('start_date',(date).toISOString().split('T')[0])

  //           const d1=localStorage.getItem('start_date')
  // const d2=localStorage.getItem('end_date')
  // const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
  // const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
          console.log((date).toISOString().split('T')[0])

          if(role==='HR' & meet==='Workstations' & mbForHr==='Self'){   axios.get('http://72a6-106-51-81-179.ngrok.io/userdata',{
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
.then(res=>{
const p=res.data
console.log(res.data)
     setEmployees(p) 
     if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)
     console.log(res.data.length)
     
  })
}
  else if(role==='HR' & meet==='Meeting Rooms' & mbForHr==='Self'){  axios.get('http://72a6-106-51-81-179.ngrok.io/roomdata',{
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
.then(res=>{
const p=res.data
console.log(res.data)
       setEmployees(p)
        if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

       console.log(res.data.length)
       
    })
  }

    else if(role==='Project manager' & meet==='Workstations' & mbFor==='Self')
    {
      console.log(localStorage.getItem('role'))
      const email=localStorage.getItem('email')
       axios.get('http://72a6-106-51-81-179.ngrok.io/userdata',{
         
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
      .then(res=>{
const p=res.data

console.log(res.data)
              setEmployees(p)
               if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

              console.log(res.data.length)
     
           })


    }
    else if(role==='Project manager' & meet==='Meeting Rooms'& mbForHr==='Self')
    {
      axios.get('http://72a6-106-51-81-179.ngrok.io/roomdata',{
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
             .then(res=>{
      const p=res.data
      console.log(res.data)
                     setEmployees(p)
                     
                      if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

                     console.log(res.data.length)
                  })
    }
    else if(role==='Employee' & meet==='Meeting Rooms')
    {
      axios.get('http://72a6-106-51-81-179.ngrok.io/roomdata',{
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
               .then(res=>{
        const p=res.data
        console.log(res.data)
                       setEmployees(p)
                        if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

                       console.log(res.data.length)
                      
                    })


    }
    else if (role==='Employee' & meet==='Workstations')
    {
      axios.get('http://72a6-106-51-81-179.ngrok.io/userdata',{
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
   .then(res=>{
const p=res.data
console.log(res.data)
           setEmployees(p) 
            if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

           console.log(res.data.length)
           
        })

    }

    else
    {
      { role==='HR'?  (meet==='Meeting Rooms'& mbooking!=='All'?axios.get('http://72a6-106-51-81-179.ngrok.io/meeting-rooms/teams',{
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
    .then(res=>{
      setEmployees(res.data)
       if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

      console.log(res.data.length)
    })
    :( meet==='Meeting Rooms' & mbooking==='All'?axios.get('http://72a6-106-51-81-179.ngrok.io/meeting-rooms/teams',{
      params:{
          start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
      headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true,
        }
  })
  .then(res=>{console.log(res.data)
      const p=(res.data)
      
      console.log(res.data.map(item=>(item.name)))
      setEmployees(p)
       if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

      console.log(res.data.length)
      console.log(p)
  })
    :
    //api call for pj data 

  (  (meet==='Workstations' & mbooking !=='All')?
  
  axios.get('http://72a6-106-51-81-179.ngrok.io/Pjdata',{
      params:{project_name:localStorage.getItem('selectedproject'),
          start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
      headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true,
        }
  })
  .then(res=>{console.log(res.data)
      const p=(res.data)
      
      console.log(res.data.map(item=>(item.name)))
      setEmployees(p)
       if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

      console.log(res.data.length)
      console.log(p)
  })
  
  :axios.get('http://72a6-106-51-81-179.ngrok.io/confirm_data',
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
.then(res=>{console.log(res.data)
    const p=(res.data)
  
    setEmployees(p)
     if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)
    console.log(res.data.length)
    console.log(p)
})
  
  
  )
    
    )
    
    )

    //for pm

: (meet==='Meeting Rooms'?axios.get('http://72a6-106-51-81-179.ngrok.io/meeting-rooms/teams',{
params:{
    project_name:localStorage.getItem('selectedpmproject'),
    start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7
},
headers:{
    Authorization:`Bearer ${localStorage.getItem('token')}`,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    withCredentials: true,
  }
})
.then(res=>{console.log(res.data)
setEmployees(res.data)
 if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

console.log(res.data.length)
})
:
(axios.get('http://72a6-106-51-81-179.ngrok.io/Pjdata',{
params:{project_name:localStorage.getItem('hrproject'),
  start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
headers:{
  Authorization:`Bearer ${localStorage.getItem('token')}`,
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  withCredentials: true,
}
})
.then(res=>{console.log(res.data)
const p=(res.data)

console.log(res.data.map(item=>(item.name)))
setEmployees(p)
 if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)
console.log(res.data.length)
console.log(p)
})
)

)

}

    }
 



        
        }
        
        }
        
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        maxDate={new Date().getTime() + 60*24 * 60 * 60 * 1000}
        dateFormat='dd/MM/yyyy'
        popperPlacement="auto" 
      />
      
      <div className="to_mtext">To </div><DatePicker className="to_mdate"
        selected={endDate}
        onChange={(date) => {
          setLoading(true)
          
          if(localStorage.getItem('mbFor'!=='Self'))
          {
            console.log("Hi")
            localStorage.setItem('mbFor','Team')

          }
          else if(role==='HR' & localStorage.getItem('mbForHr'!=='Self'))
          {
            console.log("Bi")
            localStorage.setItem('mbForHr','Others')

          }
          setEndDate(date)
          localStorage.setItem('end_date',(date).toISOString().split('T')[0])
          const d1=localStorage.getItem('start_date')
          const d2=localStorage.getItem('end_date')
          const start_date=d1.substring(8)+d1.charAt(7)+d1.substring(5,8)+d1.substring(0,4)
          const end_date=d2.substring(8)+d2.charAt(7)+d2.substring(5,8)+d2.substring(0,4)
          
          console.log((date).toISOString().split('T')[0])
          
          console.log((date).toISOString().split('T')[0])
          
          if(role==='HR' & meet==='Workstations' & mbForHr==='Self'){   axios.get('http://72a6-106-51-81-179.ngrok.io/userdata',{
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
          .then(res=>{
          const p=res.data
          console.log(res.data)
               setEmployees(p) 
                if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

               console.log(res.data.length)
               
            })
          }
            else if(role==='HR' & meet==='Meeting Rooms' & mbForHr==='Self'){  axios.get('http://72a6-106-51-81-179.ngrok.io/roomdata',{
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
          .then(res=>{
          const p=res.data
          console.log(res.data)
                 setEmployees(p)
                  if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

                 console.log(res.data.length)
                 
              })
            }
          
              else if(role==='Project manager' & meet==='Workstations' & mbFor==='Self')
              {
                console.log(localStorage.getItem('role'))
                const email=localStorage.getItem('email')
                 axios.get('http://72a6-106-51-81-179.ngrok.io/userdata',{
                   
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
                .then(res=>{
         const p=res.data
         
         console.log(res.data)
                        setEmployees(p)
                         if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

                        console.log(res.data.length)
               
                     })
          
          
              }
              else if(role==='Project manager' & meet==='Meeting Rooms'& mbFor==='Self')
              {
                axios.get('http://72a6-106-51-81-179.ngrok.io/roomdata',{
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
             .then(res=>{
      const p=res.data
      console.log(res.data)
                     setEmployees(p)
                     
                      if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

                     console.log(res.data.length)
                  })
              }
              else if(role==='Employee' & meet==='Meeting Rooms')
              {
                axios.get('http://72a6-106-51-81-179.ngrok.io/roomdata',{
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
                         .then(res=>{
                  const p=res.data
                  console.log(res.data)
                                 setEmployees(p)
                                  if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

                                 console.log(res.data.length)
                                
                              })
          
          
              }
              else if (role==='Employee' & meet==='Workstations')
              {
                axios.get('http://72a6-106-51-81-179.ngrok.io/userdata',{
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
             .then(res=>{
          const p=res.data
          console.log(res.data)
                     setEmployees(p) 
                      if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

                     console.log(res.data.length)
                     
                  })
          
              }
          
              else
              {
                const p=localStorage.getItem('hrproject')
                { role==='HR'?  (meet==='Meeting Rooms'& mbooking!=='All'?axios.get('http://72a6-106-51-81-179.ngrok.io/meeting-rooms/teams',{
                  params:{
                      
                      start_date:start_date,
                      end_date:end_date,project_name:p,offset:0,size:7
                  },
                  headers:{
                      Authorization:`Bearer ${localStorage.getItem('token')}`,
                      'Access-Control-Allow-Origin': '*',
                      'Content-Type': 'application/json',
                      withCredentials: true,
                    }
              })
              .then(res=>{
                setEmployees(res.data)
                 if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

                console.log(res.data.length)
              })
              :( meet==='Meeting Rooms' & mbooking==='All'?axios.get('http://72a6-106-51-81-179.ngrok.io/meeting-rooms/teams',{
                params:{
                    start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    withCredentials: true,
                  }
            })
            .then(res=>{console.log(res.data)
                const p=(res.data)
                
                console.log(res.data.map(item=>(item.name)))
                setEmployees(p)
                 if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

                console.log(res.data.length)
                console.log(p)
            })
              :
              //api call for pj data 
          
            (  (meet==='Workstations' & mbooking !=='All')?
            
            axios.get('http://72a6-106-51-81-179.ngrok.io/Pjdata',{
                params:{project_name:localStorage.getItem('selectedproject'),
                    start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    withCredentials: true,
                  }
            })
            .then(res=>{console.log(res.data)
                const p=(res.data)
                
                console.log(res.data.map(item=>(item.name)))
                setEmployees(p)
                 if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

                console.log(res.data.length)
                console.log(p)
            })
            
            :axios.get('http://72a6-106-51-81-179.ngrok.io/confirm_data',
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
          .then(res=>{console.log(res.data)
              const p=(res.data)
            
              setEmployees(p)
               if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

              console.log(res.data.length)
              console.log(p)
          })
            
            
            )
              
              )
              
              )
          
              //for pm
          
          : (meet==='Meeting Rooms'?axios.get('http://72a6-106-51-81-179.ngrok.io/meeting-rooms/teams',{
          params:{
              project_name:localStorage.getItem('selectedpmproject'),
              start_date:start_date,
              end_date:end_date,offset:0,size:7
          },
          headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`,
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              withCredentials: true,
            }
          })
          .then(res=>{console.log(res.data)
          setEmployees(res.data)
           if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

          console.log(res.data.length)
          })
    
          :
          (axios.get('http://72a6-106-51-81-179.ngrok.io/Pjdata',{
          params:{project_name:localStorage.getItem('hrproject'),
            start_date:localStorage.getItem('start_date'),end_date:localStorage.getItem('end_date'),offset:0,size:7},
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            withCredentials: true,
          }
          })
          .then(res=>{console.log(res.data)
          const p=(res.data)
          
          console.log(res.data.map(item=>(item.name)))
          setEmployees(p)
           if(res.data.length!==0){setPageCount(res.data[0].totalrecords) 
      setSelectedpage(0)}
      setLoading(false)

          console.log(res.data.length)
          console.log(p)
          })
          )
          
          )
          
          }
          
              }  }     
        }
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={new Date().getTime() + 60*24 * 60 * 60 * 1000}
        dateFormat='dd/MM/yyyy'
        popperPlacement="left"
      />
      </div>
      
    </>
  );
  <ToastContainer/>
        }
       
  


export default Daterange


