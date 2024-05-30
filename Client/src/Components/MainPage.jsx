import React, { useState, useEffect , useRef} from "react";
import { motion } from "framer-motion";
import { Routes, Route, NavLink } from "react-router-dom";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import profile from "../assets/Images/MY_Pic.jpg"
import Typed from "typed.js";
import NavlinkIcon from "./PageComponents/NavlinkIcon";
import { GoProjectSymlink } from "react-icons/go";
import { FiHome } from "react-icons/fi";
import { IoPersonSharp, IoBagOutline } from "react-icons/io5";
// import {IoBagOutline} from "react-icons/io5"
import { GrTechnology } from "react-icons/gr";
import { FaLocationArrow } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";// twitter
import { FaLinkedin } from "react-icons/fa"; //linkedin 
import { FaInstagram } from "react-icons/fa6";
import { VscGithub } from "react-icons/vsc";
import {HomePage, About, Contact, Project, Services, TechStack} from "./Pages/index"

import "../assets/NavLinkcss.css"




function MainPage() {
  const HomeAnimate = {
    initial: {
      opacity: 0,
    },
    animate: {
      transition: {
        delay: 3,
        duration: 2,
      },
      opacity: 1,

    },
  };
  const [theme, setTheme] = useState("dark");
  const [icon, setIcon] = useState(false); // Identify if only icon is to be displayed or the entire sidebar is to be displayed
  // Initialize Typed in a useEffect hook when the component mounts
  useEffect(() => {
    var typeData = new Typed(".role", {
      strings: [
        "Full Stack Developer",
        "Web Developer",
        "UI-UX Designer",
        "Backend Developer",
        "Coder",
        "FreeLancer"
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    });

    // Clean up Typed instance when component unmounts
    return () => {
      typeData.destroy();
    };
  }, []);// Empty dependency array to run the effect only once
  const [links, setLinks]= useState({
    links_data:{
      explore:{
        title: "explore", 
        icon_link:<FiHome/>,
        url:"/",
      }, 
      projects:{
        title: "Projects", 
        icon_link:<GoProjectSymlink />,
        url:"/projects",
      }, 
      services:{
        title: "Services", 
        icon_link:<IoBagOutline />,
        url:"/services",
      }, 
      tech:{
        title: "Tech Stacks", 
        icon_link:<GrTechnology />,
        url:"/techs",
      }, 
      about:{
        title: "About", 
        icon_link:<IoPersonSharp />,
        url:"/about",
      }, 
      contact:{
        title: "Contact ", 
        icon_link:<FaLocationArrow />,
        url:"/contact",
      }, 

    }
  })
  const [Socials, SetSocials]= useState({
    Socials:{
      Linkedin:{
          title:"LinkedIn",
          url:"https://www.linkedin.com/in/himanshu-gupta-32376b21b/",
          icon_link:<FaLinkedin/>,
      },
      Github:{
        title:"Github",
        url:"https://github.com/himanshugupta2168",
        icon_link:<VscGithub/>
      },
      Twitter:{
        title:"X /  Twitter",
        url:"https://www.x.com/Himansh50123179?t=ONozpZR68B9cnHiV3sZg4w&s=08",
        icon_link:<RiTwitterXLine/>,
      },
      instagram :{
        title:"Instagram",
        url:"https://www.instagram.com/himanshu_guptaaa?igsh=MXIOMnAzdjlsY29rNw==",
        icon_link:<FaInstagram/>,
      }
    }
  })
  // console.log(links.links_data)
  const smallScreenStyle = {
    active: {
      color: '#7971cf',
      backgroundColor: '#2b2b2b',
      transition: 'all',
      transitionDuration: '300ms',
    },
  };
  

  return (
    <div className="w-full relative">
        <motion.div
          initial="initial"
          animate={"animate"}
          variants={HomeAnimate}
          className="flex flex-row bg-[#171717] w-full min-h-screen relative"
        >
          <div
            className={`hidden md:block md:bg-[#1c1c1c] border-r-[1px] border-gray-500 relative ${
              icon ? "w-[7vw]" : "w-[15vw]"
            } transition-all duration-500 flex-grow-0`}
          >
            <ul className=" text-white pt-7">
              <li className="w-[95%] h-16 mx-auto block">
                <a href="/">
                <div className=" px-2 h-full flex flex-row items-center gap-1 rounded-md  transition-all hover:bg-black duration-300 text-wrap">
                    <img src={profile} alt="" className="w-[50px] h-[50px] rounded-full bg-cover" />
                    <div className={`${!icon?"block":"hidden"}`}>
                      <h2 className="break-words text-sm">Himanshu Gupta</h2>
                      <span className="role text-sm opacity-70 "></span>
                    </div>
                  </div>
                </a>
              </li>
              <li tabIndex={-1}  className="w-[95%] block mx-auto">
                <ul className="w-full h-full my-4">
                {
                  Object.values(links.links_data).map((link, index)=>(
                    <li className="h-16 my-1 mx-auto" key={index}><NavlinkIcon links_data ={link} icon={icon}/> </li>
                  ))
                  }
                </ul>
              </li>
              <li tabIndex={-1} className="w-[95%] h-12 mx-auto">
                <h2 className={!icon?"px-6 text-[#7971cf] bg-[#2c2c2c] rounded py-2":"hidden"}>Holaaa!</h2>
                <ul>
                  {
                  Object.values(Socials.Socials).map((link, index)=>(
                    <li className="h-12 my-1 mx-auto" key={index}><NavlinkIcon links_data ={link} icon={icon}/> </li>
                  ))
                  }
                </ul>
              </li>
            </ul>
            <div
              className="absolute -right-4 top-4 w-8 h-8 rounded-full bg-[#282828] text-white flex justify-center items-center text-sm"
              onClick={() => {
                setIcon(!icon);
              }}
            >
              {icon ? <FaArrowRight /> : <FaArrowLeftLong />}
            </div>
          </div>
          <div className="flex-grow">
            <Routes className="w-full min-h-screen">
              <Route path="/" element={<HomePage/>}/>
              <Route path="/projects" element={<Project/>}/>
              <Route path="/services" element={<Services/>}/>
              <Route path="/techs" element={<TechStack/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/contact" element={<Contact/>}/>
            </Routes>
          </div>
        </motion.div>
        <div className="sticky h-[70px] bg-[#1c1c1c] bottom-0 overflow-scroll md:hidden ">
          <ul className="flex flex-row items-center h-full ">
            <li className="flex flex-row justify-around items-center">
            {
              Object.values(links.links_data).map((link,index)=>(<NavLink key={index} className=" mx-6  h-full text-[28px] text-white" to={link.url}>{link.icon_link}</NavLink>))
            }
            </li>
            <li className="flex flex-row justify-around items-center">
            {
              Object.values(Socials.Socials).map((link,index)=>(<NavLink key={index} className=" mx-6 h-full text-[28px] text-white" to={link.url}>{link.icon_link}</NavLink>))
            }
            </li>
          </ul>
        </div>
      </div>
  );
}

export default MainPage;
