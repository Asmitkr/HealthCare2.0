import React from 'react'
import image from '../assets/login.jpg'

const Login = () => {
  return (
    <div className='py-20 px-20 flex justify-center w-full h-screen bg-zinc-900'>
        <div className='relative flex flex-col justify-center  w-full rounded-lg' style={{ backgroundImage: `url(${image})`, backgroundSize:'cover'}}>
        <div className='absolute right-12'>
            <h1 className=' text-2xl mb-3'>Login!</h1>
            <form className=" flex flex-col h-1/2" action="">
            <input className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded" type="text" placeholder='User/Doctor/Company' />
            <input className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded" type="text" placeholder='email' />
            <input className="placeholder:text-zinc-500 bg-transparent w-72 outline-none rounded" type="password" placeholder='password' />
            <input className='placeholder:text-zinc-500 bg-green-500 w-72 outline-none rounded mt-3' type="submit" value="Login" />
            </form>
            <a className='absolute right-0 text-blue-500 mt-3' href="/signup">Don't have an Account!</a>
        </div>
        </div>
        
    </div>
  )
}

export default Login