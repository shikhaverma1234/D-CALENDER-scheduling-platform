import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Scheduling Platform</h1>
        <p className="text-gray-600 text-center mb-6">
          Schedule appointments and meetings with ease.
        </p>
        <div className="space-y-4">
          <Link href="/auth/signin" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 block text-center">
            Sign In
          </Link>
          <Link href="/dashboard" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 block text-center">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}