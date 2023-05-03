import { useEffect, useState } from 'react'
import UI from '../game/UI'

const code = "AlphaTest1884"

function Game() {
  const [visible , setVisible] = useState(false)
  const [Ui , setUi] = useState(<div></div>)
  const [buttonState, setButtonState] = useState(false)

  useEffect(() => {
    if(Ui){
      setUi(<UI/>)
      // console.log("game triggered")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === code){
      setButtonState(true)
    }else{
      setButtonState(false)
    }
  }
  const handleClick = () => {
    setVisible(true)
  }
  return (
      <div className='text-white z-20 w-full md:w-[90%] m-auto flex flex-col items-center h-fit medieval'>
        {visible ? Ui :
        <>
          <div className='w-60'>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">Enter code for pre-alpha testing</label>
              <input onChange={handleChange} type="text" id="subject" className="block p-3 w-full text-sm rounded-lg border shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light" placeholder="Code:" required/>
          </div>
          <button onClick={handleClick} type="submit" className={"mt-3 py-3 px-5 text-sm font-medium border border-gray-500 hover:border-gray-300 hover:text-gray-200 text-center rounded-lg transition duration-300 ease-in-out sm:w-fit flex "
              + (buttonState ? " " : "hidden")
              }>
            Play
          </button>
        </>
      }
      </div>

  )
}

export default Game
