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
    if (props.firstLoad) {
      anime({
        targets: '#about-1',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: 300,
      })
      anime({
        targets: '#about-2',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: 1000,
      })
      anime({
        targets: '#about-3',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: 2000,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id='about-page' className='text-white z-20 w-full md:w-3/4 lg:w-1/2 m-auto relative h-fit '>
      <div id='about-1' className='h-fit'>
        <AboutMe/>
      </div>
      <div id='about-2' className='h-fit my-10'>
        <TechStack/>
      </div>
      <div id='about-3' className='h-fit'>
        <AboutPage/>
      </div>
    </div>
  )
}

export default About
