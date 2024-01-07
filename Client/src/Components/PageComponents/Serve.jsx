import React from 'react'
import { NavLink } from 'react-router-dom'

function Serve({data}) {
  return (
    <div className='text-lg py-4 w-[100%] relative break-words px-10 p'>
        <h3 className='font-semibold text-2xl py-4 px-2'>{data.title}</h3>
        <p>{data.description}</p>
        <div className='flex  flex-col my-6 gap-6 md:flex-row'>
          <NavLink to="/contact"><button className='bg-[#2c2c2c] px-8 py-3 rounded-md font-bold text-sm hover:opacity-80'>Schedule a call</button></NavLink>
          <a href={`mailto:${import.meta.env.VITE_MAIL}`}><button className='bg-[#171717]  border-[0.5px] border-opacity-5 px-12 py-3 rounded-md font-bold text-sm hover:text-black hover:bg-white'>Email</button></a>
        </div>

    </div>
  )
}

export default Serve