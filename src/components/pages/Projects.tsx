import anime from 'animejs'
import React, { useEffect } from 'react'

function Projects() {
  // const projects = document.getElementById("projects-page")
  // const wipeData = {
  //   pozX: 0
  // }
  // useEffect(() => {
  //   if (projects === null) return
  //   anime({
  //     targets: wipeData,
  //     pozX: 100,
  //     duration: 1000,
  //     easing: "linear",
  //     round: 1,
  //     update: function() {
  //       projects.style.clipPath = "polygon(0% 0%,0% 100%," + wipeData.pozX + "% 100%," + wipeData.pozX + "% 0%)"
  //     }
  //   })
  // },[])
  return (
    <div id='projects-page' className='text-white z-20 w-3/4 m-auto relative h-96 bg-gray-500'
          >
      <div className=''>We are in Projects</div>
    </div>
  )
}

export default Projects
