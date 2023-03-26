import React from 'react'

function Tag({title, content}: {title: string, content: string}) {
  return (
    <div className='text-gray-200 md:ml-5'>
        <h1 className='text-gray-600 '>{`<${title}>`}</h1>
        <h1 className='text-sm ml-10 text-gray-200'>{content}</h1>
        <h1 className='text-gray-600'>{`</${title}>`}</h1>
    </div>
  )
}

export default Tag
