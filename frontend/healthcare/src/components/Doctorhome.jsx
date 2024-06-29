import React from 'react'

const Doctorhome = () => {
  return (
    <div className="p-5 bg-zinc-900 w-full min-h-screen text-white">
      <div className="relative flex">
        <div>Dr. name</div>
        <a className="absolute right-0" href="/">
          Logout
        </a>
        </div>
            <div className="flex gap-4 h-1/2">
                <div className="mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
                    <p className="text-xl">Pending Requests</p>
                    <div className='flex gap-2 mt-2'>
                        <p>Request 1</p>
                        <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded">
                        Accept
                        </button>
                        <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded">
                        Deny
                        </button>
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <p>Request 2</p>
                        <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded">
                        Accept
                        </button>
                        <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded">
                        Deny
                        </button>
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <p>Request 3</p>
                        <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded">
                        Accept
                        </button>
                        <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded">
                        Deny
                        </button>
                    </div>
                </div>
                <div className="mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
                    <p className="text-xl">Upcoming Appointments</p>
                    <div className='flex gap-2 mt-2'>
                        <p>Appointment 1</p>
                        <p>Time</p>
                        <p>Date</p>
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <p>Appointment 2</p>
                        <p>Time</p>
                        <p>Date</p>
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <p>Appointment 3</p>
                        <p>Time</p>
                        <p>Date</p>
                    </div>
                    <div className='flex gap-2 mt-1'>
                        <p>Appointment 4</p>
                        <p>Time</p>
                        <p>Date</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center h-1/2 w-full">
                <div className="mt-4 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
                    <p className="text-xl">Previous Appointments</p>
                    <div className='flex gap-2 mt-2'>
                        <p>User 1</p>
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <p>User 2</p>
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <p>User 3</p>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Doctorhome