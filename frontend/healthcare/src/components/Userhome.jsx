import React from 'react'

const Userhome = () => {
  return (
    <div className='p-5 bg-zinc-900 w-full h-screen text-white'>
        <div className='relative flex'>
            <div>Username</div>
            <a className='absolute right-0' href="/">Logout</a>
        </div>
        <div className='flex gap-4 h-1/2'>
        <div className='mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black'>
            <p className='text-xl'>Current Appointment</p>
        </div>
        <div className='mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black'>
            <p className='text-xl'>Current insurance</p>
        </div></div>
    </div>
  )
}

export default Userhome