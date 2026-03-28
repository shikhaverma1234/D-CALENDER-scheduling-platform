'use client'

import { signIn } from 'next-auth/react'

export default function SignInForm() {
  const handleGoogleSignIn = () => {
    signIn('google')
  }

  const handleMicrosoftSignIn = () => {
    signIn('microsoft')
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleGoogleSignIn}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Sign in with Google
      </button>
      <button
        onClick={handleMicrosoftSignIn}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Sign in with Microsoft
      </button>
    </div>
  )
}