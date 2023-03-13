import React from 'react'
import profile from '../../assets/images/Profile.png'

function AboutMe() {
  return (
    <div className='h-full flex flex-col justify-between '>
      <div id="avatar" className='aspect-square w-20 mb-5 hidden md:flex' style={{backgroundImage: `url(${profile})`, backgroundSize: "cover",backgroundPosition:"center center"}}></div>
      <div className='md:flex md:flex-col justify-between h-fit w-full'>
        <h1 className='text-xl text-gray-600 '>{"<helloWorld>"}</h1>
        <h1 className='text-base ml-20 text-gray-200'>I am a passionate developer that discovered his passion for web after finishing LeWagon coding bootcamp.</h1>
        <h1 className='text-xl text-gray-600'>{"</helloWorld>"}</h1>
      </div>

    </div >
  )
}

export default AboutMe
