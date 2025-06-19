'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BookmarkIcon,
  StarIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

export default function LearningPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    level: '',
    duration: ''
  })
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Mastering React',
      instructor: 'Jane Doe',
      image: '/images/courses/react.jpg',
      category: 'Development',
      level: 'Intermediate',
      duration: '4h',
      enrolled: false,
      bookmarked: false,
      liked: false,
      likes: 120
    },
    {
      id: 2,
      title: 'Introduction to Data Science',
      instructor: 'John Smith',
      image: '/images/courses/data-science.jpg',
      category: 'Data Science',
      level: 'Beginner',
      duration: '6h',
      enrolled: false,
      bookmarked: false,
      liked: false,
      likes: 98
    },
    {
      id: 3,
      title: 'Advanced CSS Techniques',
      instructor: 'Emily Johnson',
      image: '/images/courses/css.jpg',
      category: 'Design',
      level: 'Advanced',
      duration: '3h',
      enrolled: false,
      bookmarked: false,
      liked: false,
      likes: 75
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
      category: '',
      level: '',
      duration: ''
    })
  }

  const handleBookmark = (courseId) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === courseId ? { ...course, bookmarked: !course.bookmarked } : course
      )
    )
  }

  const handleLike = (courseId) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === courseId
          ? {
              ...course,
              liked: !course.liked,
              likes: course.liked ? course.likes - 1 : course.likes + 1
            }
          : course
      )
    )
  }

  const handleEnroll = (courseId) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === courseId ? { ...course, enrolled: !course.enrolled } : course
      )
    )
  }

  const filteredCourses = courses.filter(course => {
    return (
      (!searchQuery || course.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedFilters.category || course.category === selectedFilters.category) &&
      (!selectedFilters.level || course.level === selectedFilters.level) &&
      (!selectedFilters.duration || course.duration === selectedFilters.duration)
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
                  placeholder="Search for courses"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
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
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                      value={selectedFilters.category}
                      onChange={e => handleFilterChange('category', e.target.value)}
                    >
                      <option value="">All categories</option>
                      <option value="Development">Development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Level</label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                      value={selectedFilters.level}
                      onChange={e => handleFilterChange('level', e.target.value)}
                    >
                      <option value="">All levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                      value={selectedFilters.duration}
                      onChange={e => handleFilterChange('duration', e.target.value)}
                    >
                      <option value="">All durations</option>
                      <option value="3h">Up to 3 hours</option>
                      <option value="4h">Up to 4 hours</option>
                      <option value="6h">Up to 6 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <AcademicCapIcon className="h-5 w-5 mr-2 text-[#0a66c2]" />
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mt-1">By {course.instructor}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                      <span>{course.category}</span>
                      <span>•</span>
                      <span>{course.level}</span>
                      <span>•</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <button
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                        course.enrolled
                          ? 'text-white bg-[#0a66c2] hover:bg-[#004182]'
                          : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300'
                      }`}
                      onClick={() => handleEnroll(course.id)}
                    >
                      {course.enrolled ? 'Enrolled' : 'Enroll'}
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => handleBookmark(course.id)}
                    >
                      {course.bookmarked ? (
                        <BookmarkIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <BookmarkIcon className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => handleLike(course.id)}
                    >
                      {course.liked ? (
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <StarIcon className="h-5 w-5" />
                      )}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <ShareIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <EllipsisHorizontalIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <StarIcon className="h-4 w-4 mr-1 text-yellow-400" />
                    {course.likes} likes
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