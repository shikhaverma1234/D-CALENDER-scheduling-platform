import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const events = await prisma.event.findMany({
    where: { userId: session.user.id },
  })

  return new Response(JSON.stringify(events), { status: 200 })
}

export async function POST(request) {
  const { title, description, startTime, endTime, userId, attendees } = await request.json()

  const event = await prisma.event.create({
    data: {
      title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      userId,
      attendees,
    },
  })

  return new Response(JSON.stringify(event), { status: 201 })
}