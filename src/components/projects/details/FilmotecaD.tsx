import React from 'react'
import filmotecaMain from '../../../assets/projects/filmoteca/filmotecaHero.png'
import Links from '../Links'
import Tag from './Tag'

function Filmoteca() {
  return (
    <div className='flex flex-col mt-5 gap-5'>
      <div className='flex gap-4 flex-col items-center md:items-start md:flex-row md:justify-around'>
        <div className='flex flex-col items-center'>
          <img src={filmotecaMain} alt="" className='' />
          <Links live="https://filmoteca.herokuapp.com/" github='https://github.com/RdzYogi/filmoteca'/>
        </div>
        <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
          <Tag title='about' content='Fullstack solution created as a proposed replacement for the current Filmoteca website. Filmoteca is a government run cinema for classic movies'/>
          <Tag title='target' content='The website is mostly targeted towards the elderly population and has been designed with simplicity of use in mind, making it easy for this demographic to navigate and access the information and resources available.'/>
          <Tag title='features' content={
            <ul className='list-disc list-inside text-sm text-gray-200'>
              <div className='ml-10'>
                <li>Responsive - build for both mobile and desktop </li>
                <li>Custom build calendars - weekly and monthly </li>
                <li>Contains a comprehensive list of all the movies that will be shown at the cinema over the entire month, along with their screening times and other relevant information.</li>
                <li>Ability to buy subscriptions and tickets</li>
                <li>User authentication and authorization</li>
                <li>Admin custom build dashboard for updating the database</li>
              </div>
            </ul>
          }/>
          <Tag title='techStack' content={
            <ul className='list-disc list-inside text-sm text-gray-200'>
              <div className='ml-10'>
                <li>Backend - Rails, PostgresQL </li>
                <li>Frontend - React, Redux, Tailwind CSS</li>
              </div>
            </ul>
          }/>
          <Tag title='otherContributors' content={
            <ul className='list-disc list-inside '>
              <div className='ml-10 text-sm text-gray-200'>
                <a href="https://github.com/laurangt" className='text-blue-700 hover:underline'>Laura Nguyen-Trong</a>
                <a href="https://github.com/MrBlueRuben" className='text-blue-700 hover:underline ml-3'>Ruben Sanchez</a>
                <a href="https://github.com/vitolattanzio13" className='text-blue-700 hover:underline ml-3'>Vito Lattanzio</a>
                <a href="https://github.com/fcrespo8" className='text-blue-700 hover:underline ml-3'>Francisco Crespo Erramuspe</a>
                <a href="https://github.com/amercadoarriola" className='text-blue-700 hover:underline ml-3'>Alberto Mercado</a>
                <a href="https://github.com/JorritvdP" className='text-blue-700 hover:underline ml-3'>Jorrit van der Plaats</a>
              </div>
            </ul>
          }/>
        </div>
      </div>
    </div>
  )
}

export default Filmoteca
