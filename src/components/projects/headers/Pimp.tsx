import React from 'react'
import pimp from '../../../assets/projects/pimp/pimp.jpg'

function Pimp() {
  return (
    <div className='transform-none flex flex-wrap justify-center content-center pointer-events-none w-96 h-full'>
      <img src={pimp} alt="" className='w-[40%]'/>
    </div>
  )
}

export default Pimp
