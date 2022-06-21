import styled from "styled-components";
import { BookingButton } from "../../../components/BookingButton";
export const StyledConfirmButton=styled(BookingButton)
`
border-radius: 6px;


  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 15px;
  background-color:#3CB043;
  color:white;
  position: absolute;
  top: 78%;
  left: 51.5%;
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
  font-weight: 700;
  padding: 12px 20px;
  background-color:#E35335;
  color:white;

  position: absolute;
  top: 78%;
  left: 40%;
  font-family: 'Lato', sans-serif;


  &:hover{
    opacity:1;
    transform: scale(0.98);
}

`;

export const StyledConfirmButtonNotPm=styled(BookingButton)
`
border-radius: 6px;


  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 15px;
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
export const StyledCancelButtonNotPm=styled(BookingButton)
`
border-radius: 6px;
  
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 20px;
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

export const StyledHButton=styled(BookingButton)
`
border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 6px 5px;
  background-color:#FFFFFF;
  color:#0829d0;
  align:center;
  margin: 0;
  position: absolute;
  top: 14%;
  left: 3%;
  font-family: 'Quicksand', sans-serif;
  width:30px;
  height:30px;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const StyledBButton=styled(BookingButton)
`
border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 6px 5px;
  background-color:white;
  color:#0892d0;
  align:center;
  margin: 0;
  position: absolute;
  top: 14%;
  left: 1%;
  font-family: 'Quicksand', sans-serif;
  height:30px;
  width:30px;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const BLabel=styled.label`
font-size:15px;
color:${({color})=>color};
cursor: pointer;
`