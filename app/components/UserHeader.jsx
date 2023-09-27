'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, UserButton, useUser } from '@clerk/nextjs'

const UserHeader = () => {
    const { isLoaded, isSignedIn, user } = useUser();
 
    if (!isLoaded || !isSignedIn) {
      return null;
    }
  return (
<div className='flex justify-between items-center max-w-screen-xl mx-auto w-4/5 border-b border-gray-300'>
  <div className='flex items-center mb-3 ml-3'>
  <Image src='/magnifying-glass.svg' alt="magnifying-glass" width={34} height={34} />
    <h1 className='sm:text-3xl text-xl font-bold ml-1 tracking-tight text-white'>PotholeFinder</h1>
  </div>
  <div className='flex justify-end mt-3  pb-7 sm:px-4 px-2  gap-6 w-full'>
  <h3 className='pt-2 font-semibold'>Welcome, {user.firstName}</h3>
  <Link href='/' className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-gray-600 text-white px-5 py-2 text-sm shadow-md hover:bg-gray-400 bg-gray-600 font-medium transition">Back</Link>
    <UserButton afterSignOutUrl='/'/>

    
  </div>
</div>
  )
}

export default UserHeader