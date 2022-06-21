import React from 'react'

function Confirmation() {
  return (
    <div className='dialog_background'>
        <div className='dialog_container'>
            <button>X</button>
            <div className='dialog_title'>
                <h1>Are you sure</h1>
            </div>
                <div className='dialog_footer'>
                    <button>Cancel</button>
                    <button>Continue</button>
                </div>
            
        </div>
    </div>
  )
}

export default Confirmation