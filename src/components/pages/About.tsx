import anime from 'animejs'
import React, { useEffect } from 'react'
import AboutMe from '../about/AboutMe'
import AboutPage from '../about/AboutPage'
import TechStack from '../about/TechStack'

function About() {

  return (
    <div id='about-page' className='text-white z-20 w-3/4 m-auto relative h-fit '>
      <div className='bg-blue-500 h-60'>
        <AboutMe/>
      </div>
      <div className='bg-blue-200 h-60 my-5'>
        <TechStack/>
      </div>
      <div className='bg-blue-300 h-60'>
        <AboutPage/>
      </div>
    </div>
  )
}

export default About
