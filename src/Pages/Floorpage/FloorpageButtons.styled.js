import styled from "styled-components"
import {BookingButton} from "../../components/BookingButton";


export const StyledFloor1Button=styled(BookingButton)
`
border-radius: 10px;
  // border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 25px 175px;
  // background-color:white;
  background-color:${({bg})=>bg};
  color:black;
  //  align-items:left;
  margin: 0;
  position: absolute;
  top: 25%;
  left: 10%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const StyledFloor2Button=styled(BookingButton)
`
border-radius: 10px;
  // border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 25px 175px;
  // background-color:white;
  background-color:${({bg})=>bg};
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 47%;
  left: 10%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const StyledFloor3Button=styled(BookingButton)
`
border-radius: 10px;
  // border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 25px 175px;
  // background-color:white;
  background-color:${({bg})=>bg};
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 69%;
  left: 10%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;

export const StyledEnableButton1=styled(BookingButton)
`
border-radius: 10px;
  // border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 25px;
  background-color: #B31B1B;
  color:white;
  align:center;
  margin: 0;
  position: absolute;
  top: 25%;
  left: 72%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const StyledEnableButton2=styled(BookingButton)
`
border-radius: 10px;
  // border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 25px;
  background-color: #B31B1B;
  color:white;
  align:center;
  margin: 0;
  position: absolute;
  top: 47%;
  left: 72%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const StyledEnableButton3=styled(BookingButton)
`
border-radius: 10px;
  // border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 25px;
  background-color: #B31B1B;
  color:white;
  align:center;
  margin: 0;
  position: absolute;
  top: 69%;
  left: 72%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;

export const StyledHomeButton=styled(BookingButton)
`
border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 7px;
  background-color:white;
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 17%;
  left: 5%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const StyledBackButton=styled(BookingButton)
`
border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 10px;
  background-color:white;
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 17%;
  left: 1%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;

export const ButtonLabel=styled.label`
font-size:15px;

color: blue;
cursor: pointer;`

export const fbl=styled.label`
font-size:15px;
float:left;
color: blue;
cursor: pointer;

`