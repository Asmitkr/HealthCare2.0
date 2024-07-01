import React, { useState } from 'react';
import { IoSearchSharp, IoCloseSharp } from "react-icons/io5";

const Companyhome = () => {


  return (
    <div className="p-5 bg-zinc-900 w-full min-h-screen text-white">
      <div className="relative flex">
        <div>Company name</div>
        <a className="absolute right-0" href="/">
          Logout
        </a>
      </div>
      <div className="flex gap-4 h-1/2">
        <div className="mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
            <p className="text-xl mb-2">Add Plans</p>
            <textarea placeholder='Write the plan' className="bg-transparent border-2 w-full placeholder:text-zinc-900" name="" id=""></textarea>
            <div className="flex justify-end">
            <button className='bg-blue-900 text-white p-1 rounded-md w-1/3'>Add</button>
            </div>
        </div>
        <div className="mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
            <p className="text-xl mb-2">Search Plans</p>
            <form  className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoSearchSharp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Plans"
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
        <button
          type="button"
          className="mr-6 text-white absolute end-16 bottom-2.5 bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Reset
        </button>
      </form>
      <p className='mt-2.5'>No Such Plans.</p>
        </div>
      </div>
      <div className="flex gap-4 h-1/2">
        <div className='w-1/2'><div className="mt-2 w-full bg-blue-300 rounded-lg p-1 text-black">
            <p className="text-xl mb-2">Approved Insurances</p>
            <p>Insurance 1</p>
            <p className='mb-1'>Insurance 2</p>
            <p >Insurance 3</p>
            <p className='mb-1'>Insurance 4</p>
        </div>
        <div className="mt-2 w-full bg-blue-300 rounded-lg p-1 text-black">
            <p className="text-xl mb-2">Claim Requests</p>
            <div className='mb-2'>
            <div className='flex'>
                <p className='w-1/2'>Request 1</p>
            </div>
          <div><textarea
            className="placeholder:text-zinc-900 bg-transparent border-2 w-full mt-2"
            placeholder="Type your reply..."
          />
          <div className="flex justify-end">
            <button className='bg-blue-900 text-white p-1 rounded-md w-1/3'>Send</button>
            </div>
          </div>
        </div>
        <div className='mb-2'>
            <div className='flex'>
                <p className='w-1/2'>Request 2</p>
            </div>
          <div><textarea
            className="placeholder:text-zinc-900 bg-transparent border-2 w-full mt-2"
            placeholder="Type your reply..."
          />
          <div className="flex justify-end">
            <button className='bg-blue-900 text-white p-1 rounded-md w-1/3'>Send</button>
            </div>
          </div>
        </div>
        </div></div>
        <div className="mt-2 w-1/2 bg-blue-300 h-full rounded-lg p-1 text-black">
            <p className="text-xl mb-2">Insurance Requests</p>
            <div className='mb-2'><div className='flex'>
                <p className='w-1/2'>Request 1</p>
                <div className='flex justify-end w-1/2'>
                <button
                    className="bg-green-500 mr-2 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                  >
                    Reject
                  </button>
                </div>
            </div>
          <div><textarea
            className="placeholder:text-zinc-900 bg-transparent border-2 w-full mt-2"
            placeholder="Type your reply..."
          />
          <div className="flex justify-end">
            <button className='bg-blue-900 text-white p-1 rounded-md w-1/3'>Send</button>
            </div>
          </div>
        </div>
        <div className='mb-2'><div className='flex'>
                <p className='w-1/2'>Request 1</p>
                <div className='flex justify-end w-1/2'>
                <button
                    className="bg-green-500 mr-2 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                  >
                    Reject
                  </button>
                </div>
            </div>
          <div><textarea
            className="placeholder:text-zinc-900 bg-transparent border-2 w-full mt-2"
            placeholder="Type your reply..."
          />
          <div className="flex justify-end">
            <button className='bg-blue-900 text-white p-1 rounded-md w-1/3'>Send</button>
            </div>
          </div>
        </div>
        <div className='mb-2'><div className='flex'>
                <p className='w-1/2'>Request 1</p>
                <div className='flex justify-end w-1/2'>
                <button
                    className="bg-green-500 mr-2 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
                  >
                    Reject
                  </button>
                </div>
            </div>
          <div><textarea
            className="placeholder:text-zinc-900 bg-transparent border-2 w-full mt-2"
            placeholder="Type your reply..."
          />
          <div className="flex justify-end">
            <button className='bg-blue-900 text-white p-1 rounded-md w-1/3'>Send</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Companyhome