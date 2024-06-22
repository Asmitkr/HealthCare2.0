import React from 'react'
import image from '../assets/login.jpg'

const Signup_user = () => {
  return (
    <div><div className='py-20 px-20 flex justify-center w-full h-screen bg-zinc-900'>
    <div className='relative flex flex-col justify-center  w-full rounded-lg' style={{ backgroundImage: `url(${image})`, backgroundSize:'cover'}}>
    <div className='absolute right-12'>
        <h1 className=' text-2xl mb-3'>Register as a User</h1>
        <form className=" flex flex-col h-1/2" action="">
        <input className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded" type="text" placeholder='Full Name' />
        <input className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded" type="text" placeholder='Email' />
        <input className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded" type="password" placeholder='Password' />
        <input className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded" type="text" placeholder='Gender' />
        <input className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded" type="text" placeholder='Address' />
        <input className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded" type="Number" placeholder='Age' />
        <input className="placeholder:text-zinc-500 bg-transparent w-72 mb-3 outline-none rounded" type="text" placeholder='Phone Number' />
        <input className='placeholder:text-zinc-500 bg-green-500 w-72 outline-none rounded mt-3' type="submit" value="Sign Up" />
        </form>
    </div>
    </div>
    
</div></div>
  )
}

export default Signup_user