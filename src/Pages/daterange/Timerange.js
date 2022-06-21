import React, { useState }from 'react'

function Timerange() {

    const [value, setValue] = useState();
const [endvalue, setendValue] = useState(localStorage.getItem('end_time'));



  return (
    <div>

        <input type='time' id="start_time" min="09:00" max="18:00" value="10:00" required>

        </input>

    </div>
  )
}

export default Timerange