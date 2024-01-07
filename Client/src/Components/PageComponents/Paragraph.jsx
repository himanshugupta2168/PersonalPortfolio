import React from 'react'

function Paragraph({data}) {
  console.log(data)
  return (
    <div className='text-lg my-4 w-[80%] relative break-words'>{data}</div>
  )
}

export default Paragraph