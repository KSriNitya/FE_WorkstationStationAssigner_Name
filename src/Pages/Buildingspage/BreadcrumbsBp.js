import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Navigate } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
    return(Navigate(event))
}
const handleHome=(event)=>{

  localStorage.setItem('edit',false)
  localStorage.setItem('editteam',false)
  return(Navigate(event))
  }

export default function CustomSeparator() {
  const breadcrumbs = [
    <Link to='/home'  onClick={handleHome} underline="hover" key="1" color="#0892d0" href="/home" fontFamily={ 'Gothic A1'} fontWeight={600} >
      Home
    </Link>,
    
    <Link to = '/building' underline="hover" key="2" color="#0892d0" href="/home" onClick={handleClick} fontFamily={ 'Gothic A1'} fontWeight={600} >
      Building
    </Link>,
    
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        fontSize="18px"
        separator={'>'}
        aria-label="breadcrumb"
        
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}