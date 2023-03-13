import React from 'react'

function Contact() {
  return (
    <div className='text-gray-200 z-20 w-2/4 m-auto relative h-fit '>
      <section className="">
      <div className="pb-2 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">Contact me</h2>
          <form action="#" className="space-y-8">
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Your email</label>
                  <input type="email" id="email" className="shadow-sm border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light" placeholder="name@mail.com" required/>
              </div>
              <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">Subject</label>
                  <input type="text" id="subject" className="block p-3 w-full text-sm rounded-lg border shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light" placeholder="Let me know what it is about" required/>
              </div>
              <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-400">Your message</label>
                  <textarea id="message" rows={6} className="block p-2.5 w-full text-sm rounded-lg shadow-sm border focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Type a message..."></textarea>
              </div>
              <button type="submit" className="py-3 px-5 text-sm font-medium border border-gray-500 hover:border-gray-300 hover:text-gray-200 text-center text-white rounded-lg transition duration-300 ease-in-out sm:w-fit focus:ring-4 focus:outline-none focus:ring-primary-800">Send message</button>
          </form>
      </div>
    </section>
    </div>
  )
}

export default Contact
