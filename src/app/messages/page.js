'use client'

import { useState, useEffect } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  FaceSmileIcon,
  EllipsisHorizontalIcon,
  CheckCircleIcon,
  ClockIcon,
  PhoneIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline'
import useStore from '@/store'

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChat, setSelectedChat] = useState(null)
  const [newMessage, setNewMessage] = useState('')

  const {
    conversations,
    setConversations,
    sendMessage
  } = useStore()

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchConversations = async () => {
      // Simulate API call
      const mockConversations = [
        {
          id: 1,
          user: {
            id: 1,
            name: 'Sarah Johnson',
            avatar: 'https://via.placeholder.com/48',
            status: 'online'
          },
          lastMessage: {
            text: 'Thanks for the opportunity!',
            timestamp: '10:30 AM',
            isRead: true
          },
          unreadCount: 0
        },
        {
          id: 2,
          user: {
            id: 2,
            name: 'Michael Chen',
            avatar: 'https://via.placeholder.com/48',
            status: 'offline'
          },
          lastMessage: {
            text: 'When can you start?',
            timestamp: 'Yesterday',
            isRead: false
          },
          unreadCount: 2
        },
        {
          id: 3,
          user: {
            id: 3,
            name: 'Emily Rodriguez',
            avatar: 'https://via.placeholder.com/48',
            status: 'online'
          },
          lastMessage: {
            text: 'Looking forward to working with you!',
            timestamp: '2 days ago',
            isRead: true
          },
          unreadCount: 0
        }
      ]

      setConversations(mockConversations)
    }

    fetchConversations()
  }, [setConversations])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedChat) return

    sendMessage(selectedChat.id, newMessage)
    setNewMessage('')
  }

  const formatTimestamp = (timestamp) => {
    if (timestamp.includes('ago')) return timestamp
    return timestamp
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef]">
        <div className="max-w-[1128px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-12 h-[calc(100vh-12rem)]">
              {/* Conversations List */}
              <div className="col-span-4 border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search messages"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-[#eef3f8] border-none rounded-md focus:ring-0 focus:outline-none"
                    />
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="overflow-y-auto h-[calc(100%-4rem)]">
                  {conversations.map(conversation => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedChat(conversation)}
                      className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                        selectedChat?.id === conversation.id ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={conversation.user.avatar}
                            alt={conversation.user.name}
                            className="h-12 w-12 rounded-full"
                          />
                          <span
                            className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${
                              conversation.user.status === 'online'
                                ? 'bg-green-400'
                                : 'bg-gray-400'
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {conversation.user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatTimestamp(conversation.lastMessage.timestamp)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p
                              className={`text-sm truncate ${
                                conversation.unreadCount > 0
                                  ? 'text-gray-900 font-medium'
                                  : 'text-gray-500'
                              }`}
                            >
                              {conversation.lastMessage.text}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#0a66c2] text-white">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="col-span-8 flex flex-col">
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={selectedChat.user.avatar}
                              alt={selectedChat.user.name}
                              className="h-10 w-10 rounded-full"
                            />
                            <span
                              className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${
                                selectedChat.user.status === 'online'
                                  ? 'bg-green-400'
                                  : 'bg-gray-400'
                              }`}
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {selectedChat.user.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {selectedChat.user.status === 'online'
                                ? 'Active now'
                                : 'Offline'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-500">
                            <PhoneIcon className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-500">
                            <VideoCameraIcon className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-500">
                            <EllipsisHorizontalIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {selectedChat.messages?.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.isSent ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              message.isSent
                                ? 'bg-[#0a66c2] text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <div
                              className={`text-xs mt-1 flex items-center ${
                                message.isSent ? 'text-blue-100' : 'text-gray-500'
                              }`}
                            >
                              {message.timestamp}
                              {message.isSent && (
                                <span className="ml-1">
                                  {message.isRead ? (
                                    <CheckCircleIcon className="h-4 w-4" />
                                  ) : (
                                    <ClockIcon className="h-4 w-4" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200">
                      <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <button
                          type="button"
                          className="p-2 text-gray-400 hover:text-gray-500"
                        >
                          <PaperClipIcon className="h-5 w-5" />
                        </button>
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Write a message..."
                          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-[#0a66c2] focus:border-[#0a66c2]"
                        />
                        <button
                          type="button"
                          className="p-2 text-gray-400 hover:text-gray-500"
                        >
                          <FaceSmileIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="submit"
                          className="p-2 text-[#0a66c2] hover:text-[#004182]"
                        >
                          <PaperAirplaneIcon className="h-5 w-5" />
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">
                      Select a conversation to start messaging
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 