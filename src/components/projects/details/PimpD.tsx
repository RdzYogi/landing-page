import React from 'react'
import pimpMain from '../../../assets/projects/pimp/pimpMain.png'
import Links from '../Links'
import Tag from './Tag'

function Pimp() {
  return (

  <div className='flex flex-col mt-5 gap-5'>
    <div className='flex gap-4 flex-col items-center md:items-start md:flex-row md:justify-around'>
      <div className='flex flex-col items-center w-[100%]'>
        <img src={pimpMain} alt="" className='' />
        <Links live="" github='https://github.com/RdzYogi/pimp-my-job'/>
      </div>
      <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
        <Tag title='about' content='My first project at Lewagon was building a full-stack application that linked people in need of help with small jobs to professionals, allowing me to showcase my ability to create complex software solutions.'/>
        <Tag title='target' content='The target audience for this project would be people who need help with various tasks and services, but lack the skills, time or resources to do it themselves.'/>
        <Tag title='features' content={
          <ul className='list-disc list-inside text-sm text-gray-200'>
            <div className='ml-10'>
              <li>Ability to post or bid on jobs</li>
              <li>Dashboard for managing jobs and bids</li>
              <li>Mapbox for the locations of the jobs</li>
              <li>Job search by title and location</li>
              <li>User authentication</li>
            </div>
          </ul>
        }/>
        <Tag title='techStack' content={
          <ul className='list-disc list-inside text-sm text-gray-200'>
            <div className='ml-10'>
            <li>Fullstack - Ruby on rails, PostgresQl</li>
            <li>Bootstrap and SCSS</li>
            </div>
          </ul>
        }/>
        <Tag title='otherContributors' content={
          <ul className='list-disc list-inside text-sm text-gray-200'>
            <div className='ml-10 '>
              <li className='hover:underline'>
                <a href="https://github.com/vitolattanzio13" className='text-blue-700'>Vito Lattanzio</a>
              </li>
              <li className='hover:underline'>
                <a href="https://github.com/fcrespo8" className='text-blue-700'>Francisco Crespo Erramuspe</a>
              </li>
            </div>
          </ul>
        }/>
      </div>
    </div>
  </div>
  )
}

export default Pimp
