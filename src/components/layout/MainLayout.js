'use client'

import { useEffect, useRef, useState, createContext, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  Squares2X2Icon,
  AppsIcon,
  CreditCardIcon,
  ChartBarIcon,
  MegaphoneIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline'
import useStore from '@/store'
import MessagingDropdown from '../MessagingDropdown'

export const ThemeContext = createContext({ theme: 'light', setTheme: () => {}, toggleTheme: () => {} })

export default function MainLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const {
    user,
    notifications,
    unreadNotifications,
    isMobile,
    showNotifications,
    showProfileMenu,
    setShowNotifications,
    setShowProfileMenu,
    setIsMobile,
    logout,
    setShowGlobalPostInput
  } = useStore()
  const [showWorkMenu, setShowWorkMenu] = useState(false)
  const workMenuRef = useRef(null)
  const [theme, setTheme] = useState('light')
  const [showMessaging, setShowMessaging] = useState(false)
  const [activeChat, setActiveChat] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [setIsMobile])

  useEffect(() => {
    // On mount, check localStorage for theme
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (storedTheme) {
      setTheme(storedTheme)
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    // Update theme on change
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }
  }, [theme])

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notifications-menu')) {
        setShowNotifications(false)
      }
      if (showProfileMenu && !event.target.closest('.profile-menu')) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showNotifications, showProfileMenu, setShowNotifications, setShowProfileMenu])

  // Close Work menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (showWorkMenu && workMenuRef.current && !workMenuRef.current.contains(event.target)) {
        setShowWorkMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showWorkMenu])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  // Mock conversations for mobile messaging dropdown
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
    }
  ]

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-[#f3f2ef]'}`}>
        {/* Desktop Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 hidden lg:block" role="navigation" aria-label="Main navigation">
          <div className="max-w-[1128px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[52px]">
              {/* Left Section */}
              <div className="flex items-center">
                {/* Logo */}
                <div className="flex-shrink-0 mr-2 sm:mr-4">
                  <a href="/" className="block">
                    <img className="h-[28px] w-[28px] sm:h-[34px] sm:w-[34px]" src="/images/company-logos/image.png" alt="LinkedIn" />
                  </a>
                </div>

                {/* Search */}
                <div className="hidden md:block relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-[180px] sm:w-[220px] md:w-[280px] h-[28px] sm:h-[34px] pl-10 pr-4 bg-[#eef3f8] dark:bg-gray-900 border-none rounded-md focus:ring-0 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      aria-label="Search LinkedIn"
                    />
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-300 absolute left-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="hidden lg:flex items-center space-x-2">
                <a href="/" className="flex flex-col items-center px-2 py-1 text-[#666666] dark:text-gray-300 hover:text-black dark:hover:text-white">
                  <HomeIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="text-xs mt-1">Home</span>
                </a>
                <a href="/network" className="flex flex-col items-center px-2 py-1 text-[#666666] dark:text-gray-300 hover:text-black dark:hover:text-white">
                  <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="text-xs mt-1">My Network</span>
                </a>
                <a href="/jobs" className="flex flex-col items-center px-2 py-1 text-[#666666] dark:text-gray-300 hover:text-black dark:hover:text-white">
                  <BriefcaseIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="text-xs mt-1">Jobs</span>
                </a>
                <a href="/messaging" className="flex flex-col items-center px-2 py-1 text-[#666666] dark:text-gray-300 hover:text-black dark:hover:text-white">
                  <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="text-xs mt-1">Messaging</span>
                </a>
                <div className="relative notifications-menu">
                  <button 
                    className="flex flex-col items-center px-2 py-1 text-[#666666] dark:text-gray-300 hover:text-black dark:hover:text-white"
                    onClick={() => setShowNotifications(!showNotifications)}
                    aria-expanded={showNotifications}
                    aria-label="Notifications"
                  >
                    <div className="relative">
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                          {unreadNotifications}
                        </span>
                      )}
                    </div>
                    <span className="text-xs mt-1">Notifications</span>
                  </button>
                  {showNotifications && (
                    <div className={`absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${isMobile ? 'w-full max-w-[98vw] left-0 right-0 mx-auto py-2 px-2' : 'w-80 py-2'} ${isMobile ? 'max-h-[60vh]' : 'max-h-96'} overflow-y-auto`} role="menu">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                      </div>
                      <div className={isMobile ? 'flex flex-row gap-2 mt-2 overflow-x-auto' : ''}>
                        {notifications.slice(0, 3).map(notification => {
                          if (isMobile) {
                            return (
                              <div key={notification.id} className="min-w-[180px] max-w-[220px] h-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md flex flex-col justify-center px-3 py-2">
                                <p className="text-xs text-gray-900 dark:text-gray-100 truncate">{notification.message}</p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-300 mt-0.5 truncate">{notification.timestamp}</p>
                              </div>
                            )
                          } else {
                            return (
                              <div 
                                key={notification.id}
                                className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? 'bg-[#e8f3ff] dark:bg-gray-900' : ''}`}
                              >
                                <p className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">{notification.timestamp}</p>
                              </div>
                            )
                          }
                        })}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                        <a href="/notifications" className="block w-full text-center text-sm font-semibold text-[#0a66c2] hover:text-[#004182]">
                          View all notifications
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative profile-menu">
                  <button 
                    className="flex items-center space-x-2"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    aria-expanded={showProfileMenu}
                    aria-label="Profile menu"
                  >
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="h-[24px] w-[24px] rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-[24px] w-[24px] rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserCircleIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                      </div>
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-200">Me</span>
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2" role="menu">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          {user?.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <UserCircleIcon className="h-8 w-8 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                            </div>
                          )}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name || 'Guest'}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-300">{user?.title || 'Not signed in'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-1">
                        <a href="/profile" className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                          View Profile
                        </a>
                        <a href="/settings" className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                          Settings
                        </a>
                        <a href="/help" className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                          Help Center
                        </a>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                        <button 
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="border-l border-gray-300 h-6 mx-2"></div>
                <button
                  className="flex flex-col items-center px-2 py-1 text-[#666666] hover:text-black relative"
                  onClick={() => setShowWorkMenu((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={showWorkMenu}
                  aria-label="Work"
                >
                  <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
                  <span className="text-xs mt-1">Work</span>
                </button>
                {/* Work/Business Popup */}
                {showWorkMenu && (
                  <div
                    ref={workMenuRef}
                    className="absolute top-14 right-0 z-50 w-[700px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-gray-200 flex"
                    style={{ minHeight: '480px', maxHeight: '80vh', overflowY: 'auto' }}
                  >
                    {/* Left: My Apps */}
                    <div className="w-1/2 p-6 border-r border-gray-100">
                      <div className="text-lg font-semibold mb-4">My Apps</div>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-base font-medium text-gray-800 cursor-pointer hover:bg-gray-50 rounded px-2 py-2">
                          <GlobeAltIcon className="h-6 w-6 text-blue-600" /> Sell
                        </div>
                        <div className="flex items-center gap-3 text-base font-medium text-gray-800 cursor-pointer hover:bg-gray-50 rounded px-2 py-2">
                          <UserGroupIcon className="h-6 w-6 text-blue-600" /> Groups
                        </div>
                        <div className="flex items-center gap-3 text-base font-medium text-gray-800 cursor-pointer hover:bg-gray-50 rounded px-2 py-2">
                          <CreditCardIcon className="h-6 w-6 text-blue-600" /> Manage Billing
                        </div>
                        <div className="text-xs text-gray-500 font-semibold mt-2 mb-1">Talent</div>
                        <div className="flex items-center gap-3 text-base font-medium text-gray-800 cursor-pointer hover:bg-gray-50 rounded px-2 py-2">
                          <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-600" /> Post a job
                        </div>
                        <div className="flex items-center gap-3 text-base font-medium text-gray-800 cursor-pointer hover:bg-gray-50 rounded px-2 py-2">
                          <ChartBarIcon className="h-6 w-6 text-blue-600" /> Talent Insights
                        </div>
                        <div className="text-xs text-gray-500 font-semibold mt-2 mb-1">Sales</div>
                        <div className="flex items-center gap-3 text-base font-medium text-gray-800 cursor-pointer hover:bg-gray-50 rounded px-2 py-2">
                          <WrenchScrewdriverIcon className="h-6 w-6 text-blue-600" /> Services Marketplace
                        </div>
                        <div className="text-xs text-gray-500 font-semibold mt-2 mb-1">Marketing</div>
                        <div className="flex items-center gap-3 text-base font-medium text-gray-800 cursor-pointer hover:bg-gray-50 rounded px-2 py-2">
                          <MegaphoneIcon className="h-6 w-6 text-blue-600" /> Advertise
                        </div>
                      </div>
                    </div>
                    {/* Right: Explore more for business */}
                    <div className="w-1/2 p-6">
                      <div className="text-lg font-semibold mb-4">Explore more for business</div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <div className="font-semibold text-base text-gray-900">Hire on LinkedIn</div>
                          <div className="text-sm text-gray-500">Find, attract and recruit talent</div>
                        </div>
                        <div>
                          <div className="font-semibold text-base text-gray-900">Sell with LinkedIn</div>
                          <div className="text-sm text-gray-500">Unlock sales opportunities</div>
                        </div>
                        <div>
                          <div className="font-semibold text-base text-gray-900">Post a job for free</div>
                          <div className="text-sm text-gray-500">Get qualified applicants quickly</div>
                        </div>
                        <div>
                          <div className="font-semibold text-base text-gray-900">Advertise on LinkedIn</div>
                          <div className="text-sm text-gray-500">Acquire customers and grow your business</div>
                        </div>
                        <div>
                          <div className="font-semibold text-base text-gray-900">Get started with Premium</div>
                          <div className="text-sm text-gray-500">Expand and leverage your network</div>
                        </div>
                        <div>
                          <div className="font-semibold text-base text-gray-900">Learn with LinkedIn</div>
                          <div className="text-sm text-gray-500">Courses to develop your employees</div>
                        </div>
                        <div>
                          <div className="font-semibold text-base text-gray-900">Admin Center</div>
                          <div className="text-sm text-gray-500">Manage billing and account details</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <a href="/premium" className="text-sm text-[#915907] hover:underline">
                  Try Premium for free
                </a>
                {/* Theme Switcher */}
                <button
                  onClick={toggleTheme}
                  className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <MoonIcon className="h-5 w-5 text-gray-700" />
                  ) : (
                    <SunIcon className="h-5 w-5 text-yellow-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Top Header Bar */}
        {isMobile && (
          <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 flex items-center justify-between h-[52px] px-2 sm:px-4">
            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img className="h-[28px] w-[28px] sm:h-[34px] sm:w-[34px]" src="/images/company-logos/image.png" alt="LinkedIn" />
            </a>
            {/* Right icons */}
            <div className="flex items-center gap-2">
              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <MoonIcon className="h-5 w-5 text-gray-700" />
                ) : (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                )}
              </button>
              {/* Messaging */}
              <div className="relative messaging-menu">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none relative"
                  onClick={() => setShowMessaging(!showMessaging)}
                  aria-expanded={showMessaging}
                  aria-label="Messaging"
                >
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" aria-hidden="true" />
                </button>
              </div>
              {/* Messaging Fullscreen Modal for Mobile */}
              {isMobile && showMessaging && (
                <div className="fixed inset-0 z-[999] bg-white dark:bg-gray-900 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    {activeChat ? (
                      <button className="p-2 mr-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100" onClick={() => setActiveChat(null)} aria-label="Back to conversations">←</button>
                    ) : null}
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{activeChat ? activeChat.name : 'Messaging'}</span>
                    <button className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100" onClick={() => { setShowMessaging(false); setActiveChat(null); setChatMessages([]); setChatInput(''); }} aria-label="Close messaging">✕</button>
                  </div>
                  {/* Chat View */}
                  {activeChat ? (
                    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
                      {/* Chat header */}
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                        <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <div className="font-semibold text-base text-gray-900 dark:text-gray-100">{activeChat.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-300">Online</div>
                        </div>
                      </div>
                      {/* Message thread */}
                      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-2">
                        {/* Mock initial messages */}
                        <div className="self-start bg-gray-200 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 max-w-[80%]">Hi, how can I help you?</div>
                        <div className="self-end bg-[#0a66c2] text-white rounded-lg px-3 py-2 text-sm max-w-[80%]">I wanted to ask about the job opening.</div>
                        <div className="self-start bg-gray-200 dark:bg-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-gray-100 max-w-[80%]">Sure! What would you like to know?</div>
                        {/* User sent messages */}
                        {chatMessages.map((msg, idx) => (
                          <div key={idx} className="self-end bg-[#0a66c2] text-white rounded-lg px-3 py-2 text-sm max-w-[80%]">{msg}</div>
                        ))}
                      </div>
                      {/* Message input */}
                      <form className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" onSubmit={e => {
                        e.preventDefault();
                        if (chatInput.trim()) {
                          setChatMessages([...chatMessages, chatInput]);
                          setChatInput('');
                        }
                      }}>
                        <input
                          className="flex-1 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-2 text-sm bg-[#f3f2ef] dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="Type a message..."
                          value={chatInput}
                          onChange={e => setChatInput(e.target.value)}
                        />
                        <button type="submit" className="bg-[#0a66c2] text-white rounded-full px-4 py-2 font-semibold text-sm">Send</button>
                      </form>
                    </div>
                  ) : (
                  <>
                    {/* Search */}
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center gap-2">
                      <input className="flex-1 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-2 text-sm bg-[#f3f2ef] dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" placeholder="Search messages" />
                    </div>
                    {/* Conversation List */}
                    <div className="flex-1 overflow-y-auto px-2 py-2 bg-white dark:bg-gray-900">
                      {mockConversations.map(conv => (
                        <div key={conv.id} className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-3 mb-2 cursor-pointer" onClick={() => setActiveChat(conv)}>
                          <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-base text-gray-900 dark:text-gray-100 truncate">{conv.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-300 truncate">{conv.lastMessage}</div>
                          </div>
                          <span className="text-xs text-gray-400 dark:text-gray-300">{conv.lastDate}</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <a href="/messaging" className="block w-full text-center text-sm font-semibold text-[#0a66c2] hover:text-[#004182]">
                        View all messages
                      </a>
                    </div>
                  </>) }
                </div>
              )}
              {/* Notifications */}
              <div className="relative notifications-menu">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-expanded={showNotifications}
                  aria-label="Notifications"
                >
                  <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" aria-hidden="true" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${isMobile ? 'w-full max-w-[98vw] left-0 right-0 mx-auto py-2 px-2' : 'w-80 py-2'} ${isMobile ? 'max-h-[60vh]' : 'max-h-96'} overflow-y-auto`} role="menu">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                    </div>
                    <div className={isMobile ? 'flex flex-row gap-2 mt-2 overflow-x-auto' : ''}>
                      {notifications.slice(0, 3).map(notification => {
                        if (isMobile) {
                          return (
                            <div key={notification.id} className="min-w-[180px] max-w-[220px] h-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md flex flex-col justify-center px-3 py-2">
                              <p className="text-xs text-gray-900 dark:text-gray-100 truncate">{notification.message}</p>
                              <p className="text-[10px] text-gray-500 dark:text-gray-300 mt-0.5 truncate">{notification.timestamp}</p>
                            </div>
                          )
                        } else {
                          return (
                            <div 
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? 'bg-[#e8f3ff] dark:bg-gray-900' : ''}`}
                            >
                              <p className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">{notification.timestamp}</p>
                            </div>
                          )
                        }
                      })}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <a href="/notifications" className="block w-full text-center text-sm font-semibold text-[#0a66c2] hover:text-[#004182]">
                        View all notifications
                      </a>
                    </div>
                  </div>
                )}
              </div>
              {/* Profile Dropdown */}
              <div className="relative profile-menu">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none flex items-center"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  aria-expanded={showProfileMenu}
                  aria-label="Profile menu"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <UserCircleIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                    </div>
                  )}
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2" role="menu">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        {user?.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <UserCircleIcon className="h-8 w-8 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user?.name || 'Guest'}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-300">{user?.title || 'Not signed in'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <a href="/profile" className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                        View Profile
                      </a>
                      <a href="/settings" className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                        Settings
                      </a>
                      <a href="/help" className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                        Help Center
                      </a>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main className="pt-[52px] pb-16 lg:pb-0">
          {children}
        </main>

        {/* Mobile Navigation */}
        {isMobile && !showMessaging && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" role="navigation" aria-label="Mobile navigation">
            <div className="flex items-center justify-around h-14">
              <a href="/" className="flex flex-col items-center text-[#666666]">
                <HomeIcon className="h-6 w-6" aria-hidden="true" />
                <span className="text-xs mt-1">Home</span>
              </a>
              <a href="/network" className="flex flex-col items-center text-[#666666]">
                <UserGroupIcon className="h-6 w-6" aria-hidden="true" />
                <span className="text-xs mt-1">My Network</span>
              </a>
              <button className="flex flex-col items-center text-[#666666]" onClick={() => {
                if (pathname !== '/') {
                  router.push('/')
                  setTimeout(() => setShowGlobalPostInput(true), 100)
                } else {
                  setShowGlobalPostInput(true)
                }
              }}>
                <PlusIcon className="h-6 w-6" aria-hidden="true" />
                <span className="text-xs mt-1">Post</span>
              </button>
              <a href="/notifications" className="flex flex-col items-center text-[#666666]">
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
                <span className="text-xs mt-1">Notifications</span>
              </a>
              <a href="/jobs" className="flex flex-col items-center text-[#666666]">
                <BriefcaseIcon className="h-6 w-6" aria-hidden="true" />
                <span className="text-xs mt-1">Jobs</span>
              </a>
            </div>
          </div>
        )}

        {!isMobile && <MessagingDropdown />}
      </div>
    </ThemeContext.Provider>
  )
} 