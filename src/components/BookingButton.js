import React from 'react'

export function BookingButton({className,buttonLabel,hc}) {
    
  return (<button className={className} onClick={hc}>{buttonLabel}</button>)
}
