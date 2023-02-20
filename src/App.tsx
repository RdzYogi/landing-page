import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar';
import About from './components/pages/About';
import Projects from './components/pages/Projects';

// This is for tailwind sizes
const SIZEOFMOUSEEFFECT = 32
// Half and convert to px
const OFFSETTOCENTER =  (128 / 2)

function App() {
  useEffect(()=>{
    document.addEventListener("mousemove", handleMouseMove)
    return ()=>{
      document.removeEventListener("mousemove", handleMouseMove)
    }
  },[])
const handleMouseMove = (event: MouseEvent )=>{
  const elementToFollow = document.getElementById("mouse-effect")
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  if (elementToFollow === null) return
  elementToFollow.style.left = event.pageX - OFFSETTOCENTER + "px"
  elementToFollow.style.top = event.pageY - OFFSETTOCENTER + "px"
  if (canvas === null) return
  const ctx = canvas.getContext("2d")
  if (ctx === null) return
  ctx.beginPath()
  ctx.strokeStyle = "blue";
  ctx.fillRect(event.pageX,event.pageY,4,4)
}

  const [navigation, setNavigation] = useState<React.ReactNode>(<About/>)
  const handleNavigation = (event : React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault()
    let componentToRender;

  switch (event.currentTarget.id) {
    case "":
    case "about":
      componentToRender = <About />;
      break;
    case "projects":
      componentToRender = <Projects />;
      break;
    default:
      componentToRender = null;
  }
    setNavigation(componentToRender)
  }

  return (
    <div className='relative'>
      <Navbar handleNavigation={handleNavigation}/>
      {navigation}
      <div id="mouse-effect"
           className={'w-'+ SIZEOFMOUSEEFFECT + ' h-'+ SIZEOFMOUSEEFFECT +' absolute rounded-full z-10'}
           style={{background: "radial-gradient(#333, #000)"}}></div>
      <canvas id="canvas" className='bg-black absolute top-0 h-screen w-full z-1'></canvas>
    </div>
  );
}

export default App;
