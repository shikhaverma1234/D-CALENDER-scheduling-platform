'use client'

import { useState, useMemo } from 'react'
import { format } from 'date-fns'

export default function BookingForm({ user }) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const availableSlots = useMemo(() => {
    // Calculate available slots for selected date
    const dayOfWeek = selectedDate.getDay()
    const avail = user.availabilities.find(a => a.dayOfWeek === dayOfWeek)
    if (avail) {
      const slots = []
      const start = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${avail.startTime}`)
      const end = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${avail.endTime}`)
      let current = new Date(start)
      while (current < end) {
        slots.push(format(current, 'HH:mm'))
        current = new Date(current.getTime() + 60 * 60 * 1000) // 1 hour slots
      }
      return slots
    } else {
      return []
    }
  }, [selectedDate, user.availabilities])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const startTime = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}`)
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000)

    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        startTime,
        endTime,
        userId: user.id,
        attendees: [], // for now
      }),
    })
    if (response.ok) {
      alert('Appointment booked!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Time</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2"
        >
          <option value="">Select time</option>
          {availableSlots.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border rounded px-3 py-2"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Book Appointment
      </button>
    </form>
  )
}