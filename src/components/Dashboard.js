'use client'

import { useState } from 'react'
import AvailabilityForm from './AvailabilityForm'
import EventList from './EventList'

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('availability')

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p>Welcome, {user.name || user.email}</p>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('availability')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'availability'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Set Availability
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'events'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Events
              </button>
            </nav>
          </div>
          <div className="mt-6">
            {activeTab === 'availability' && <AvailabilityForm userId={user.id} />}
            {activeTab === 'events' && <EventList userId={user.id} />}
          </div>
        </div>
      </main>
    </div>
  )
}