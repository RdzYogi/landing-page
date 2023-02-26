import anime from 'animejs'
import React, { useEffect } from 'react'

function Projects() {

  const handleOpenMore = () => {
    anime({
      targets: '#projects-page',
      height: '100vh',
      easing: 'easeInOutQuad',
      duration: 1000,
    })
  }

  return (
    <div id='projects-page' className='text-white z-20 w-3/4 m-auto relative h-fit bg-slate-500'>
      <button onClick={handleOpenMore} className='border'>Open more</button>
    </div>
  )
}

export default Projects
