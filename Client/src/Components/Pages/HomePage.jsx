import React from 'react'
import Footer from "../PageComponents/Footer"
import Loader from "../PageComponents/Loader"

function HomePage() {
  return (
    <div className='w-full relative'>
      <div className='w-[80%] mx-auto my-16 text-white'>
        <h1 className='text-5xl font-bold mt-2'>Welcome to</h1>
        <h1 className='text-5xl font-bold mb-2'>My Code Cascade</h1>
        <p className='opacity-70 text-xl'>Weaving the Web's Tapestry, One Line of Code Unraveled at a Time.</p>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage;