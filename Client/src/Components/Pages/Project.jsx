import React, { useEffect, useState } from 'react'
import Footer from '../PageComponents/Footer'
import Loader from '../PageComponents/Loader'
import Cards from "../PageComponents/Cards"
import {toast } from "react-toastify"

function Project() {
  const [loading, setLoading]= useState("false");
  const [data, setData]= useState([]);
  const fetchData = async()=>{
    try{
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}projects`);
      const data = await response.json();
      setData(data.data);
      setLoading(false);
    }
    catch(err){
      console.log(err);
      toast.warn("We are unable to connect to the server")
    }
  }
  useEffect(()=>{
    fetchData();
  },[])
  console.log(data);
  return (
    <div className=' w-full relative'> 
      <div className='w-[80%] mx-auto my-16 text-white'>
        <h1 className='text-5xl font-bold my-2'>Syntax Sonnets</h1>
        <p className='opacity-70 text-xl'>Delve into the online world through my creations.</p>
        {
          loading?(<div className='flex justify-center items-center h-[50vh]'><Loader/></div>):
          (<div className='grid grid-cols-1 md:grid-cols-2  my-4 w-[73vw] p-4'>
            {
              data.map((project)=>(<div className=' m-4' key={project._id}><Cards key={project._id} data={project}/></div>))
            }
          </div>)
        }
      </div>
      <Footer/>
    </div>
  )
}

export default Project