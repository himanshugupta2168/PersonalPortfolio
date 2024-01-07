import React, { useState } from 'react'
import Footer from '../PageComponents/Footer'
import Serve from '../PageComponents/Serve'
function Services() {
  const [services, setServices]= useState([
    {
      title:"From Idea to Dynamic Application",
      description: "Turn your concepts into fully functional, end-to-end MERN applications. Our Full Stack MERN development services take your ideas and materialize them into robust, scalable applications. Seamlessly integrating MongoDB, Express.js, React, and Node.js, we craft a cohesive ecosystem that powers your application's backend and frontend. With a focus on performance, scalability, and user experience, we engineer feature-rich, responsive applications that cater to diverse user needs. Experience a smooth transition from vision to reality as we architect, develop, and deploy your MERN application, ensuring a seamless digital journey for your users",
    },
    {
      title:"Figma to UI transition",
      description: "Transform your Figma designs into pixel-perfect, functional user interfaces. Our Figma to UI conversion services bring your design concepts to life, ensuring a seamless transition from prototype to a fully responsive and interactive digital experience.",
    },
    {
      title:"From Concept to Interface Reality",
      description: "Elevate your design vision into captivating and intuitive user experiences. Our UI/UX design services bridge the gap between concept and reality, translating your ideas into polished, user-centric interfaces. With meticulous attention to detail and user interaction, we transform wireframes and concepts into visually appealing, user-friendly designs. Seamlessly blending creativity and functionality, our UI/UX design process ensures a harmonious transition from abstract ideas to engaging, responsive digital experiences",
    },
  ])
  // console.log(services)
  return (
    <div className='w-full relative '>
      <div className=' w-[80%] mx-auto my-16 text-white'>
        <h1 className='text-5xl font-bold my-2'>My Assistance </h1>
        <p className='opacity-70 text-xl'>Building Solutions and Boosting Value in Every Project</p>
        <>
        {
          Object.values(services).map((data, index)=>(<div key={index} className='w-[70vw] my-10 bg-[#1c1c1c] rounded-md'><Serve data={data}/></div>))
        }
        </>
      </div>
      <Footer/>
    </div>
  )
}

export default Services