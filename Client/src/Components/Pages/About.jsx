import React, { useEffect, useState } from 'react'
import Footer from "../PageComponents/Footer"
import { toast } from 'react-toastify';
import Loader from "../PageComponents/Loader"
import Logo from "../../../pLogo.png"
import Paragraph from "./../PageComponents/Paragraph"
function About() {
  const[title, setTitle]= useState("");
  const [response, setResponse]=useState({});
  const[loading, setLoading]= useState(false);
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setTitle(data.data[0].fullName)
      setResponse(data.data[0]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.warning("We are Unable to communicate with the server")
      setLoading(true)
    }
  };
  
  
  useEffect(() => {
    const fetchDataAndHandleError = async () => {
      await fetchData();
    };
    fetchDataAndHandleError();
  }, []);
  // console.log(response)
  return (
    <div className='w-full relative'>
      <div className='w-full min-h-screen overflow-hidden'>
        {
          loading?<div className='mt-[30%] ml-[50%]'><Loader/></div>
          :<div className='w-[80%]  my-16  mx-auto text-white relative'>
            <h1 className='text-5xl font-bold my-2'>Behind The Screen </h1>
            <p className='opacity-70 text-xl'>The Wizard that transforms story into reality</p>
            <img src={Logo} alt="Profile Image" className='w-[150px] h-[150px] rounded-full mx-auto my-4' />
            <h1 className='text-center text-3xl font-bold mb-4'>{title}</h1>
            <div className="w-full">
              {
                response.description&& response.description.map((para, index)=>(<div className='w-[85vw]' key={index}><Paragraph data={para}/></div>))
              }
            </div>
          </div>
        }
      </div>
      <Footer/>
    </div>
  )
  
}

export default About