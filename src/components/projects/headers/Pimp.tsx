import React from 'react'
import pimp from '../../../assets/projects/pimp/pimp.jpg'

function Pimp() {
  return (
    <div className='transform-none flex flex-wrap justify-center content-center pointer-events-none mt-2'>
      <img src={pimp} alt="" className='w-28'/>
    </div>
  )
}

export default Pimp
