import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
function Footer() {
  const[hours , setHours]= useState(0);
  const [minutes, setMinutes]= useState(0);
  const [seconds, setSeconds]= useState(0);
  const [meridian, setMeridian]= useState("AM");
  const setTime =()=>{
    const date = new Date();
    let presentHour = date.getHours();
    presentHour=presentHour%12 || 12;
    setHours(presentHour)
    setMinutes(date.getMinutes());
    setSeconds(date.getSeconds());
    setMeridian(date.getHours()>12?"PM":"AM");
  }
  setInterval(setTime,1000);
  return (
    <div className="hidden md:w-full md:block  relative bg-[#1c1c1c] min-h-[10vh] pt-4">
      <div className="w-[80%] mt-4 h-full  mx-auto flex flex-row gap-6 text-white">
        <div className="w-[50%]  flex flex-row justify-between">
          <div className="website px-8 py-6">
            <h3 className="font-bold text-[20px] my-6">Website</h3>
            <ul>
              <li className="py-1 hover:underline">
                <Link to="/projects">Projects</Link>
              </li>
              <li className="py-1 hover:underline">
                <Link to="/services">Service</Link>
              </li>
              <li className="py-1 hover:underline">
                <Link to="/">Explore</Link>
              </li>
              <li className="py-1 hover:underline">
                <Link to="/techs">Tech Stacks</Link>
              </li>
              <li className="py-1 hover:underline">
                <Link to="/About">About</Link>
              </li>
              <li className="py-1 hover:underline">
                <Link to="/contact">Contact </Link>
              </li>
            </ul>
          </div>
          <div className="Socials px-8 py-6">
            <h3 className="font-bold text-[20px] my-6">Socials</h3>
            <ul>
              <li className="py-1 hover:underline">
                <Link to="https://www.linkedin.com/in/himanshu-gupta-32376b21b/">LinkedIn</Link>
              </li>
              <li className="py-1 hover:underline">
                <Link to="https://github.com/himanshugupta2168">Github</Link>
              </li>
              <li className="py-1 hover:underline">
                <Link to="https://www.x.com/Himansh50123179?t=ONozpZR68B9cnHiV3sZg4w&s=08">X / Twitter</Link>
              </li>
              <li className="py-1 hover:underline">
                <Link to="https://www.instagram.com/himanshu_guptaaa?igsh=MXIOMnAzdjlsY29rNw==">Instagram</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-[50%] mx-auto flex flex-col justify-around pb-20">
          <div className="time w-[100%] flex flex-row mx-auto justify-center text-[#8e8d8d]">
            <h1 className="text-[50px] lg:text-[80px] ">{hours}:</h1>
            <h1 className="text-[50px] lg:text-[80px]">{minutes}:</h1>
            <h1 className="text-[50px] lg:text-[80px]">{seconds}</h1>
            <h1 className="text-[50px] lg:text-[80px] pl-4">{meridian}</h1>
          </div>
          <div className="others w-[80%] text-center">
            <Link to="/contact" className="inline hover:underline">Drop a message <IoArrowForwardCircleOutline className="inline text-[20px]"/></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
