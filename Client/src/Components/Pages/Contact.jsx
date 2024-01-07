import React, { useState } from 'react'
import {toast} from "react-toastify"
import {NavLink} from "react-router-dom"
import Footer from "../PageComponents/Footer"
function Contact() {
  const [name, setName]= useState("null");
  const [email, setEmail]= useState("null");
  const [description,setDescription]= useState("null");
  const [sending, setSending]= useState(false);
  let timeoutId;
  function nameHandler() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setName(fullName.value);
    }, 500);
  }
  function emailHandler() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setEmail(mail.value);
    }, 500);
  }
  function descriptionHandler() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setDescription(desc.value);
    }, 500);
  }
  async function submitHandler(e) {
    e.preventDefault();
    setSending(true);
    const body = {
      fullName: name,
      email: email,
      description: description,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/contactviaform`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.msg);
      } else {
        toast.error(data.error);
      }
      setSending(false); // Move this line inside the try block
    } catch (err) {
      toast.error("Server Under Maintenance, Please Try after some time");
      console.log(err)
      setSending(false); // Move this line inside the catch block
    }
  }
  
  return (
    <div className=' w-full relative h-auto'>
      <div className='mx-auto mt-16 text-white w-[80%] relative mb-16'>
        <h1 className=' text-5xl font-bold'>Let's Collaborate</h1>
        <p className='pt-4 text-xl opacity-70'>Get in Touch for Web Magic </p>
        <div className='flex  flex-col my-6 gap-6 md:flex-row'>
          <NavLink to="/About"><button className='bg-[#2c2c2c] px-8 py-3 rounded-md font-bold text-sm hover:opacity-80'>Schedule a call</button></NavLink>
          <a href={`mailto:${import.meta.env.VITE_MAIL}`}><button className='bg-[#171717]  border-[0.5px] border-opacity-5 px-12 py-3 rounded-md font-bold text-sm hover:text-black hover:bg-white'>Email</button></a>
        </div>
        {/*  the message block starts here  */}
        <div className=" bg-[#1c1c1c] border border-gray-500 rounded  px-6 py-4 mb-4">
          <h1>Send a Message </h1>
          <form onSubmit={submitHandler} method='POST'>
            <div className='flex flex-col gap-4 md:flex-row py-4'>
              <input type="text" name="fullName" id="fullName" placeholder='Name' onChange={nameHandler} className='text-white bg-[#1c1c1c] w-full md:w-[50%] py-2 px-4 rounded border border-gray-500' required={true}/>
              <input type="email" name="email" id="mail" placeholder='Your Virtual Address ' onChange={emailHandler} className='text-white bg-[#1c1c1c] w-full md:w-[50%] py-2 px-4 rounded border border-gray-500' required={true}/>
            </div>
            <div className='w-full py-4'>
              <textarea className='w-full rounded py-2 px-4 bg-[#2c2c2c]' name="description" id="desc" onChange={descriptionHandler} cols="30" rows="10" style={{resize:'none'}} placeholder='Any Message / Project Requirement' required={true}></textarea>
            </div>
            <input type="submit" value={sending ? "Sending...." : "Send Message"}  className='w-full bg-[#2c2c2c] px-4 py-4 rounded  cursor-pointer font-bold tracking-wider hover:opacity-80 '/>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact