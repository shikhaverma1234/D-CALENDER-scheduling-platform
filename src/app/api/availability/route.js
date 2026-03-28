import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { userId, availability } = await request.json()

  if (userId !== session.user.id) {
    return new Response('Forbidden', { status: 403 })
  }

  // Delete existing
  await prisma.availability.deleteMany({
    where: { userId },
  })

  // Create new
  for (const avail of availability) {
    await prisma.availability.create({
      data: {
        userId,
        dayOfWeek: avail.day,
        startTime: avail.start,
        endTime: avail.end,
      },
    })
  }

  return new Response('OK', { status: 200 })
}