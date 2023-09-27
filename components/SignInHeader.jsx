import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedOut, SignedIn, RedirectToSignIn, SignOutButton } from '@clerk/nextjs'
const SignInHeader = () => {
  return (
<div className='flex justify-between items-center max-w-screen-xl mx-auto w-4/5 border-b border-gray-300'>
  <div className='flex items-center mb-3 ml-3'>
  <Image src='/magnifying-glass.svg' alt="magnifying-glass" width={34} height={34} />
    <h1 className='sm:text-3xl text-xl font-bold ml-1 tracking-tight text-white'>PotholeFinder</h1>
  </div>
  <div className='flex justify-end mt-3  pb-7 sm:px-4 px-2  gap-4 w-full'>
    <Link href='/' className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-gray-600 text-white px-5 py-2 text-sm shadow-md hover:bg-gray-400 bg-gray-600 font-medium transition">Back</Link>
    <Link href='/signup' className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-400 bg-blue-600 font-medium transition">Sign Up</Link>
    

    
  </div>
</div>
  )
}

export default SignInHeader