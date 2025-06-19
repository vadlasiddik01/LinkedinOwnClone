'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  BuildingOfficeIcon,
  GlobeAltIcon,
  MapPinIcon,
  UserGroupIcon,
  BriefcaseIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function CompanyPage({ params }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const company = {
    id: params.id,
    name: 'TechCorp',
    logo: '/images/companies/techcorp.jpg',
    coverPhoto: '/images/companies/techcorp-cover.jpg',
    description: 'Leading technology company specializing in software development and AI solutions.',
    industry: 'Technology',
    companySize: '1001-5000',
    headquarters: 'San Francisco, CA',
    founded: 2010,
    website: 'www.techcorp.com',
    specialties: ['Software Development', 'Artificial Intelligence', 'Cloud Computing', 'Data Analytics'],
    followers: 250000,
    employees: 3500,
    reviews: 1250,
    rating: 4.2
  }

  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      posted: '2 days ago',
      applicants: 45,
      description: 'Join our engineering team to build scalable software solutions.',
      requirements: ['5+ years experience', 'React', 'Node.js', 'AWS'],
      salary: '$120,000 - $180,000'
    },
    {
      id: 2,
      title: 'Data Scientist',
      location: 'Remote',
      type: 'Full-time',
      posted: '1 week ago',
      applicants: 30,
      description: 'Work on cutting-edge AI and machine learning projects.',
      requirements: ['3+ years experience', 'Python', 'TensorFlow', 'Data Analysis'],
      salary: '$130,000 - $190,000'
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'people', label: 'People' },
    { id: 'posts', label: 'Posts' },
    { id: 'reviews', label: 'Reviews' }
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef]">
        {/* Cover Photo */}
        <div className="h-48 bg-gray-200">
          <img
            src={company.coverPhoto}
            alt={company.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
          {/* Company Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start space-x-6">
              <img
                src={company.logo}
                alt={company.name}
                className="h-24 w-24 rounded-lg border-4 border-white"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {company.name}
                    </h1>
                    <p className="text-gray-600 mt-1">{company.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0a66c2] hover:bg-[#004182]">
                      <PlusIcon className="h-5 w-5 mr-2" />
                      Follow
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <BookmarkIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <ShareIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <EllipsisHorizontalIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {company.industry}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserGroupIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {company.companySize} employees
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {company.headquarters}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                    <a
                      href={`https://${company.website}`}
                      className="text-sm text-[#0a66c2] hover:underline"
                    >
                      {company.website}
                    </a>
                  </div>
                </div>

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
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="text-2xl font-bold text-gray-900">
                {company.followers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="text-2xl font-bold text-gray-900">
                {company.employees.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Employees</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="text-2xl font-bold text-gray-900">
                {company.reviews.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="text-2xl font-bold text-gray-900">
                  {company.rating}
                </span>
              </div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-4">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-[#0a66c2] text-[#0a66c2]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'jobs' && (
                <div>
                  {/* Search and Filters */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                        placeholder="Search jobs"
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

                  {/* Jobs List */}
                  <div className="space-y-6">
                    {jobs.map(job => (
                      <div
                        key={job.id}
                        className="bg-white rounded-lg border border-gray-200 p-6"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {job.title}
                            </h3>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                {job.location}
                              </span>
                              <span className="flex items-center">
                                <BriefcaseIcon className="h-4 w-4 mr-1" />
                                {job.type}
                              </span>
                              <span>{job.posted}</span>
                              <span>{job.applicants} applicants</span>
                            </div>
                          </div>
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0a66c2] hover:bg-[#004182]">
                            Apply
                          </button>
                        </div>

                        <p className="mt-4 text-gray-600">{job.description}</p>

                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900">
                            Requirements:
                          </h4>
                          <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 text-sm text-gray-600">
                          Salary: {job.salary}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'overview' && (
                <div className="text-center text-gray-500 py-8">
                  Company overview content
                </div>
              )}

              {activeTab === 'people' && (
                <div className="text-center text-gray-500 py-8">
                  People content
                </div>
              )}

              {activeTab === 'posts' && (
                <div className="text-center text-gray-500 py-8">
                  Posts content
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center text-gray-500 py-8">
                  Reviews content
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 