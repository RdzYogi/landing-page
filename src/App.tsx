import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar';
import About from './components/pages/About';
import Projects from './components/pages/Projects';

function App() {
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
    <>
      <Navbar handleNavigation={handleNavigation}/>
      {navigation}
    </>
  );
}

export default App;
