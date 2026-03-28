'use client'

import { useEffect, useState } from 'react'

export default function EventList({ userId }) {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(setEvents)
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Events</h2>
      <ul className="space-y-2">
        {events.map(event => (
          <li key={event.id} className="border rounded p-4">
            <h3 className="font-medium">{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}</p>
            <p>Status: {event.status}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}