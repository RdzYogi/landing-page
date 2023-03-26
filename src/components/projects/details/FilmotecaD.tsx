import React from 'react'
import filmotecaMain from '../../../assets/projects/filmoteca/filmotecaHero.png'
import filmoteca from '../../../assets/projects/filmoteca/filmoteca.png'
import Links from '../Links'
import Tag from './Tag'

function Filmoteca() {
  return (
    <div className='flex flex-col mt-5 gap-5'>
      <img src={filmoteca} alt="" className='w-96 self-center'/>
      <div className='flex gap-4 flex-col md:flex-row md:justify-around'>
        <div className='flex flex-col items-center'>
          <img src={filmotecaMain} alt="" className='w-80' />
          <Links live="https://filmoteca.herokuapp.com/" github='https://github.com/RdzYogi/filmoteca'/>
        </div>
        <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
          <Tag title='about' content='Fullstack solution created to replace the current Filmoteca website'/>
          <Tag title='target' content='Main user of website are elderly people'/>
          <Tag title='features' content=''/>
          <Tag title='techStack' content=''/>
          <Tag title='contributors' content=''/>
        </div>
    </div>
    </div>
  )
}

export default Filmoteca
