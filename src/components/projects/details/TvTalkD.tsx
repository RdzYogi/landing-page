import React from 'react'
import tvTalkMain from '../../../assets/projects/tvTalk/tvTalkMain.png'
import Links from '../Links'
import Tag from './Tag'

function TvTalk() {
  return (
  <div className='flex flex-col mt-5 gap-5'>
    <div className='flex gap-4 flex-col items-center md:items-start md:flex-row md:justify-around'>
      <div className='flex flex-col items-center w-[50%]'>
        <img src={tvTalkMain} alt="" className='' />
        <Links live="https://www.tvtalk.me/" github='https://github.com/RdzYogi/tv-talk'/>
      </div>
      <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
        <Tag title='about' content='Final project from Lewagon Bootcamp. A social media for talking about movies'/>
        <Tag title='target' content='The website is targeted towards people wanting to discuss their favorite movie or series'/>
        <Tag title='features' content={
          <ul className='list-disc list-inside text-sm text-gray-200'>
            <div className='ml-10'>
              <li>Post and reply to messages similar to Twitter</li>
              <li>User authentication</li>
              <li>Live notifications for replies on your posts</li>
              <li>Live chat with friends</li>
            </div>
          </ul>
        }/>
        <Tag title='techStack' content={
          <ul className='list-disc list-inside text-sm text-gray-200'>
            <div className='ml-10'>
              <li>Fullstack - Ruby on rails, PostgresQl</li>
              <li>Bootstrap and SCSS</li>
              <li>Live notifications - Rails Action Cable</li>
              <li>Live chat - Rails Action Cable and Turbo Data</li>
            </div>
          </ul>
        }/>
        <Tag title='otherContributors' content={
          <div className='ml-10 text-sm  text-gray-200'>
            <a href="https://github.com/vitolattanzio13" className='text-blue-700 hover:underline'>Vito Lattanzio</a>
            <a href="https://github.com/fcrespo8" className='text-blue-700 hover:underline ml-3'>Francisco Crespo Erramuspe</a>
          </div>
        }/>
      </div>
    </div>
  </div>
  )
}

export default TvTalk
