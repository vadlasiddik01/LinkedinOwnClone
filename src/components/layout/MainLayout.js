'use client'

import { useEffect, useRef, useState, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
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
    logout
  } = useStore()
  const [showWorkMenu, setShowWorkMenu] = useState(false)
  const workMenuRef = useRef(null)
  const [theme, setTheme] = useState('light')

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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-[#f3f2ef]'}`}>
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50" role="navigation" aria-label="Main navigation">
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
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2" role="menu">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.slice(0, 3).map(notification => (
                          <div 
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? 'bg-[#e8f3ff] dark:bg-gray-900' : ''}`}
                          >
                            <p className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">{notification.timestamp}</p>
                          </div>
                        ))}
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

        {/* Main Content */}
        <main className="pt-[52px] pb-16 lg:pb-0">
          {children}
        </main>

        {/* Mobile Navigation */}
        {isMobile && (
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
              <button className="flex flex-col items-center text-[#666666]">
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

        <MessagingDropdown />
      </div>
    </ThemeContext.Provider>
  )
} 