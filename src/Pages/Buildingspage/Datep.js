import moment from 'moment';
import React from 'react'
import { useState } from 'react'


function Datep() {
    const [date,setDate]=useState();
    console.log("date",date);
   

  return (
    <>
    <input type="date" onChange={e=>setDate(e.target.value)} />
    </>
  )
}

export default Datep