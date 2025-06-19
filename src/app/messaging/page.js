'use client'

import { useState, useEffect, useContext } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  PhotoIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  StarIcon,
  PencilSquareIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import useStore from '@/store'
import { ThemeContext } from '@/components/layout/MainLayout'

const mockConversations = [
  {
    id: 1,
    name: 'Jeevanth R',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    lastMessage: 'Ok sir',
    lastDate: 'Jun 3',
    starred: true,
    messages: [
      { id: 1, sender: 'Siddik Vadla', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', time: '11:47 AM', text: 'Joining sir', isMe: true },
      { id: 2, sender: 'Siddik Vadla', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', time: '11:57 AM', text: 'Sir may I know the next steps and further details...will balaji join the meet?', isMe: true },
      { id: 3, sender: 'Jeevanth R', avatar: 'https://randomuser.me/api/portraits/men/31.jpg', time: '12:04 PM', text: 'Hey Siddik, let me discuss with Balaji about your experience and let you know.', isMe: false },
      { id: 4, sender: 'Siddik Vadla', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', time: '1:27 PM', text: 'Ok sir', isMe: true }
    ]
  },
  {
    id: 2,
    name: 'Veekshet B',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    lastMessage: 'Sir, may i know the further details of the...',
    lastDate: 'Jun 3',
    starred: true,
    messages: []
  },
  {
    id: 3,
    name: 'P MANASA',
    avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
    lastMessage: 'Immediate Opening - Full Stack Developer (Mern Stack...',
    lastDate: 'Jun 3',
    starred: false,
    messages: []
  },
  {
    id: 4,
    name: 'P MANASA',
    avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
    lastMessage: 'Immediate Opening - Full Stack Developer...',
    lastDate: 'Jun 2',
    starred: false,
    messages: []
  },
  {
    id: 5,
    name: 'TN Sreenivas',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    lastMessage: 'Sponsored SV University Launches New Part-time...',
    lastDate: 'Jun 2',
    starred: false,
    messages: []
  }
]

const promoUser = {
  name: 'Siddik Vadla',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
}

export default function MessagingPage() {
  const { theme } = useContext(ThemeContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [conversations, setConversations] = useState(mockConversations)
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageContent, setMessageContent] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false)
  const [showChatOptions, setShowChatOptions] = useState(false)
  const [showNewMessageModal, setShowNewMessageModal] = useState(false)
  const [newMessageRecipient, setNewMessageRecipient] = useState('')
  const [showRecipientSearch, setShowRecipientSearch] = useState(false)
  const [selectedId, setSelectedId] = useState(1)
  const [messageInput, setMessageInput] = useState('')

  const {
    sendMessage,
    markAsRead,
    deleteConversation,
    archiveConversation,
    muteConversation,
    blockUser,
    reportUser,
    searchUsers
  } = useStore()

  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = await searchUsers(query)
      // Update conversations with search results
      setConversations(results)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!messageInput.trim() || !selectedChat) return

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: messageInput,
      isMe: true
    }

    setConversations(conversations.map(conv => {
      if (conv.id === selectedChat.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageInput,
          lastDate: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })
        }
      }
      return conv
    }))

    setMessageInput('')
  }

  const handleStarConversation = (conversationId) => {
    setConversations(conversations.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, starred: !conv.starred }
      }
      return conv
    }))
  }

  const handleChatAction = async (action, conversationId) => {
    switch (action) {
      case 'archive':
        setConversations(conversations.map(conv => {
          if (conv.id === conversationId) {
            return { ...conv, isArchived: true }
          }
          return conv
        }))
        break
      case 'mute':
        setConversations(conversations.map(conv => {
          if (conv.id === conversationId) {
            return { ...conv, isMuted: true }
          }
          return conv
        }))
        break
      case 'block':
        setConversations(conversations.map(conv => {
          if (conv.id === conversationId) {
            return { ...conv, isBlocked: true }
          }
          return conv
        }))
        break
      case 'report':
        // Handle report action
        break
      case 'delete':
        setConversations(conversations.filter(conv => conv.id !== conversationId))
        break
      default:
        break
    }
    setShowChatOptions(false)
  }

  const handleAttachment = (type) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = type === 'image' ? 'image/*' : type === 'video' ? 'video/*' : '*/*'
    
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        // Handle file upload
      }
    }
    
    input.click()
    setShowAttachmentOptions(false)
  }

  const selectedConv = conversations.find(c => c.id === selectedId)

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef] dark:bg-gray-900 flex justify-center pt-6 pb-16">
        <div className="w-full max-w-7xl flex gap-6 px-2 md:px-4 lg:px-8">
          {/* Left Sidebar: Conversation List */}
          <aside className="w-[340px] hidden lg:flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">Messaging</span>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-100"><EllipsisHorizontalIcon className="h-5 w-5" /></button>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-100" onClick={() => setShowNewMessageModal(true)}><PencilSquareIcon className="h-5 w-5" /></button>
              </div>
            </div>
            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-[#f3f2ef] dark:bg-gray-800 text-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] dark:text-gray-100" placeholder="Search messages" onChange={(e) => handleSearch(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-2 px-4 py-2 border-b border-gray-100 dark:border-gray-700 text-sm">
              <button className="px-3 py-1 rounded-full bg-[#e9f5ee] dark:bg-gray-700 text-[#00664f] font-semibold">Focused</button>
              <button className="px-3 py-1 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Jobs</button>
              <button className="px-3 py-1 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Unread</button>
              <button className="px-3 py-1 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">My Connections</button>
              <button className="px-3 py-1 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">InMail</button>
              <button className="px-3 py-1 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Starred</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map(conv => (
                <div key={conv.id} onClick={() => setSelectedId(conv.id)} className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-l-4 ${selectedId === conv.id ? 'border-[#238636] bg-[#f3f7f5] dark:bg-gray-900' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                  <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">{conv.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300 truncate">You: {conv.lastMessage}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-400 dark:text-gray-300">{conv.lastDate}</span>
                    {conv.starred && <StarIcon className="h-5 w-5 text-[#f9c846]" />}
                  </div>
                </div>
              ))}
            </div>
          </aside>
          {/* Main Chat Area */}
          <main className="flex-1 max-w-2xl mx-auto flex flex-col min-h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <div>
                <div className="flex items-center gap-2">
                  <img src={selectedConv.avatar} alt={selectedConv.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{selectedConv.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-300 ml-2">Leading Product Design for AI Startups 🚀 | Scaled 6+ Succ</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-100" onClick={() => setShowChatOptions(!showChatOptions)}><EllipsisHorizontalIcon className="h-5 w-5" /></button>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-100" onClick={() => handleStarConversation(selectedConv.id)}><StarIcon className={`h-5 w-5 ${selectedConv.starred ? 'text-[#f9c846]' : ''}`} /></button>
              </div>
            </div>
            {/* Chat Thread */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {selectedConv.messages.length === 0 && <div className="text-gray-400 dark:text-gray-300 text-center mt-10">No messages yet.</div>}
              {selectedConv.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}> 
                  {!msg.isMe && <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full mr-2" />}
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{msg.sender}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-300">{msg.time}</span>
                      {msg.isMe && <CheckCircleIcon className="h-4 w-4 text-[#0a66c2]" />}
                    </div>
                    <div className="bg-[#f3f2ef] dark:bg-gray-900 rounded-lg px-4 py-2 mt-1 text-gray-900 dark:text-gray-100 max-w-lg whitespace-pre-line">{msg.text}</div>
                  </div>
                  {msg.isMe && <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full ml-2" />}
                </div>
              ))}
            </div>
            {/* Message Input */}
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2">
              <input value={messageInput} onChange={e => setMessageInput(e.target.value)} placeholder="Write a message..." className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] dark:bg-gray-800 dark:text-gray-100" />
              <button className="bg-[#0a66c2] text-white rounded-full px-4 py-2 font-semibold hover:bg-[#004182]" onClick={handleSendMessage}>Send</button>
            </div>
          </main>
          {/* Right Sidebar */}
          <aside className="w-[320px] hidden xl:flex flex-col gap-4">
            {/* Premium Promo, network benefits, etc. */}
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center mb-4">
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-2 text-right w-full">Ad</div>
              <img src={promoUser.avatar} alt={promoUser.name} className="w-16 h-16 rounded-full object-cover mb-2" />
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Stand out and get ahead in your job search</div>
              <button className="mt-2 px-4 py-1 bg-[#0a66c2] text-white rounded-full text-sm font-semibold hover:bg-[#004182]">Redeem offer</button>
            </div>
            {/* Additional widgets */}
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 text-center dark:text-gray-100">
              {/* ...additional right sidebar content... */}
            </div>
          </aside>
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium">New message</h2>
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email"
                value={newMessageRecipient}
                onChange={(e) => {
                  setNewMessageRecipient(e.target.value)
                  setShowRecipientSearch(true)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0a66c2] focus:border-[#0a66c2] text-sm"
              />
              {showRecipientSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                  {/* Search results will be rendered here */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chat Options Menu */}
      {showChatOptions && (
        <div className="absolute right-4 top-16 bg-white rounded-lg shadow-lg border border-gray-200 w-48">
          <div className="py-1">
            <button
              onClick={() => handleChatAction('archive', selectedChat.id)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Archive
            </button>
            <button
              onClick={() => handleChatAction('mute', selectedChat.id)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Mute
            </button>
            <button
              onClick={() => handleChatAction('block', selectedChat.id)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Block
            </button>
            <button
              onClick={() => handleChatAction('report', selectedChat.id)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Report
            </button>
            <button
              onClick={() => handleChatAction('delete', selectedChat.id)}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
            >
              Delete conversation
            </button>
          </div>
        </div>
      )}

      {/* Attachment Options Menu */}
      {showAttachmentOptions && (
        <div className="absolute left-4 bottom-20 bg-white rounded-lg shadow-lg border border-gray-200 w-48">
          <div className="py-1">
            <button
              onClick={() => handleAttachment('image')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <PhotoIcon className="h-5 w-5" />
              <span>Photo</span>
            </button>
            <button
              onClick={() => handleAttachment('video')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <VideoCameraIcon className="h-5 w-5" />
              <span>Video</span>
            </button>
            <button
              onClick={() => handleAttachment('document')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <DocumentTextIcon className="h-5 w-5" />
              <span>Document</span>
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  )
} 