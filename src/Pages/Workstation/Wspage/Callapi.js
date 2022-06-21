import React from 'react'
import Axios from 'axios'

function Callapi() {
  const getData=()=>{
    Axios.get("https://59bc-27-100-13-181.ngrok.io/add").then((response)=>{console.log(response)})
  }
  return (
    <div><button onClick={getData}>Get Data</button></div>
  )
}

export default Callapi