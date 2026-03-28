import { PrismaClient } from '@prisma/client'
import BookingForm from '../../../components/BookingForm'

const prisma = new PrismaClient()

export default async function SchedulePage({ params }) {
  const { userId } = params

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { availabilities: true },
  })

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Schedule with {user.name || user.email}</h1>
        <BookingForm user={user} />
      </div>
    </div>
  )
}