import React from 'react'


export const GlobalFilter=({filter,setFilter})=> {
   
  return(<span>
 
    <input placeholder={"Search name , building and floor"} style={{marginTop:75,marginBottom:20,marginLeft:20,height:39,border:'2px solid black'}} value={filter || ''} onChange={(e)=>setFilter(e.target.value)}></input>
</span>)
}
