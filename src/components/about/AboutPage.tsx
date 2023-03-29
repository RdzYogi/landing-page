import React from 'react'

function AboutPage() {
  return (
    <div className='md:flex md:flex-col justify-between h-fit w-full mb-3'>
        <h1 className=' text-gray-600 '>{"<aboutThisPage>"}</h1>
        <h1 className='text-sm ml-20 text-gray-200'>This page has been designed as a static single page application and build from scratch using React and TypeScript, and it's still under construction.</h1>
        <h1 className=' text-gray-600'>{"</aboutThisPage>"}</h1>
    </div>
  )
}

export default AboutPage
