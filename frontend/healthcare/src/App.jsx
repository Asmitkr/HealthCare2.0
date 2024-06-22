import { useState } from 'react'
import './index.css'
import Login from './components/Login'
import Signup from './components/Signup'
//import Doctor from './components/Doctor'
//import Insurance from './components/insurance'
//import User from './components/user'
import { BrowserRouter as Router, Routes , Route,} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { useAuthContext } from './context/AuthContext'

function App() {
  //const {authUser} = useAuthContext();
  return (
    <>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
        <ToastContainer position='top-center'/>
    </>
  )
}

export default App