
import emailjs from '@emailjs/browser'
import React, { useEffect, useState } from 'react'
import { ClipLoader, FadeLoader, MoonLoader } from 'react-spinners'


function Contact() {
  const service = 'service_dou4ss6'
  const template = 'template_5o8baun'
  const publicKey = 'U9R08FW5PBGMt_iiy'
  const [isProcessing, setIsProcessing] = useState(false)
  const [formInfo, setFormInfo] = useState({
    email: '',
    subject: '',
    message: '',
  })
  useEffect(() => {
    const popup = document.getElementById('popUp')
    if (popup === null) return
    popup.style.top = "0px"
    popup.style.left = "0px"
    popup.style.top = 20 + "%"
    popup.style.left = 50 + "%"
    popup.style.transform = "translateX(-50%)"
    popup.classList.add('hidden')
  }, [])
  const handleEmail = (e: any) => {
    setFormInfo({
      ...formInfo,
      email: e.target.value
    })
  }
  const handleSubject = (e: any) => {
    setFormInfo({
      ...formInfo,
      subject: e.target.value
    })
  }
  const handleMessage = (e: any) => {
    setFormInfo({
      ...formInfo,
      message: e.target.value
    })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    setIsProcessing(true)
    // console.log(formInfo)
    const popup = document.getElementById('popUp')
    const popupText = document.getElementById('popUpText')
    const contactForm = document.getElementById('contactForm') as HTMLFormElement
    if (popup === null) return

    emailjs.send(service, template, formInfo, publicKey)
    .then((response) => {
        console.log(response.text);
        if(response.text === 'OK'){
          popup.classList.remove('hidden')
          popupText!.innerHTML = 'Message sent!'
          contactForm!.reset()
          setIsProcessing(false)
        }
    }, (error) => {
        console.log(error);
        popup.classList.remove('hidden')
        popupText!.innerHTML = error
        contactForm!.reset()
        setIsProcessing(false)
    })
  }
  const handleHide = () => {
    const popup = document.getElementById('popUp')
    if (popup === null) return
    popup.classList.add('hidden')
  }

  return (
    <div className='text-gray-200 z-20 w-full md:w-3/4 lg:w-1/2 m-auto relative h-fit'>
      <div id="popUp" className='absolute w-64 h-20 bg-gray-600 flex flex-col justify-between items-center rounded-xl'>
        <h1 id="popUpText" className='text-center mt-2'> </h1>
        <button onClick={handleHide} className='w-fit bg-blue-400 text-white mb-2 px-2 rounded-lg transition-all duration-300 hover:bg-blue-500'>Ok</button>
      </div>
      <section className="">
      <div className="pb-2 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">Contact me</h2>
          <form onSubmit={handleSubmit} id="contactForm" className="space-y-8">
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Your email</label>
                  <input onChange={handleEmail} type="email" id="email" className="shadow-sm border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light" placeholder="name@mail.com" required/>
              </div>
              <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">Subject</label>
                  <input onChange={handleSubject} type="text" id="subject" className="block p-3 w-full text-sm rounded-lg border shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light" placeholder="Let me know what it is about" required/>
              </div>
              <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-400">Your message</label>
                  <textarea onChange={handleMessage} id="message" rows={6} className="block p-2.5 w-full text-sm rounded-lg shadow-sm border focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Type a message..."></textarea>
              </div>
              <button disabled={isProcessing} type="submit" className={"py-3 px-5 text-sm font-medium border border-gray-500 hover:border-gray-300 hover:text-gray-200 text-center rounded-lg transition duration-300 ease-in-out sm:w-fit flex " + (isProcessing ? "text-gray-400":"text-white")}>
                {isProcessing ? "Sending" :"Send message"}
                {isProcessing && <ClipLoader color="#999" size={20} className="ml-5"/>}
              </button>
          </form>
      </div>
    </section>
    </div>
  )
}

export default Contact
