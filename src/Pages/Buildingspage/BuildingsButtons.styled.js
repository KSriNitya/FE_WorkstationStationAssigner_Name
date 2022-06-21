import styled from "styled-components"
import {BookingButton} from "../../components/BookingButton";




export const StyledBButton=styled(BookingButton)
`
border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 1px 5px;
  background-color:white;
  color:#0892d0;
  align:center;
  margin: 0;
  position: absolute;
  top: 20%;
  left: 2%;
  font-family: 'Quicksand', sans-serif;
  height:25px;
  width:25px;
 
   
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
  padding: 1px 5px;
  background-color:#FFFFFF;
  color:#0829d0;
  align:center;
  margin: 0;
  position: absolute;
  top: 20%;
  left: 5%;
  font-family: 'Quicksand', sans-serif;
  width:30px;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;


export const StyledCBButton=styled(BookingButton)
`
border-radius: 50px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 60px;
  background-color:white;
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 20%;
  left: 43%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const StyledMBButton=styled(BookingButton)
`
border-radius: 50px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 55px;
  background-color:white;
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 30%;
  left: 43%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const StyledEDButton=styled(BookingButton)
`
border-radius: 50px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 60px;
  background-color:white;
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 40%;
  left: 43%;
  font-family: 'Quicksand', sans-serif;

   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const BLabelm=styled.label`
font-size:18px;
color:${({color})=>color};
cursor: pointer;
position: relative;
// position : absolute;

top:46%;
// left : 10%;

text-align: center;

`

export const BLabel=styled.label`
font-size:15px;
color:${({color})=>color};
cursor: pointer;
`
export const LButtonLabel=styled.label`
font-size:15px;
color:white;
cursor: pointer;
`

export const StyledB1B=styled(BookingButton)
`

top: 30%;
left: 3%;
border-radius: 10px;
  // border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 80px 20px;
  // background-color:${({bg})=>bg};
  backdrop-filter: blur(14px);
background-color: ${({bg})=>bg};
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  
  font-family: 'Quicksand', sans-serif;
  width: 200px;
  height: 300px;
   
  &:hover{
      opacity:0.8;
      transform: scale(0.98);
  }
`;
export const StyledB2B=styled(BookingButton)
`
  top: 30%;
  left: 23%;
  border-radius: 10px;
  // border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 80px 20px;
  background-color:${({bg})=>bg};
  backdrop-filter: blur(14px);
// background-color: rgba(255, 255, 255, 0.8);
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  
  font-family: 'Quicksand', sans-serif;
  width: 200px;
  height: 300px;
  &:hover{
      opacity:0.8;
      transform: scale(0.98);
  }
`;
export const StyledB3B=styled(BookingButton)
`
  
  top: 30%;
  left: 43%;
  border-radius: 10px;
  // border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 80px 20px;
  background-color:${({bg})=>bg};
  backdrop-filter: blur(14px);
// background-color: rgba(255, 255, 255, 0.8);
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  
  font-family: 'Quicksand', sans-serif;
  width: 200px;
  height: 300px;
 
   
  &:hover{
      opacity:0.8;
      transform: scale(0.98);
  }
`;
export const StyledB4B=styled(BookingButton)
`
border-radius: 10px;
  // border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 80px 20px;
  background-color:${({bg})=>bg};
  backdrop-filter: blur(14px);
// background-color: rgba(255, 255, 255, 0.8);
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 30%;
  left: 63%;
  font-family: 'Quicksand', sans-serif;
  width: 200px;
  height: 300px;
  // background-image: linear-gradient(white,pink);
 
   
  &:hover{
      opacity:0.8;
      transform: scale(0.98);
  }
`;
export const StyledB5B=styled(BookingButton)
`
border-radius: 10px;
  // border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 80px 20px;
  background-color:${({bg})=>bg};
  backdrop-filter: blur(14px);
// background-color: rgba(255, 255, 255, 0.8);
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 30%;
  left: 83%;
  font-family: 'Quicksand', sans-serif;
  width: 200px;
  height: 300px;
  // background-image: linear-gradient(white,pink);
 
   
  &:hover{
      opacity:0.8;
      transform: scale(0.98);
  }
`;

export const StyledEnableB1=styled(BookingButton)
`
border-radius: 10px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 30px;
  // background-color:#CE2029;
  background-color: #B31B1B;
  // backdrop-filter: blur(14px);
  // background-color: rgba(244, 50, 50, 0.8);
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 85%;
  left: 6%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:0.8;
      transform: scale(0.98);
  }
`;
export const StyledEnableB2=styled(BookingButton)
`
border-radius: 10px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 30px;
  background-color:#B31B1B;
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 85%;
  left: 26%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const StyledEnableB3=styled(BookingButton)
`
border-radius: 10px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 30px;
  background-color:#B31B1B;
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 85%;
  left:46%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const StyledEnableB4=styled(BookingButton)
`
border-radius: 10px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 30px;
  background-color:#B31B1B;
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 85%;
  left: 66%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;
export const StyledEnableB5=styled(BookingButton)
`
border-radius: 10px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 30px;
  background-color:#B31B1B;
  color:black;
  align:center;
  margin: 0;
  position: absolute;
  top: 85%;
  left: 86%;
  font-family: 'Quicksand', sans-serif;
 
   
  &:hover{
      opacity:1;
      transform: scale(0.98);
  }
`;