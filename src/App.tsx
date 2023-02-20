import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar';
import About from './components/pages/About';
import Projects from './components/pages/Projects';


function App() {
  useEffect(()=>{
    document.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleCanvasSize)
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    if (canvas === null) return
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (ctx === null) return
    const interval = setInterval(()=>{
      const w = canvas.width;
      const h = canvas.height;
      const fadeAmount = 1-1/50;
      const imageData = ctx.getImageData(0, 0, w, h);
      for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
          const i = (x + y * w) * 4;
          imageData.data[i] = Math.floor(imageData.data[i]*fadeAmount);
          imageData.data[i + 1] = Math.floor(imageData.data[i + 1]*fadeAmount);
          imageData.data[i + 2] = Math.floor(imageData.data[i + 2]*fadeAmount);
          imageData.data[i + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }, 30)
    return ()=>{
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleCanvasSize)
      clearInterval(interval)
    }
  }, [])

const handleCanvasSize = ()=>{
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  if (canvas === null) return
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
}

// let count = 10;
const handleMouseMove = (event: MouseEvent )=>{
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  const x = event.pageX
  const y = event.pageY
  if (canvas === null) return
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (ctx === null) return
  var grd = ctx.createRadialGradient(150, 150, 10, 150, 150, 150);
  grd.addColorStop(0, "#555");
  grd.addColorStop(0.8, "rgba(10,10,10,0)");
  ctx.save()
  ctx.translate(x-150,y-150);
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.restore();

  // Fade the canvas back to black


    // ctx.globalCompositeOperation = 'hard-light';
    // ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.globalCompositeOperation = 'source-over'
  // }
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
      componentToRender = <About />;
  }
    setNavigation(componentToRender)
  }

  return (
    <div className='relative'>
      <Navbar handleNavigation={handleNavigation}/>
      {navigation}
      <canvas id="canvas" className=' absolute top-0 z-1'></canvas>
    </div>
  );
}

export default App;
