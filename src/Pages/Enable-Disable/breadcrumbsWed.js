import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Navigate } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
    return(Navigate(event))
}

export default function CustomSeparatorWed() {
  const breadcrumbs = [
    <Link to="/home" underline="hover" key="1" color="#0892d0" href="/home" fontFamily={ 'Gothic A1'} fontWeight={600}>
      Home
    </Link>,
    <Link to="/building" underline="hover" key="2" color="#0892d0" href='/buildinged' fontFamily={ 'Gothic A1'} fontWeight={600}>
    Building
  </Link>,
  <Link to="/floor" underline="hover" key="2" color="#0892d0" href='/floor_ed' fontFamily={ 'Gothic A1'} fontWeight={600}>
  Floor
</Link>,
    <Link
      underline="hover"
      key="3"
      color="#0892d0"
      href="/Disable"
      onClick={handleClick}
      fontFamily={ 'Gothic A1'} fontWeight={600}    >
      Enable/Disable
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