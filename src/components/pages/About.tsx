import anime from 'animejs'
import React, { useEffect } from 'react'
import AboutMe from '../about/AboutMe'
import AboutPage from '../about/AboutPage'
import TechStack from '../about/TechStack'

type Props = {
  firstLoad: boolean
}

function About(props: Props) {
  useEffect(() => {
    console.log("effect for about page first load", props.firstLoad)
    if (props.firstLoad) {
      anime({
        targets: '#about-1',
        opacity: [0, 1],
        height: [0, '15rem'],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: 300,
      })
      anime({
        targets: '#about-2',
        opacity: [0, 1],
        height: [0, '15rem'],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: 1000,
      })
      anime({
        targets: '#about-3',
        opacity: [0, 1],
        height: [0, '15rem'],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: 2000,
      })
    }
  }, [])

  return (
    <div id='about-page' className='text-white z-20 w-3/4 m-auto relative h-fit '>
      <div id='about-1' className='bg-blue-500 h-60'>
        <AboutMe/>
      </div>
      <div id='about-2' className='bg-blue-200 h-60 my-5'>
        <TechStack/>
      </div>
      <div id='about-3' className='bg-blue-300 h-60'>
        <AboutPage/>
      </div>
    </div>
  )
}

export default About
