'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  MapPinIcon,
  LinkIcon,
  EllipsisHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    location: '',
    industry: '',
    experience: ''
  })
  const [activeTab, setActiveTab] = useState('all')
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      type: 'person',
      name: 'John Doe',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      image: '/images/avatars/john.jpg',
      connections: 500,
      mutualConnections: 15,
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      saved: false
    },
    {
      id: 2,
      type: 'company',
      name: 'Tech Innovations Inc',
      industry: 'Technology',
      location: 'San Francisco, CA',
      image: '/images/companies/tech-innovations.jpg',
      followers: 10000,
      employees: 500,
      description: 'Leading technology company focused on innovative solutions.',
      saved: false
    },
    {
      id: 3,
      type: 'job',
      title: 'Frontend Developer',
      company: 'Digital Solutions',
      location: 'Remote',
      type: 'Full-time',
      posted: '2 days ago',
      applicants: 45,
      description: 'Looking for an experienced frontend developer to join our team.',
      saved: false
    }
  ])

  const handleFilterChange = (filter, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: value
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      type: '',
      location: '',
      industry: '',
      experience: ''
    })
  }

  const handleSave = (resultId) => {
    setSearchResults(results => 
      results.map(result => 
        result.id === resultId ? { ...result, saved: !result.saved } : result
      )
    )
  }

  const handleConnect = (resultId) => {
    // In a real app, this would trigger a connection request
    console.log('Connection request sent to:', resultId)
  }

  const handleFollow = (resultId) => {
    // In a real app, this would trigger a follow action
    console.log('Followed company:', resultId)
  }

  const handleApply = (resultId) => {
    // In a real app, this would trigger a job application
    console.log('Applied to job:', resultId)
  }

  const filteredResults = searchResults.filter(result => {
    if (activeTab !== 'all' && result.type !== activeTab) return false
    
    return (
      (!searchQuery || 
        result.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.company?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedFilters.type || result.type === selectedFilters.type) &&
      (!selectedFilters.location || result.location?.toLowerCase().includes(selectedFilters.location.toLowerCase())) &&
      (!selectedFilters.industry || result.industry?.toLowerCase().includes(selectedFilters.industry.toLowerCase()))
    )
  })

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                  placeholder="Search for people, companies, jobs, and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  <button
                    className="text-sm text-[#0a66c2] hover:text-[#004182]"
                    onClick={clearFilters}
                  >
                    Clear all
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                      value={selectedFilters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                      <option value="">All types</option>
                      <option value="person">People</option>
                      <option value="company">Companies</option>
                      <option value="job">Jobs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                      value={selectedFilters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    >
                      <option value="">Any location</option>
                      <option value="san-francisco">San Francisco</option>
                      <option value="new-york">New York</option>
                      <option value="london">London</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Industry
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                      value={selectedFilters.industry}
                      onChange={(e) => handleFilterChange('industry', e.target.value)}
                    >
                      <option value="">All industries</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Experience
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                      value={selectedFilters.experience}
                      onChange={(e) => handleFilterChange('experience', e.target.value)}
                    >
                      <option value="">Any experience</option>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="executive">Executive</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#0a66c2] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                activeTab === 'person'
                  ? 'bg-[#0a66c2] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('person')}
            >
              People
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                activeTab === 'company'
                  ? 'bg-[#0a66c2] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('company')}
            >
              Companies
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                activeTab === 'job'
                  ? 'bg-[#0a66c2] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('job')}
            >
              Jobs
            </button>
          </div>

          {/* Search Results */}
          <div className="space-y-6">
            {filteredResults.map(result => (
              <div
                key={result.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <img
                        src={result.image}
                        alt={result.name || result.title}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {result.name || result.title}
                        </h3>
                        {result.type === 'person' && (
                          <>
                            <p className="text-gray-600">{result.title}</p>
                            <p className="text-gray-600">{result.company}</p>
                          </>
                        )}
                        {result.type === 'company' && (
                          <>
                            <p className="text-gray-600">{result.industry}</p>
                            <p className="text-gray-600">{result.employees} employees</p>
                          </>
                        )}
                        {result.type === 'job' && (
                          <>
                            <p className="text-gray-600">{result.company}</p>
                            <p className="text-gray-600">{result.type} • {result.posted}</p>
                          </>
                        )}
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {result.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => handleSave(result.id)}
                      >
                        <LinkIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <EllipsisHorizontalIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {result.type === 'person' && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {result.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e8f3ff] text-[#0a66c2]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex space-x-4">
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0a66c2] hover:bg-[#004182]"
                          onClick={() => handleConnect(result.id)}
                        >
                          Connect
                        </button>
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          Message
                        </button>
                      </div>
                    </div>
                  )}

                  {result.type === 'company' && (
                    <div className="mt-4">
                      <p className="text-gray-600">{result.description}</p>
                      <div className="mt-4">
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0a66c2] hover:bg-[#004182]"
                          onClick={() => handleFollow(result.id)}
                        >
                          Follow
                        </button>
                      </div>
                    </div>
                  )}

                  {result.type === 'job' && (
                    <div className="mt-4">
                      <p className="text-gray-600">{result.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {result.applicants} applicants
                        </span>
                        <button
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0a66c2] hover:bg-[#004182]"
                          onClick={() => handleApply(result.id)}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 