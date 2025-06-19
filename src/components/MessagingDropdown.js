'use client'
import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, StarIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

const mockConversations = [
  {
    id: 1,
    name: 'Jeevanth R',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    lastMessage: 'You: Ok sir',
    lastDate: 'Jun 3',
    starred: true
  },
  {
    id: 2,
    name: 'Veekshet B',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    lastMessage: 'You: Sir, may i know the further details of the...',
    lastDate: 'Jun 3',
    starred: true
  },
  {
    id: 3,
    name: 'P MANASA',
    avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
    lastMessage: 'Immediate Opening - Full Stack Developer (Mern Stack + Python)',
    lastDate: 'Jun 3',
    starred: false
  },
  {
    id: 4,
    name: 'P MANASA',
    avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
    lastMessage: 'Immediate Opening - Full Stack Developer (Mern...',
    lastDate: 'Jun 2',
    starred: true
  },
  {
    id: 5,
    name: 'TN Sreenivas',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    lastMessage: 'Sponsored SV University Launches New Part-time Course...',
    lastDate: 'Jun 2',
    starred: false
  },
  {
    id: 6,
    name: 'Win Information Technolo...',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    lastMessage: 'You: Dear hiring manager, I\'m...',
    lastDate: '1',
    starred: false
  }
]

export default function MessagingDropdown() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {expanded ? (
        <div className="w-[360px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">Messaging</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"><EllipsisHorizontalIcon className="h-5 w-5" /></button>
              <button className="p-1 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"><ChevronDownIcon className="h-5 w-5" onClick={()=>setExpanded(false)} /></button>
            </div>
          </div>
          {/* Search */}
          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
            <input className="flex-1 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 text-sm bg-[#f3f2ef] dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" placeholder="Search messages" />
            <button className="p-1 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"><EllipsisHorizontalIcon className="h-5 w-5" /></button>
          </div>
          {/* Tabs */}
          <div className="flex gap-4 px-4 pt-2 text-sm font-semibold">
            <button className="text-[#238636] border-b-2 border-[#238636] pb-1">Focused</button>
            <button className="text-gray-500 dark:text-gray-300 pb-1">Other</button>
          </div>
          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map(conv => (
              <div key={conv.id} className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">{conv.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300 truncate">{conv.lastMessage}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-gray-400 dark:text-gray-300">{conv.lastDate}</span>
                  {conv.starred && <StarIcon className="h-5 w-5 text-[#f9c846]" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-60 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 cursor-pointer" onClick={()=>setExpanded(true)}>
          <div className="flex items-center gap-2">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-semibold text-base text-gray-900 dark:text-gray-100">Messaging</span>
          </div>
          <ChevronUpIcon className="h-6 w-6 text-gray-500 dark:text-gray-300" />
        </div>
      )}
    </div>
  )
} 