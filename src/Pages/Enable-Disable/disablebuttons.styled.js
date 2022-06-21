import styled from "styled-components";
import { BookingButton } from "../../components/BookingButton";
export const StyledConfirmButton=styled(BookingButton)
`
border-radius: 6px;


  cursor: pointer;
  font-size: 16px;

  padding: 15px 15px;
  background-color:#3CB043;
  color:white;
  position: absolute;
  top: 70%;
  left: 52.5%;
  font-family: 'Lato', sans-serif;

  &:hover{
    opacity:1;
    transform: scale(0.98);
}
 

`;

export const StyledCancelButton=styled(BookingButton)
`
border-radius: 6px;


  cursor: pointer;
  font-size: 16px;
  width:16%;
 
  padding: 15px 15px;
  background-color:#E35335;
  color:white;
  position: absolute;
  top: 70%;
  left: 30%;
  font-family: 'Lato', sans-serif;

  &:hover{
    opacity:1;
    transform: scale(0.98);
}
 

`;