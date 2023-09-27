
import Image from 'next/image'
import MapComponent from './components/MapComponent'
import {auth, UserButton, useUser} from '@clerk/nextjs'
import  Link  from 'next/link'


export default function Home() {
  const {userId} = auth();

  return (
    <>
            <div className='flex justify-between items center bg-slate-500'>
      <div className='flex items-center mb-3 ml-3'>
      <Image src='/magnifying-glass.svg' alt="magnifying-glass" width={34} height={34} />
      <h1 className='sm:text-3xl text-xl font-bold ml-1 tracking-tight text-white'>PotholeFinder</h1>
      </div>
      {!userId && (
        <div className='flex justify-end mt-3 border-b pb-7 sm:px-4 px-2  border-gray-500 gap-4  w-full  '>
           <Link href='/signin' className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-gray-600 text-white px-5 py-2 text-sm shadow-md hover:bg-gray-400 bg-gray-600 font-medium transition">Login</Link>
          <Link href='/signup' className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-gray-600 text-white px-5 py-2 text-sm shadow-md hover:bg-gray-400 bg-gray-600 font-medium transition">SignUp</Link>
          <Link href='/reportpothole' className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-400 bg-blue-600 font-medium transition">Report a Pothole</Link> 
          </div>

      )}
      {userId && (
        <div className='flex justify-end mt-3 border-b pb-7 sm:px-4 px-2  border-gray-500 gap-4  w-full  '>

        <Link href='/users' className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-gray-600 text-white px-5 py-2 text-sm shadow-md hover:bg-gray-400 bg-gray-600 font-medium transition">Profile</Link>
        <Link href='/reportpothole' className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-400 bg-blue-600 font-medium transition">Report a Pothole</Link> 
        <UserButton afterSignOutUrl='/' />
        </div>
      )}

        </div>
          <MapComponent />
    </>
  )
}
