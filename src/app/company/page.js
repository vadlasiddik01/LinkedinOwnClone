'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  BuildingOfficeIcon,
  MapPinIcon,
  GlobeAltIcon,
  UserGroupIcon,
  BriefcaseIcon,
  CalendarIcon,
  LinkIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    department: '',
    location: '',
    jobType: '',
    experience: ''
  })
  const [company, setCompany] = useState({
    id: 1,
    name: 'Tech Innovations Inc',
    logo: '/images/companies/tech-innovations.jpg',
    coverImage: '/images/companies/tech-innovations-cover.jpg',
    industry: 'Technology',
    size: '501-1000',
    founded: 2010,
    location: 'San Francisco, CA',
    website: 'www.techinnovations.com',
    description: 'Leading technology company focused on innovative solutions for businesses worldwide.',
    specialties: ['AI', 'Cloud Computing', 'Enterprise Software', 'Cybersecurity'],
    followers: 25000,
    following: false,
    saved: false,
    employees: [
      {
        id: 1,
        name: 'John Smith',
        title: 'CEO',
        image: '/images/avatars/john.jpg',
        connected: true
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        title: 'CTO',
        image: '/images/avatars/sarah.jpg',
        connected: false
      }
    ],
    jobs: [
      {
        id: 1,
        title: 'Senior Software Engineer',
        department: 'Engineering',
        location: 'San Francisco, CA',
        type: 'Full-time',
        posted: '2 days ago',
        applicants: 45,
        saved: false
      },
      {
        id: 2,
        title: 'Product Manager',
        department: 'Product',
        location: 'Remote',
        type: 'Full-time',
        posted: '1 week ago',
        applicants: 32,
        saved: false
      }
    ],
    updates: [
      {
        id: 1,
        type: 'post',
        content: 'We are excited to announce our new AI-powered platform!',
        date: '2 days ago',
        likes: 120,
        comments: 15,
        liked: false
      },
      {
        id: 2,
        type: 'job',
        content: 'New job opening: Senior Software Engineer',
        date: '3 days ago',
        likes: 45,
        comments: 8,
        liked: false
      }
    ]
  })

  const handleFilterChange = (filter, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: value
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      department: '',
      location: '',
      jobType: '',
      experience: ''
    })
  }

  const handleFollow = () => {
    setCompany(prev => ({
      ...prev,
      following: !prev.following
    }))
  }

  const handleSave = () => {
    setCompany(prev => ({
      ...prev,
      saved: !prev.saved
    }))
  }

  const handleConnect = (employeeId) => {
    setCompany(prev => ({
      ...prev,
      employees: prev.employees.map(emp =>
        emp.id === employeeId ? { ...emp, connected: !emp.connected } : emp
      )
    }))
  }

  const handleSaveJob = (jobId) => {
    setCompany(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === jobId ? { ...job, saved: !job.saved } : job
      )
    }))
  }

  const handleLikeUpdate = (updateId) => {
    setCompany(prev => ({
      ...prev,
      updates: prev.updates.map(update =>
        update.id === updateId
          ? {
              ...update,
              liked: !update.liked,
              likes: update.liked ? update.likes - 1 : update.likes + 1
            }
          : update
      )
    }))
  }

  const filteredJobs = company.jobs.filter(job => {
    return (
      (!selectedFilters.department || job.department === selectedFilters.department) &&
      (!selectedFilters.location || job.location === selectedFilters.location) &&
      (!selectedFilters.jobType || job.type === selectedFilters.jobType)
    )
  })

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef]">
        {/* Cover Image */}
        <div className="h-48 bg-gray-200 relative">
          <img
            src={company.coverImage}
            alt={company.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
          {/* Company Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-24 w-24 rounded-lg object-cover border-4 border-white"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-600">{company.industry}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {company.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <UserGroupIcon className="h-4 w-4 mr-1" />
                      {company.size} employees
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <GlobeAltIcon className="h-4 w-4 mr-1" />
                      <a href={`https://${company.website}`} className="text-[#0a66c2] hover:underline">
                        {company.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                    company.following
                      ? 'text-white bg-[#0a66c2] hover:bg-[#004182]'
                      : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300'
                  }`}
                  onClick={handleFollow}
                >
                  {company.following ? 'Following' : 'Follow'}
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-gray-500"
                  onClick={handleSave}
                >
                  {company.saved ? (
                    <BookmarkIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <BookmarkIcon className="h-5 w-5" />
                  )}
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <ShareIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-600">{company.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {company.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e8f3ff] text-[#0a66c2]"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-4">
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-[#0a66c2] text-[#0a66c2]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'jobs'
                      ? 'border-[#0a66c2] text-[#0a66c2]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('jobs')}
                >
                  Jobs
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'people'
                      ? 'border-[#0a66c2] text-[#0a66c2]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('people')}
                >
                  People
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'updates'
                      ? 'border-[#0a66c2] text-[#0a66c2]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('updates')}
                >
                  Updates
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
                    <p className="text-gray-600">{company.description}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h2>
                    <dl className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Founded</dt>
                        <dd className="mt-1 text-sm text-gray-900">{company.founded}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Company Size</dt>
                        <dd className="mt-1 text-sm text-gray-900">{company.size}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Industry</dt>
                        <dd className="mt-1 text-sm text-gray-900">{company.industry}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Location</dt>
                        <dd className="mt-1 text-sm text-gray-900">{company.location}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {activeTab === 'jobs' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Open Positions</h2>
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

                  {showFilters && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-900">Filters</h3>
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
                            Department
                          </label>
                          <select
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                            value={selectedFilters.department}
                            onChange={(e) => handleFilterChange('department', e.target.value)}
                          >
                            <option value="">All departments</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Product">Product</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
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
                            <option value="">All locations</option>
                            <option value="San Francisco, CA">San Francisco</option>
                            <option value="Remote">Remote</option>
                            <option value="New York, NY">New York</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Job Type
                          </label>
                          <select
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                            value={selectedFilters.jobType}
                            onChange={(e) => handleFilterChange('jobType', e.target.value)}
                          >
                            <option value="">All types</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
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
                            <option value="">All levels</option>
                            <option value="entry">Entry Level</option>
                            <option value="mid">Mid Level</option>
                            <option value="senior">Senior Level</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {filteredJobs.map(job => (
                      <div
                        key={job.id}
                        className="bg-white rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {job.title}
                            </h3>
                            <div className="mt-2 space-y-1">
                              <p className="text-gray-600">{job.department}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                {job.location}
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <BriefcaseIcon className="h-4 w-4 mr-1" />
                                {job.type}
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                Posted {job.posted}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              className="p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => handleSaveJob(job.id)}
                            >
                              {job.saved ? (
                                <BookmarkIcon className="h-5 w-5 text-gray-500" />
                              ) : (
                                <BookmarkIcon className="h-5 w-5" />
                              )}
                            </button>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0a66c2] hover:bg-[#004182]">
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'people' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Employees</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {company.employees.map(employee => (
                      <div
                        key={employee.id}
                        className="bg-white rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={employee.image}
                            alt={employee.name}
                            className="h-12 w-12 rounded-full"
                          />
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-900">
                              {employee.name}
                            </h3>
                            <p className="text-sm text-gray-600">{employee.title}</p>
                            <button
                              className={`mt-2 inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md ${
                                employee.connected
                                  ? 'border-transparent text-white bg-[#0a66c2] hover:bg-[#004182]'
                                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                              }`}
                              onClick={() => handleConnect(employee.id)}
                            >
                              {employee.connected ? 'Connected' : 'Connect'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'updates' && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Company Updates</h2>
                  <div className="space-y-4">
                    {company.updates.map(update => (
                      <div
                        key={update.id}
                        className="bg-white rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-gray-900">{update.content}</p>
                            <p className="mt-1 text-sm text-gray-500">{update.date}</p>
                          </div>
                          <button
                            className="p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => handleLikeUpdate(update.id)}
                          >
                            {update.liked ? (
                              <StarIcon className="h-5 w-5 text-yellow-400" />
                            ) : (
                              <StarIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{update.likes} likes</span>
                          <span>{update.comments} comments</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 