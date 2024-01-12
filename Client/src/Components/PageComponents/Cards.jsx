import React from "react";
import { Link } from "react-router-dom";

function Cards({ data }) {
  return (
    <Link to="/">
      <div className="w-full h-[300px]  md:h-[450px] flex flex-col rounded-lg overflow-hidden relative">
        <img
          src={data.image_url}
          alt={DataTransfer.title}
          className="bg-cover w-full h-[50%] md:h-[60%]"
        />
        <div className="w-full h-[50%] md:h-[40%] bg-[#2c2c2c]">
          <h3 className="mx-4  mt-2 text-xl font-bold">{data.title}</h3>
          <p className="block mx-4 mb-4 text-xs md:text-sm break-words ">
            {data.description.substring(0, 170)} ...
            <Link className="text-blue-400 underline cursor-not-allowed">read more</Link>
          </p>
          <div className="hidden lg:flex flex-row mx-4">
            {
              data.techStack.map((tech, index)=>{
              return <div className="relative group" key={index}>
                <img key={tech._id} src={tech.imageUrl} className="w-5 h-5 bg-contain rounded-full mx-2 bg-center" alt={tech.title}/>
                <span className="absolute bg-white -bottom-4 md:-bottom-12 hidden group-hover:block text-black text-xs p-2">{tech.title}</span>
              </div>
            })
            }
            <p className="hidden  lg:block text-gray-300 absolute right-4 bottom-4">Y.O.C: {data.createdAt.substring(0,4)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Cards;
