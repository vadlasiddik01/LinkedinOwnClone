'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon,
  BookmarkIcon,
  ShareIcon,
  ChartBarIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'

export default function AssessmentDetailPage({ params }) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [started, setStarted] = useState(false)
  const [saved, setSaved] = useState(false)
  const [shared, setShared] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showFeedback, setShowFeedback] = useState({})

  const assessment = {
    id: params.id,
    title: 'JavaScript Programming Skills Assessment',
    description: `Test your JavaScript programming skills with this comprehensive assessment. This assessment covers fundamental concepts, advanced topics, and real-world problem-solving scenarios in JavaScript.

The assessment includes questions on:
- JavaScript fundamentals and syntax
- Object-oriented programming
- Asynchronous programming
- DOM manipulation
- Error handling
- Testing and debugging
- Best practices and design patterns

You'll have 60 minutes to complete the assessment, which consists of 40 multiple-choice questions and 2 coding challenges. Your results will be evaluated based on accuracy, code quality, and problem-solving approach.

Upon completion, you'll receive:
- A detailed score report
- Skill-level certification
- Personalized learning recommendations
- Option to share results on your profile`,
    duration: '60 minutes',
    questions: 42,
    difficulty: 'Intermediate',
    completionRate: 78,
    averageScore: 72,
    attempts: 15000,
    skills: [
      'JavaScript',
      'ES6+',
      'DOM Manipulation',
      'Async Programming',
      'Error Handling',
      'Testing',
      'Debugging'
    ],
    prerequisites: [
      'Basic understanding of JavaScript',
      'Familiarity with web development concepts',
      'Experience with modern JavaScript features',
      'Knowledge of browser APIs'
    ],
    benefits: [
      'Validate your JavaScript skills',
      'Earn a skill badge for your profile',
      'Get personalized learning recommendations',
      'Stand out to employers',
      'Track your progress over time'
    ],
    sampleQuestions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the output of the following code?\n\n```javascript\nconsole.log(typeof typeof 1);```',
        options: ['number', 'string', 'undefined', 'object'],
        correctAnswer: 'string'
      },
      {
        id: 2,
        type: 'coding',
        question: 'Implement a function that finds the longest common prefix among an array of strings.',
        template: 'function longestCommonPrefix(strs) {\n  // Your code here\n}'
      }
    ]
  }

  // Handle answer selection for sample questions
  const handleSelectAnswer = (questionId, option) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }))
    setShowFeedback(prev => ({ ...prev, [questionId]: true }))
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Assessment Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                  {assessment.title}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-5 w-5 mr-1" />
                    {assessment.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircleIcon className="h-5 w-5 mr-1" />
                    {assessment.questions} questions
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UserGroupIcon className="h-5 w-5 mr-1" />
                    {assessment.attempts.toLocaleString()} attempts
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-6">
                  <span className="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded">
                    {assessment.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded">
                    {assessment.completionRate}% completion rate
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded">
                    {assessment.averageScore}% average score
                  </span>
                </div>
                {started && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-700 font-medium">
                    Assessment started! (Demo state)
                  </div>
                )}
              </div>

              {/* Assessment Description */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About This Assessment
                </h2>
                <div className="prose prose-sm max-w-none">
                  <p className={`text-gray-600 ${!showFullDescription && 'line-clamp-3'}`}>
                    {assessment.description}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-[#0a66c2] hover:text-[#004182] font-medium"
                  >
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </button>
                </div>
              </div>

              {/* Skills Tested */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Skills Tested
                </h2>
                <div className="flex flex-wrap gap-2">
                  {assessment.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#e8f3ff] text-[#0a66c2] rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Prerequisites
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {assessment.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Benefits
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {assessment.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              {/* Sample Questions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Sample Questions
                </h2>
                <div className="space-y-6">
                  {assessment.sampleQuestions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          Question {index + 1}
                        </span>
                        <span className="text-sm text-gray-500">
                          {question.type === 'multiple-choice' ? 'Multiple Choice' : 'Coding Challenge'}
                        </span>
                      </div>
                      <p className="text-gray-900 mb-4">{question.question}</p>
                      {question.type === 'multiple-choice' ? (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`flex items-center p-2 border rounded cursor-pointer ${selectedAnswers[question.id] === option ? 'border-[#0a66c2] bg-[#e8f3ff]' : 'border-gray-200'}`}
                              onClick={() => handleSelectAnswer(question.id, option)}
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                className="h-4 w-4 text-[#0a66c2] focus:ring-[#0a66c2] border-gray-300"
                                checked={selectedAnswers[question.id] === option}
                                readOnly
                              />
                              <label className="ml-2 text-sm text-gray-900">
                                {option}
                              </label>
                              {showFeedback[question.id] && selectedAnswers[question.id] === option && (
                                <span className={`ml-4 text-xs font-semibold ${option === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                                  {option === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded">
                          <pre className="text-sm text-gray-600 font-mono">
                            {question.template}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Start Assessment Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <button
                  className={`w-full py-2 rounded-full font-medium flex items-center justify-center mb-4 ${started ? 'bg-green-100 text-green-700 cursor-default' : 'bg-[#0a66c2] text-white hover:bg-[#004182]'}`}
                  onClick={() => !started && setStarted(true)}
                  disabled={started}
                >
                  <span>{started ? 'Assessment Started' : 'Start Assessment'}</span>
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Assessment details:</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      {assessment.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      {assessment.questions} questions
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ChartBarIcon className="h-5 w-5 mr-2" />
                      {assessment.difficulty} difficulty
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <UserGroupIcon className="h-5 w-5 mr-2" />
                      {assessment.attempts.toLocaleString()} attempts
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <button
                    className={`w-full flex items-center justify-center space-x-2 ${saved ? 'text-[#0a66c2] font-semibold' : 'text-gray-700'} hover:text-[#004182]`}
                    onClick={() => setSaved(s => !s)}
                  >
                    <BookmarkIcon className="h-5 w-5" />
                    <span>{saved ? 'Saved' : 'Save for later'}</span>
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

              {/* Related Skills */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Related Skills
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">Web Development</span>
                    </div>
                    <button className="text-sm text-[#0a66c2] hover:text-[#004182]">
                      Take Assessment
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">Frontend Development</span>
                    </div>
                    <button className="text-sm text-[#0a66c2] hover:text-[#004182]">
                      Take Assessment
                    </button>
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