import React from 'react';
import { NavLink } from 'react-router-dom';
// import '../assets/NavLinkcss.css'
import "../../assets/NavLinkcss.css"

function NavlinkIcon({links_data, icon}) {
  return (
    <div className=' w-full flex  flex-coljustify-center h-full mx-auto text-center rounded-md '>
        <NavLink to={`${links_data.url}`} className="w-full h-full flex items-center pl-6 rounded-md text-lg hover:bg-[#2c2c2c] md:pl-2 overflow-hidden">
            <div className='flex flex-row gap-2 items-center justify-center'>
                <h3 className={`${!icon?"mx-auto": "pl-3"}`}>{links_data.icon_link}</h3>
                <h3 className={`${!icon?" break-words":"hidden"}`}>{links_data.title}</h3>
            </div>
        </NavLink>
    </div>
  )
}

export default NavlinkIcon