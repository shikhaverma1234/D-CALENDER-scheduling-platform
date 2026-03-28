'use client'

import { useState } from 'react'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function AvailabilityForm({ userId }) {
  const [availability, setAvailability] = useState(
    days.map((day, index) => ({ day: index, start: '09:00', end: '17:00' }))
  )

  const handleChange = (index, field, value) => {
    const newAvailability = [...availability]
    newAvailability[index][field] = value
    setAvailability(newAvailability)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Save to DB
    const response = await fetch('/api/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, availability }),
    })
    if (response.ok) {
      alert('Availability saved!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Set Your Availability</h2>
      {availability.map((avail, index) => (
        <div key={index} className="flex items-center space-x-4">
          <label className="w-20">{days[index]}</label>
          <input
            type="time"
            value={avail.start}
            onChange={(e) => handleChange(index, 'start', e.target.value)}
            className="border rounded px-2 py-1"
          />
          <span>to</span>
          <input
            type="time"
            value={avail.end}
            onChange={(e) => handleChange(index, 'end', e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save Availability
      </button>
    </form>
  )
}