'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  PhotoIcon,
  VideoCameraIcon,
  DocumentIcon,
  CalendarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function CreatePostPage() {
  const [content, setContent] = useState('')
  const [showAudiencePicker, setShowAudiencePicker] = useState(false)
  const [selectedAudience, setSelectedAudience] = useState('public')
  const [attachments, setAttachments] = useState([])

  const audienceOptions = [
    {
      id: 'public',
      label: 'Anyone',
      description: 'Anyone on or off LinkedIn',
      icon: GlobeAltIcon
    },
    {
      id: 'connections',
      label: 'Connections only',
      description: 'Your connections on LinkedIn',
      icon: UserGroupIcon
    }
  ]

  const handlePost = () => {
    // Handle post creation
    console.log('Creating post:', {
      content,
      audience: selectedAudience,
      attachments
    })
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setAttachments([...attachments, ...files])
  }

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const SelectedAudienceIcon = audienceOptions.find(opt => opt.id === selectedAudience)?.icon

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-gray-900">
                Create a post
              </h1>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <img
                  src="https://via.placeholder.com/48"
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex-1">
                  {/* Audience Picker */}
                  <div className="mb-4">
                    <button
                      onClick={() => setShowAudiencePicker(!showAudiencePicker)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      {SelectedAudienceIcon && (
                        <SelectedAudienceIcon className="h-4 w-4 mr-1" />
                      )}
                      {audienceOptions.find(opt => opt.id === selectedAudience)?.label}
                    </button>

                    {showAudiencePicker && (
                      <div className="absolute mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <div className="p-4">
                          <h3 className="text-sm font-medium text-gray-900 mb-2">
                            Who can see your post?
                          </h3>
                          <div className="space-y-2">
                            {audienceOptions.map(option => {
                              const Icon = option.icon
                              return (
                                <button
                                  key={option.id}
                                  onClick={() => {
                                    setSelectedAudience(option.id)
                                    setShowAudiencePicker(false)
                                  }}
                                  className="w-full flex items-start p-2 hover:bg-gray-50 rounded-md"
                                >
                                  <Icon className="h-5 w-5 text-gray-500 mt-0.5" />
                                  <div className="ml-3 text-left">
                                    <p className="text-sm font-medium text-gray-900">
                                      {option.label}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {option.description}
                                    </p>
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Post Input */}
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What do you want to talk about?"
                    className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-[#0a66c2] focus:border-[#0a66c2] resize-none"
                  />

                  {/* Attachments Preview */}
                  {attachments.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
                        >
                          {file.type.startsWith('image/') ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Attachment ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <DocumentIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                          <button
                            onClick={() => removeAttachment(index)}
                            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Attachment Options */}
                  <div className="mt-4 flex items-center space-x-4">
                    <label className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <PhotoIcon className="h-6 w-6" />
                      <span className="text-sm">Photo</span>
                    </label>
                    <label className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <VideoCameraIcon className="h-6 w-6" />
                      <span className="text-sm">Video</span>
                    </label>
                    <label className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <DocumentIcon className="h-6 w-6" />
                      <span className="text-sm">Document</span>
                    </label>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                      <CalendarIcon className="h-6 w-6" />
                      <span className="text-sm">Event</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={handlePost}
                disabled={!content.trim() && attachments.length === 0}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  content.trim() || attachments.length > 0
                    ? 'bg-[#0a66c2] text-white hover:bg-[#004182]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 