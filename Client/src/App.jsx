import React from 'react'
import Preloader from './Components/Preloader'
import MainPage from './Components/MainPage'
import { BrowserRouter } from 'react-router-dom'
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return(
    <div className='relative'>
     <Preloader/>
     <BrowserRouter>
      <MainPage/>
     </BrowserRouter>
     <ToastContainer/>
    </div>
  )
}

export default App