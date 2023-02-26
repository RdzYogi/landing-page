import React from 'react'

function AboutMe() {
  return (
    <div className='h-full flex justify-between items-center'>
      <div className='md:flex md:flex-col justify-between h-fit md:w-3/4 w-full'>
        <h1 className='text-xl text-orange-600 '>{"<helloWorld>"}</h1>
        <h1 className='text-base ml-20 text-white'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h1>
        <h1 className='text-xl text-orange-600'>{"</helloWorld>"}</h1>
      </div>
      <div id="avatar" className='aspect-square w-1/4 lg:w-52 hidden md:flex rounded-full bg-gray-500'></div>
    </div >
  )
}

export default AboutMe
