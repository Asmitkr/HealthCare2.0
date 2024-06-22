import React from 'react'
import image from '../assets/login.jpg'

const Signup = () => {
  return (
    <div className='py-20 px-20 flex justify-center w-full h-screen bg-zinc-900'>
        <div className='relative flex flex-col justify-center  w-full rounded-lg' style={{ backgroundImage: `url(${image})`, backgroundSize:'cover'}}>
        <div className='flex flex-col absolute right-12'>
            <a className='text-blue-800' href="/signup_user">Register as User</a>
            <a className='text-blue-800' href="/signup_dr">Register as Doctor</a>
            <a className='text-blue-800' href="/signup_comp">Register as Company</a>
        </div>
        </div>
        
    </div>
  )
}

export default Signup