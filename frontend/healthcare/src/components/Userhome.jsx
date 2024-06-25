import React from 'react'

const Userhome = () => {

  return (
    <div className='p-5 bg-zinc-900 w-full min-h-screen text-white'>
        <div className='relative flex'>
            <div>Username</div>
            <a className='absolute right-0' href="/">Logout</a>
        </div>
        <div className='flex gap-4 h-1/2'>
        <div className='mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black'>
            <p className='text-xl'>Current Appointment</p>
            <ul className='list-disc pl-5'>
            <li className=''>Current Appointment1</li>
            <li className=''>Current Appointment2</li>
            <li className=''>Current Appointment3</li>
            </ul>
        </div>
        <div className='mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black'>
            <p className='text-xl'>Current insurance</p>
            <ul className='list-disc pl-5'>
            <li className=''>Current insurance1</li>
            <li className=''>Current insurance2</li>
            <li className=''>Current insurance3</li>
            </ul>
        </div></div>
        <div className='flex gap-4 h-1/2 mt-5 '>
        <div className='mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black'>
            <p className='text-xl'>Schedule Appointment</p>
            <form class="max-w-md mx-auto mt-3">   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Doctor" required />
                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <textarea className='p-2 mt-2 bg-transparent border-2 w-full h-12 placeholder:text-zinc-900' name="" id="" placeholder='Doctor Name'></textarea>
            <div className="p-5 bg-transparent w-full text-white border-2">
            <label htmlFor="datepicker" className="text-zinc-900">
             Select a date:
            </label>
            <input
            type="date"
            id="datepicker"
            className=" border-2 mt-2 w-full bg-blue-300 rounded-lg p-1 text-black"/></div>
            <input className='bg-blue-300 mt-2 w-full border-2 p-1 placeholder:text-zinc-900' type="text" placeholder='Time'/>
            <input className='bg-blue-300 mt-2 w-full border-2 p-1 placeholder:text-zinc-900' type="text" placeholder='Status'/>
            <textarea className='p-2 mt-2 bg-transparent border-2 w-full h-28 placeholder:text-zinc-900' name="" id="" placeholder='Give Description'></textarea>
        </div>
        <div className='mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black'>
            <p className='text-xl'>Apply for insurance</p>
            <form class="max-w-md mx-auto mt-3">   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Company" required />
                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <textarea className='p-2 mt-2 bg-transparent border-2 w-full h-12 placeholder:text-zinc-900' name="" id="" placeholder='Company Name'></textarea>
            <div className="p-5 bg-transparent w-full text-white border-2">
            <label htmlFor="datepicker" className="text-zinc-900">
             Select a date:
            </label>
            <input
            type="date"
            id="datepicker"
            className=" border-2 mt-2 w-full bg-blue-300 rounded-lg p-1 text-black"/></div>
            <input className='bg-blue-300 mt-2 w-full border-2 p-1 placeholder:text-zinc-900' type="text" placeholder='Time'/>
            <input className='bg-blue-300 mt-2 w-full border-2 p-1 placeholder:text-zinc-900' type="text" placeholder='Status'/>
            <textarea className='p-2 mt-2 bg-transparent border-2 w-full h-28 placeholder:text-zinc-900' name="" id="" placeholder='Give Description'></textarea>
        </div></div>
    </div>
  )
}

export default Userhome