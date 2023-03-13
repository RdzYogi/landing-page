import React from 'react'
import react from '../../assets/icons/react.png'
import redux from '../../assets/icons/redux.png'
import javascript from '../../assets/icons/javascript.png'
import typescript from '../../assets/icons/typescript.png'
import bootstrap from '../../assets/icons/bootstrap.png'
import tailwind from '../../assets/icons/tailwindcss.png'
import jwt from '../../assets/icons/json-web-token.png'
import restapi from '../../assets/icons/rest-api.png'
import rails from '../../assets/icons/rails.png'
import postgresql from '../../assets/icons/postgresql.png'


function TechStack() {
  return (
    <div className='flex flex-col gap-1 justify-between text-gray-600 h-fit w-full'>
        <h1 className='text-xl '>{"<techStack>"}</h1>
        <h1 className='text-xl ml-10 '>{"<frontEnd>"}</h1>
        {/* <h1 className='text-base ml-20 text-gray-200'>React Redux JavaScript Typescript BootStrap TailWind JWT </h1> */}
        <div className='flex ml-20'>
          <div className='flex flex-col items-center'>
            <img src={react} alt="react" className='h-[48px] w-[48px]' />
            <h1 className='text-base text-gray-200'>React</h1>
          </div>
          <div className='ml-5 flex flex-col items-center'>
            <img src={redux} alt="redux" />
            <h1 className='text-base text-gray-200'>Redux</h1>
          </div>
          <div className='ml-5 flex flex-col items-center'>
            <img src={javascript} alt="javascript" />
            <h1 className='text-base text-gray-200'>Javascript</h1>
          </div>
          <div className='ml-5 flex flex-col items-center'>
            <img src={typescript} alt="typescript" />
            <h1 className='text-base text-gray-200'>Typescript</h1>
          </div>
          <div className='ml-5 flex flex-col items-center'>
            <img src={bootstrap} alt="bootstrap" />
            <h1 className='text-base text-gray-200'>Bootstrap</h1>
          </div>
          <div className='ml-5 flex flex-col items-center'>
            <img src={tailwind} alt="tailwind" />
            <h1 className='text-base text-gray-200'>Tailwind</h1>
          </div>

        </div>

        <h1 className='text-xl ml-10 '>{"</frontEnd>"}</h1>
        <h1 className='text-xl ml-10 '>{"<backEnd>"}</h1>
        {/* <h1 className='text-base ml-20 text-gray-200'>Ruby on Rails PostGresQl REST API JWT</h1> */}

        <div className='flex ml-20'>
          <div className='flex flex-col items-center'>
            <img src={restapi} alt="restapi" className='bg-white h-[48px] w-[48px]' />
            <h1 className='text-base text-gray-200'>RESTapi</h1>
          </div>
          <div className='ml-5 flex flex-col items-center'>
            <img src={rails} alt="rails" className='bg-white h-[48px] w-[48px]' />
            <h1 className='text-base text-gray-200'>Ruby on Rails</h1>
          </div>
          <div className='ml-5 flex flex-col items-center'>
            <img src={postgresql} alt="postgresql" className='h-[48px] w-[48px]' />
            <h1 className='text-base text-gray-200'>PostgreSQL</h1>
          </div>
          <div className='ml-5 flex flex-col items-center'>
            <img src={jwt} alt="jwt" className='h-[48px] w-[48px]' />
            <h1 className='text-base text-gray-200'>Json Web Token</h1>
          </div>

        </div>

        <h1 className='text-xl ml-10 '>{"</backEnd>"}</h1>
        <h1 className='text-xl'>{"</techStack>"}</h1>
    </div>
  )
}

export default TechStack
