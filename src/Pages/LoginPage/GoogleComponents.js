import React, {useState } from "react";
import { GoogleLogin } from "react-google-login";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./Loginpage.css"
import Loading_spinner from "../../components/Loading_spinner/Loading_spinner";

const CLIENT_ID ="930005239586-fte2b49u33p50g5pprcjng72h0fp4rgj.apps.googleusercontent.com";
const password='*';
function GoogleComponents() {
 
const[isLoggedIn,setisLoggedIn]=useState()
// const email='Vinayakjhr@gmail.com'
// var currentDate = new Date(new Date().getTime()+ 24 * 60 * 60 * 1000));
var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
const date=(currentDate).toISOString().split('T')[0]
const[token,setToken]=useState()
const date_tomorrow=(currentDate).toISOString().split('T')[0]
// localStorage.setItem('name','User')

const responseGoogleSuccess = (response) => {
  console.log(response);
    localStorage.setItem('login',true)
    setisLoggedIn(true);
     
   
    axios.post(`http://72a6-106-51-81-179.ngrok.io/authenticate`,{email:response.profileObj.email ,password:'*'})
    .then(res =>{ 
      const p=res.data
      console.log(res.data)
      localStorage.setItem('name',response.profileObj.name)
      localStorage.setItem('start_date',date)
      localStorage.setItem('date',date)
      localStorage.setItem('date_tomorrow',date_tomorrow)
      localStorage.setItem('end_date',date)
      localStorage.setItem('start_time','09:00')
      localStorage.setItem('end_time','10:00')
      localStorage.setItem('email',response.profileObj.email)

      localStorage.setItem('meeting_status','false')
      localStorage.setItem('token',p)
console.log(localStorage.getItem('token'))
const k=localStorage.getItem('token')
const authAxios=axios.create({
  baseURL:'http://72a6-106-51-81-179.ngrok.io/email_get_role_new',
  headers:{
    Authorization:`Bearer ${k}`,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    withCredentials: true,
  }
})
     authAxios.get('http://72a6-106-51-81-179.ngrok.io/email_get_role_new')
      .then(res=>{console.log(res.data)
      localStorage.setItem('role',res.data)
      }).then(response=>{navigate('/home') })
      
    })  
  //   setTimeout(function(){
  //     navigate('/home') 
  // }, 2000);
       
};

const responseGoogleError = (response) => {
  console.log(response);
};

const navigate=useNavigate()


  return (
    <div >
        
        <div >
          { isLoggedIn ? (
            <div>

            </div>
          ) : (
            <GoogleLogin className="g-signin"
              clientId={CLIENT_ID}
              buttonText="Sign In with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
      </div>
  );
}

export default GoogleComponents