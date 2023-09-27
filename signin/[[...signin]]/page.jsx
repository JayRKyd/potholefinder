'use client'
import { SignIn } from "@clerk/clerk-react"

const SignInPage = () => {
  return (
    <>
        <div className='bg-slate-500 flex items center justify-center pt-11'>
        <SignIn className='mx-auto my-auto' />
        </div>
    </>
  )
}

export default SignInPage