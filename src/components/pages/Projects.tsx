import anime from 'animejs'
import React from 'react'

function Projects() {

  const handleMouseEnter = (event:any) => {
    // zoom in on the card
    // event.target.style.transform = "scale(1.1) translate3d(0px, 0px, -20px)"
    setTimeout(() => {
      event.target.style.transition = "ease-in-out"
    }, 200)
  }

  const handleMouseLeave = (event:any) => {
    // zoom out on the card
    event.target.style.transform = "scale(1)"
    event.target.style.transition = "transform 0.2s ease-out"
  }

  const handleMouseMove = (event:any) => {
    const x = event.clientX - event.target.offsetLeft - event.target.parentElement.offsetLeft - event.target.parentElement.parentElement.offsetLeft - event.target.offsetWidth / 2
    const y = -(event.clientY - event.target.offsetTop - event.target.parentElement.offsetTop - event.target.parentElement.parentElement.offsetTop - event.target.parentElement.parentElement.parentElement.offsetTop  - event.target.offsetHeight / 2)
    event.target.style.transform = "perspective(75em) scale(1.1) rotateY(" + x / 10 + "deg) rotateX(" + y / 10 + "deg)"
  }

  return (
    <div id='projects-page' className='text-white z-20 w-full md:w-3/4 m-auto relative h-[90vh] '>
      <div className='flex flex-wrap gap-4 justify-between'>
        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className='w-80 aspect-video bg-fuchsia-500 '>
        </div>
        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className='w-80 aspect-video bg-blue-500'>
        </div>
        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className='w-80 aspect-video bg-red-500 '>
        </div>
      </div>
    </div>
  )
}

export default Projects
