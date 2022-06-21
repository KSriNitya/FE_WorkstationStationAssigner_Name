import styled from "styled-components";

const DateContainer=styled.div`
width: 460px;
box-shadow: 0 15px 25px rgba(129, 124, 124, 0.2);
height: 65px;
border-radius: 5px;
// backdrop-filter: blur(14px);
background-color: rgba(255, 255, 255, 0.1);
padding: 4px;
// text-align: center;
position:absolute;
top:20%;
left:50%;

transform:translate(-50%,-35%);
display: flex ;
justify-content: space-around;
flex-direction: row;
flex-wrap: wrap;
position: center;
padding-left: 5% ;
padding-right: 5%;
`


export default DateContainer;