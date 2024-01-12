import React, { useEffect, useState } from 'react'
import Footer from "../PageComponents/Footer"
import Loader from "../PageComponents/Loader"
import { Link } from 'react-router-dom'
import Cards from "../PageComponents/Cards"
import TechCard from '../PageComponents/TechCard'


function HomePage() {
  const [loading, setLoading]= useState(false);
  const [projectData, setProjectData]=useState([]);
  const [tech , setTech]= useState([]);
  const FetchDatas=async()=>{
    try{
      setLoading(true);
      const projectresp = await fetch(`${import.meta.env.VITE_BACKEND_URL}projects`);
      const project= await projectresp.json();
      setProjectData(project.data);
      const techresp = await fetch(`${import.meta.env.VITE_BACKEND_URL}techs`);
      const techData = await techresp.json();
      setTech(techData.data);
      setLoading(false);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    FetchDatas();
  }, []); 

  return (
    <div className='w-full relative'>
      <div className='w-[80%] mx-auto my-16 text-white'>
        <h1 className='text-5xl font-bold mt-2'>Welcome to</h1>
        <h1 className='text-5xl font-bold mb-2'>My Code Cascade</h1>
        <p className='opacity-70 text-xl my-4'>Coding Horizons, Designing Perspectives: Crafting the Web's Tapestry.</p>
        <div className='flex  flex-col my-6 gap-6 md:flex-row'>
          <Link to="/about"><button className='bg-[#2c2c2c] px-8 py-3 rounded-md font-bold text-sm hover:opacity-80 w-32'>About  </button></Link>
          <a href={`mailto:${import.meta.env.VITE_MAIL}`}><button className='bg-[#171717]  border-[0.5px] border-opacity-5 px-12 py-3 rounded-md font-bold text-sm hover:text-black hover:bg-white'>Email</button></a>
        </div>
        <div className='w-full'>
          <div className='flex flex-row justify-between items-center'>
            <h3 className='text-xl font-bold'>New  Projects </h3>
            <Link to="/projects"><button className='bg-[#2c2c2c] px-8 py-3 rounded-md font-bold text-sm hover:opacity-80 w-32'>View All </button></Link>
          </div>
            {loading?<div className='w-full h-[30vh] flex justify-center items-center'><Loader/></div>:
            <div className='grid grid-cols-1 md:grid-cols-2 my-4 w-[70vw]'>
              {
                projectData.slice(0,2).map((project , index)=>(<div key={index} className='mx-2 '><Cards data={project}/></div>))
              }
            </div>
            }
        </div>
        {/* tech stack  */}

        <div className='w-full'>
          <div className=''>
            <h3 className='text-xl font-bold'>Stack</h3>
            <p className='opacity-70'>Technologies used on a frequent basis</p>
          </div>
            {loading?<div className='w-full h-[30vh] flex justify-center items-center'><Loader/></div>:
            <div className='grid grid-cols-1 md:grid-cols-2 my-4 w-[70vw]'>
              {
                tech.slice(0,2).map((tech, index)=>(<div key={index} className='p-4 hover:bg-[#292929] m-4 rounded-lg'><TechCard data={tech}/></div>))
              }
            </div>
            }
            {
              !loading?<Link to="/techs">
              <div className='w-full h-10 bg-[#292929] flex justify-center items-center rounded-lg hover:opacity-80 '><button>View All</button></div>
            </Link>
            :null
            }
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage;