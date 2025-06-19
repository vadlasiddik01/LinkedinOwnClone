'use client'

import { useState, useContext } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { ThemeContext } from '@/components/layout/MainLayout'
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  ClockIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  VideoCameraIcon,
  BookmarkIcon,
  ShareIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline'

export default function EventsPage() {
  const { theme } = useContext(ThemeContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    date: '',
    type: '',
    location: ''
  })
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Tech Networking Mixer',
      category: 'networking',
      date: '2024-03-15',
      time: '18:00',
      location: 'San Francisco, CA',
      type: 'in-person',
      thumbnail: '/images/events/tech-mixer.jpg',
      description: 'Join us for an evening of networking with tech professionals from leading companies.',
      attendees: 245,
      maxAttendees: 300,
      organizer: {
        name: 'Tech Community SF',
        avatar: '/images/companies/tech-community.jpg'
      },
      joined: false,
      bookmarked: false,
      shared: false
    },
    {
      id: 2,
      title: 'AI & Machine Learning Conference',
      category: 'conference',
      date: '2024-03-20',
      time: '09:00',
      location: 'Online',
      type: 'virtual',
      thumbnail: '/images/events/ai-conference.jpg',
      description: 'A comprehensive conference covering the latest developments in AI and ML.',
      attendees: 1200,
      maxAttendees: 2000,
      organizer: {
        name: 'AI Research Institute',
        avatar: '/images/companies/ai-institute.jpg'
      },
      joined: false,
      bookmarked: false,
      shared: false
    }
  ])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', description: '' })

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'networking', label: 'Networking' },
    { id: 'conference', label: 'Conference' },
    { id: 'workshop', label: 'Workshop' },
    { id: 'webinar', label: 'Webinar' },
    { id: 'career', label: 'Career Fair' }
  ]

  const handleFilterChange = (filter, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: value
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      category: '',
      date: '',
      type: '',
      location: ''
    })
  }

  const handleJoin = (eventId) => {
    setEvents(events => events.map(ev => ev.id === eventId ? { ...ev, joined: !ev.joined } : ev))
  }

  const handleBookmark = (eventId) => {
    setEvents(events => events.map(ev => ev.id === eventId ? { ...ev, bookmarked: !ev.bookmarked } : ev))
  }

  const handleShare = (eventId) => {
    setEvents(events => events.map(ev => ev.id === eventId ? { ...ev, shared: true } : ev))
    setTimeout(() => setEvents(events => events.map(ev => ev.id === eventId ? { ...ev, shared: false } : ev)), 1000)
  }

  const handleCreateEvent = (e) => {
    e.preventDefault()
    if (newEvent.title && newEvent.date && newEvent.time && newEvent.location) {
      setEvents([
        {
          id: Date.now(),
          ...newEvent,
          category: 'custom',
          type: 'in-person',
          thumbnail: '',
          description: newEvent.description,
          attendees: 1,
          maxAttendees: 100,
          organizer: { name: 'You', avatar: '/images/avatars/john.jpg' },
          joined: true,
          bookmarked: false,
          shared: false
        },
        ...events
      ])
      setShowCreateModal(false)
      setNewEvent({ title: '', date: '', time: '', location: '', description: '' })
    }
  }

  const filteredEvents = events.filter(ev => {
    return (
      (!searchQuery || ev.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedFilters.category || ev.category === selectedFilters.category) &&
      (!selectedFilters.date || ev.date === selectedFilters.date) &&
      (!selectedFilters.type || ev.type === selectedFilters.type) &&
      (!selectedFilters.location || ev.location.toLowerCase().includes(selectedFilters.location.toLowerCase()))
    )
  })

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Events</h1>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0a66c2] hover:bg-[#004182]">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Event
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm dark:text-gray-100"
                  placeholder="Search events"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                Filters
                {showFilters ? (
                  <ChevronUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                )}
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Filters</h3>
                  <button
                    className="text-sm text-[#0a66c2] hover:text-[#004182]"
                    onClick={clearFilters}
                  >
                    Clear all
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Category
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm dark:bg-gray-900 dark:text-gray-100"
                      value={selectedFilters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                      <option value="">All categories</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Date
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm dark:bg-gray-900 dark:text-gray-100"
                      value={selectedFilters.date}
                      onChange={(e) => handleFilterChange('date', e.target.value)}
                    >
                      <option value="">Any date</option>
                      <option value="today">Today</option>
                      <option value="tomorrow">Tomorrow</option>
                      <option value="this-week">This week</option>
                      <option value="this-month">This month</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Type
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm dark:bg-gray-900 dark:text-gray-100"
                      value={selectedFilters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                      <option value="">All types</option>
                      <option value="in-person">In-person</option>
                      <option value="virtual">Virtual</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Location
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm dark:bg-gray-900 dark:text-gray-100"
                      value={selectedFilters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    >
                      <option value="">Any location</option>
                      <option value="san-francisco">San Francisco</option>
                      <option value="new-york">New York</option>
                      <option value="london">London</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap"
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="flex">
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="h-48 w-64 object-cover"
                  />
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                          <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-1" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-5 w-5 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            {event.type === 'virtual' ? (
                              <VideoCameraIcon className="h-5 w-5 mr-1" />
                            ) : (
                              <MapPinIcon className="h-5 w-5 mr-1" />
                            )}
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100">
                          <BookmarkIcon className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100">
                          <ShareIcon className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100">
                          <EllipsisHorizontalIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <UserGroupIcon className="h-5 w-5 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {event.attendees} attending
                          </span>
                        </div>
                        <div className="flex items-center">
                          <img
                            src={event.organizer.avatar}
                            alt={event.organizer.name}
                            className="h-6 w-6 rounded-full mr-2"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {event.organizer.name}
                          </span>
                        </div>
                      </div>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0a66c2] hover:bg-[#004182]">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 