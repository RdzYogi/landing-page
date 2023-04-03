import React from 'react'

function UI() {
  return (
    <div>
      <div id="info-bar" className='w-full h-10 bg-blue-500 mb-10'>
      </div>
      <div className='battle w-full h-[20vh] bg-gray-200 flex justify-around items-end my-20'>
        <div id="player" className='bg-green-200 w-40 h-full' >
        </div>
        <div id="enemy" className='bg-red-200 w-40 h-full'>
        </div>
      </div>
      <div id='action-bar' className='w-full h-32 bg-yellow-400 mt-10'>

      </div>
    </div>
  )
}

export default UI
