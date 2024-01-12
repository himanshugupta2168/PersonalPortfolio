import React, { useEffect, useState } from 'react'

function TechCard({data}) {
  // console.log(data);
  const [imageUrl , setImageUrl]= useState("");
  const [description, setDescription]= useState("");
  const [title, setTitle]= useState("")
  useEffect(()=>{
    setImageUrl(data.imageUrl);
    setDescription(data.description);
    setTitle(data.title);
  }, [])
  return (
    <div className='w-full h-auto '>
      <div className='flex flex-row gap-6 w-full'>
        <div className='w-[15%]'>
          <img src={imageUrl} alt={`${title} Logo`} className='w-[60px] h-[60px] bg-cover' />
        </div>
        <div className='flex flex-col w-[80%]'>
          <h3 className='font-bold'>{title}</h3>
          <p className='text-wrap break-words'>{description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TechCard