import React, { useEffect, useState } from "react";
import Footer from "../PageComponents/Footer";
import Loader from "../PageComponents/Loader";
import TechCard from "../PageComponents/TechCard";
import {toast} from "react-toastify" 

function TechStack() {
  const [frontend, setFrontend] = useState([]);
  const [backend, setBackend] = useState([]);
  const [language, setLanguage] = useState([]);
  const [other, setOther] = useState([]);
  const [database, setDatabase] = useState([]);
  const[loading, setLoading]= useState(false)
  async function fetchDatas() {
    setLoading(true)
    const requests = [
      `${import.meta.env.VITE_BACKEND_URL}/techs/Frontend`,
      `${import.meta.env.VITE_BACKEND_URL}/techs/Backend`,
      `${import.meta.env.VITE_BACKEND_URL}/techs/Language`,
      `${import.meta.env.VITE_BACKEND_URL}/techs/Other`,
      `${import.meta.env.VITE_BACKEND_URL}/techs/DatabaseManagement`,
    ];

    try {
      const responses = await Promise.all(
        requests.map(async (url) => {
          const response = await fetch(url);
          return response.json();
        })
      );

      setFrontend(responses[0].data);
      setBackend(responses[1].data);
      setLanguage(responses[2].data);
      setOther(responses[3].data);
      setDatabase(responses[4].data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(true);
      toast.warn("We are unable to connect to the Server")
      // Handle errors here
    }
  }

  useEffect(() => {
    fetchDatas();
  }, []);

  // console.log(frontend);
  // console.log(backend);
  // console.log(other);
  // console.log(language);
  // console.log(database);
  return (
    <div className="w-full relative h-auto">
      <div className="mx-auto mt-16 text-white w-[80%] relative mb-16">
        <h1 className=" text-5xl font-bold">Coding Capabilities</h1>
        <p className="pt-4 text-xl opacity-70">
          Mastering the art of Development{" "}
        </p>
        <div className="border border-gray-500 my-8 rounded-lg w-[82vw]  md:w-[70vw]">
          {language && !loading? (
            <div className="mx-4 my-4">
              <h3 className="font-semibold mx-6 text-[20px]">
                Programming Langauges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                {language.map((data, index) => (
                  <div
                    key={index}
                    className=" m-4 rounded-md p-4 cursor-pointer hover:bg-[#292929]"
                  >
                    <TechCard data={data} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-[100px] flex justify-center pt-4">
              <Loader />
            </div>
          )}
        </div>
        <div className="border border-gray-500 my-8 rounded-lg w-[82vw] md:w-[70vw]">
          {frontend&& !loading? (
            <div className="mx-4 my-4">
              <h3 className="font-semibold mx-6 text-[20px]">Frontend</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                {frontend.map((data, index) => (
                  <div
                    key={index}
                    className=" m-4 rounded-md p-4 cursor-pointer hover:bg-[#292929]"
                  >
                    <TechCard data={data} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-[100px] flex justify-center pt-4">
              <Loader />
            </div>
          )}
        </div>
        <div className="border border-gray-500 my-8 rounded-lg w-[82vw] md:w-[70vw]">
          {backend&& !loading? (
            <div className="mx-4 my-4">
              <h3 className="font-semibold mx-6 text-[20px]">Backend</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                {backend.map((data, index) => (
                  <div
                    key={index}
                    className=" m-4 rounded-md p-4 cursor-pointer hover:bg-[#292929]"
                  >
                    <TechCard data={data} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-[100px] flex justify-center pt-4">
              <Loader />
            </div>
          )}
        </div>
        <div className="border border-gray-500 my-8 rounded-lg w-[82vw] md:w-[70vw]">
          {database && !loading?(
            <div className="mx-4 my-4">
              <h3 className="font-semibold mx-6 text-[20px]">
                DataBase Management{" "}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                {database.map((data, index) => (
                  <div
                    key={index}
                    className=" m-4 rounded-md p-4 cursor-pointer hover:bg-[#292929]"
                  >
                    <TechCard data={data} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-[100px] flex justify-center pt-4">
              <Loader />
            </div>
          )}
        </div>
        <div className="border border-gray-500 my-8 rounded-lg w-[82vw] md:w-[70vw]">
          {other&& !loading? (
            <div className="mx-4 my-4">
              <h3 className="font-semibold mx-6 text-[20px]">Other</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                {other.map((data, index) => (
                  <div
                    key={index}
                    className=" m-4 rounded-md p-4 cursor-pointer hover:bg-[#292929]"
                  >
                    <TechCard data={data} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-[100px] flex justify-center pt-4">
              <Loader />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TechStack;
