import styled from "styled-components"
import { BookingButton} from "./BookingButton";




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



export const ButtonLabel=styled.label`
font-size:15px;
color:${({color})=>color};
cursor: pointer;`

export const ButtonLabels=styled.label`
font-size:25px;
color:white;
position: absolute;
top:15px;
left:40%;

`



