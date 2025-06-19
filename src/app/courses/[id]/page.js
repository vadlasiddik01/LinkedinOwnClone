'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  PlayCircleIcon,
  BookmarkIcon,
  ShareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function CourseDetailPage({ params }) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)
  const [enrolled, setEnrolled] = useState(false)
  const [saved, setSaved] = useState(false)
  const [shared, setShared] = useState(false)
  const [completedLessons, setCompletedLessons] = useState({})

  const course = {
    id: params.id,
    title: 'Complete Web Development Bootcamp',
    instructor: {
      name: 'Sarah Johnson',
      title: 'Senior Web Developer',
      company: 'Tech Solutions Inc.',
      avatar: 'https://via.placeholder.com/64',
      rating: 4.8,
      reviews: 1245,
      students: 15000
    },
    rating: 4.7,
    reviews: 2890,
    enrolled: 25000,
    lastUpdated: '2024-02-15',
    level: 'Beginner to Advanced',
    duration: '42 hours',
    lectures: 186,
    exercises: 24,
    projects: 12,
    description: `Learn web development from scratch with this comprehensive bootcamp. This course covers everything you need to know to become a full-stack web developer, including HTML, CSS, JavaScript, React, Node.js, and more.

You'll start with the fundamentals of web development and gradually progress to more advanced topics. By the end of the course, you'll have built several real-world projects and have a strong portfolio to showcase your skills.

The course includes:
- 186 video lectures
- 24 hands-on exercises
- 12 real-world projects
- Lifetime access to course materials
- Certificate of completion
- 1-on-1 mentoring sessions

Whether you're a complete beginner or looking to enhance your existing skills, this course will help you achieve your goals in web development.`,
    price: 89.99,
    originalPrice: 199.99,
    thumbnail: 'https://via.placeholder.com/800x450',
    curriculum: [
      {
        id: 1,
        title: 'Getting Started',
        lectures: 12,
        duration: '2.5 hours',
        expanded: true,
        lessons: [
          {
            id: 1,
            title: 'Course Overview',
            duration: '15:00',
            preview: true
          },
          {
            id: 2,
            title: 'Setting Up Your Development Environment',
            duration: '20:00',
            preview: true
          },
          {
            id: 3,
            title: 'Introduction to HTML',
            duration: '25:00',
            preview: false
          }
        ]
      },
      {
        id: 2,
        title: 'HTML Fundamentals',
        lectures: 24,
        duration: '5 hours',
        expanded: false,
        lessons: [
          {
            id: 4,
            title: 'HTML Document Structure',
            duration: '20:00',
            preview: false
          },
          {
            id: 5,
            title: 'Working with Text and Links',
            duration: '25:00',
            preview: false
          },
          {
            id: 6,
            title: 'Images and Media',
            duration: '30:00',
            preview: false
          }
        ]
      },
      {
        id: 3,
        title: 'CSS Styling',
        lectures: 32,
        duration: '8 hours',
        expanded: false,
        lessons: [
          {
            id: 7,
            title: 'Introduction to CSS',
            duration: '20:00',
            preview: false
          },
          {
            id: 8,
            title: 'Selectors and Properties',
            duration: '25:00',
            preview: false
          },
          {
            id: 9,
            title: 'Box Model and Layout',
            duration: '30:00',
            preview: false
          }
        ]
      }
    ],
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'React',
      'Node.js',
      'MongoDB',
      'Git',
      'Responsive Design'
    ],
    requirements: [
      'No prior programming experience required',
      'A computer with internet connection',
      'Basic computer skills',
      'Dedication to learn and practice'
    ],
    targetAudience: [
      'Beginners who want to learn web development',
      'Students looking to start a career in tech',
      'Professionals wanting to switch careers',
      'Developers looking to enhance their skills'
    ]
  }

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  // Mark lesson as completed
  const handleCompleteLesson = (lessonId) => {
    setCompletedLessons(prev => ({ ...prev, [lessonId]: !prev[lessonId] }))
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                  {course.title}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {course.rating}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">
                      ({course.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UserGroupIcon className="h-5 w-5 mr-1" />
                    {course.enrolled.toLocaleString()} students
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-5 w-5 mr-1" />
                    Last updated {course.lastUpdated}
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-6">
                  <span className="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded">
                    {course.level}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded">
                    {course.duration}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded">
                    {course.lectures} lectures
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-[450px] object-cover rounded-lg"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                    <PlayCircleIcon className="h-16 w-16 text-white" />
                  </button>
                </div>
              </div>

              {/* Course Description */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About This Course
                </h2>
                <div className="prose prose-sm max-w-none">
                  <p className={`text-gray-600 ${!showFullDescription && 'line-clamp-3'}`}>
                    {course.description}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-[#0a66c2] hover:text-[#004182] font-medium"
                  >
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </button>
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Course Content
                </h2>
                <div className="space-y-4">
                  {course.curriculum.map(section => (
                    <div key={section.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                      >
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {section.lectures} lectures • {section.duration}
                          </p>
                        </div>
                        {expandedSection === section.id ? (
                          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedSection === section.id && (
                        <div className="border-t border-gray-200">
                          {section.lessons.map(lesson => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-4 hover:bg-gray-50"
                            >
                              <div className="flex items-center">
                                <PlayCircleIcon className="h-5 w-5 text-gray-400 mr-3" />
                                <span className="text-sm text-gray-900">
                                  {lesson.title}
                                </span>
                                {lesson.preview && (
                                  <span className="ml-2 px-2 py-0.5 text-xs font-medium text-[#0a66c2] bg-[#e8f3ff] rounded">
                                    Preview
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">
                                  {lesson.duration}
                                </span>
                                <button
                                  className={`ml-2 px-2 py-0.5 rounded text-xs font-medium border ${completedLessons[lesson.id] ? 'bg-green-100 text-green-700 border-green-300' : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'}`}
                                  onClick={() => handleCompleteLesson(lesson.id)}
                                >
                                  {completedLessons[lesson.id] ? 'Completed' : 'Mark as done'}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Requirements
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {course.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>

              {/* Target Audience */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Who This Course is For
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {course.targetAudience.map((audience, index) => (
                    <li key={index}>{audience}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Course Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    ${course.price}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    ${course.originalPrice}
                  </div>
                </div>
                <button
                  className={`w-full py-2 rounded-full font-medium mb-4 ${enrolled ? 'bg-green-100 text-green-700 cursor-default' : 'bg-[#0a66c2] text-white hover:bg-[#004182]'}`}
                  onClick={() => !enrolled && setEnrolled(true)}
                  disabled={enrolled}
                >
                  {enrolled ? 'Enrolled' : 'Enroll Now'}
                </button>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">This course includes:</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      {course.duration} of content
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <PlayCircleIcon className="h-5 w-5 mr-2" />
                      {course.lectures} lectures
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      {course.exercises} exercises
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      {course.projects} projects
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <button
                    className={`w-full flex items-center justify-center space-x-2 ${saved ? 'text-[#0a66c2] font-semibold' : 'text-gray-700'} hover:text-[#004182]`}
                    onClick={() => setSaved(s => !s)}
                  >
                    <BookmarkIcon className="h-5 w-5" />
                    <span>{saved ? 'Saved to wishlist' : 'Save to wishlist'}</span>
                  </button>
                  <button
                    className={`w-full flex items-center justify-center space-x-2 ${shared ? 'text-[#0a66c2] font-semibold' : 'text-gray-700'} hover:text-[#004182]`}
                    onClick={() => setShared(s => !s)}
                  >
                    <ShareIcon className="h-5 w-5" />
                    <span>{shared ? 'Shared!' : 'Share'}</span>
                  </button>
                </div>
              </div>

              {/* Instructor */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Instructor
                </h2>
                <div className="flex items-start space-x-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {course.instructor.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {course.instructor.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {course.instructor.company}
                    </p>
                    <div className="flex items-center mt-2">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {course.instructor.rating} Instructor Rating
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <UserGroupIcon className="h-4 w-4 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {course.instructor.students.toLocaleString()} Students
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 