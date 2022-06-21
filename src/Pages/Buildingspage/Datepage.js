import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../App.css";
import "../../Pages/Buildingspage/Datepage.css"
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
// import {  FaCalendarDay} from 'react-icons/fa';

function Datepage() {
  const [checkInDate, setCheckInDate] = useState(null);
  

  const handleCheckInDate = (date) => {
    setCheckInDate(date);

    localStorage.setItem("date",moment(checkInDate).format("LL")); 
    
  };

  
  return (
    <div >
      <div className="input-container" >
        <div >
          
          <p className="d"></p>
          <label>
            <FiCalendar/>
          </label>
          <DatePicker
          
            selected={checkInDate}
            minDate={new Date()}
            onChange={handleCheckInDate}
            placeholderText='Please select the date'
            label={FiCalendar}
            // ariaLabelClose={FiCalendar}
         >
           
         </DatePicker>
        </div>
        
      </div>
      {checkInDate && (
        <div className="summary">
         
        </div>
      )}
    </div>
  );
}

export default Datepage;