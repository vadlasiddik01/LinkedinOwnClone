'use client'

import { useState, useContext } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { useRouter } from 'next/navigation'
import { ThemeContext } from '@/components/layout/MainLayout'

import {
  BellIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  UserPlusIcon,
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
  CheckIcon,
  ClockIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const profile = {
  name: 'Siddik Vadla',
  title: 'Intern @YashikYadav&Co | No-Code/Low-Code Automation Expe...',
  location: 'Kurnool Rural, Andhra Pradesh',
  company: 'Yashik Yadav & Co',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  banner: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
}

const notifications = [
  {
    id: 1,
    unread: true,
    avatar: profile.avatar,
    text: <><b>Naga Venkata Lakshmi Narayana Marripudi</b>'s <b>connection</b> is hiring for a <b>Front-End Developer Intern</b> at <b>Unified Mentor Private Limited</b>. <span className="text-gray-500">Explore jobs in your network.</span></>,
    time: '52m',
    action: <button className="border border-[#0a66c2] text-[#0a66c2] rounded-full px-4 py-1 text-sm font-semibold hover:bg-[#e8f3ff]">View jobs</button>
  },
  {
    id: 2,
    unread: true,
    avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
    text: <><b>New from Expert Buddy</b> in Student Success: Why Language Learning Is Essential for Every Student's Career</>,
    time: '1h'
  },
  {
    id: 3,
    unread: true,
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    text: <><b>solutions engineer</b>: 10 opportunities in <b>Bengaluru</b>.</>,
    time: '1h',
    action: <button className="border border-[#0a66c2] text-[#0a66c2] rounded-full px-4 py-1 text-sm font-semibold hover:bg-[#e8f3ff]">View jobs</button>
  },
  {
    id: 4,
    unread: true,
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    text: <><b>Uppada Venu</b> commented on <b>Abhinaya Madhuri Singh</b>'s post: Congrats Abhinaya! 🎉</>,
    time: '1h'
  },
  {
    id: 5,
    unread: false,
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    text: <><b>Vikas Kamera</b> posted: #ECommerceApplication #Database #ModellingDatabases</>,
    time: '2h'
  }
]

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'jobs', label: 'Jobs' },
  { id: 'myposts', label: 'My posts' },
  { id: 'mentions', label: 'Mentions' }
]

export default function NotificationsPage() {
  const { theme } = useContext(ThemeContext)
  const [activeTab, setActiveTab] = useState('all')
  const [notificationsState, setNotificationsState] = useState(notifications)
  const [showNotificationOptions, setShowNotificationOptions] = useState(null)
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const router = useRouter()

  const handlePremium = () => router.push('/premium')

  const handleNotificationAction = async (action, notificationId) => {
    if (action === 'markAsRead') {
      setNotificationsState(prev => prev.map(n => n.id === notificationId ? { ...n, unread: false } : n))
    } else if (action === 'delete') {
      setNotificationsState(prev => prev.filter(n => n.id !== notificationId))
    }
    setShowNotificationOptions(null)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'connection':
        return <UserPlusIcon className="h-6 w-6 text-[#0a66c2]" />
      case 'like':
        return <HandThumbUpIcon className="h-6 w-6 text-[#0a66c2]" />
      case 'comment':
        return <ChatBubbleLeftIcon className="h-6 w-6 text-[#0a66c2]" />
      case 'share':
        return <ShareIcon className="h-6 w-6 text-[#0a66c2]" />
      case 'company':
        return <BuildingOfficeIcon className="h-6 w-6 text-[#0a66c2]" />
      default:
        return <BellIcon className="h-6 w-6 text-[#0a66c2]" />
    }
  }

  const getNotificationContent = (notification) => {
    switch (notification.type) {
      case 'connection':
        return `${notification.user.name} accepted your connection request`
      case 'like':
        return `${notification.user.name} liked your post`
      case 'comment':
        return `${notification.user.name} commented on your post`
      case 'share':
        return `${notification.user.name} shared your post`
      case 'company':
        return `${notification.company.name} posted a new job`
      default:
        return notification.content
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef] dark:bg-gray-900 flex justify-center pt-6 pb-16">
        <div className="w-full max-w-7xl flex gap-6 px-2 md:px-4 lg:px-8">
          {/* Left Sidebar */}
          <aside className="w-[300px] hidden lg:block flex-shrink-0 space-y-4">
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
              <div className="h-20 bg-gray-200 dark:bg-gray-700 relative">
                <img src={profile.banner} alt="Banner" className="w-full h-full object-cover" />
                <img src={profile.avatar} alt={profile.name} className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white dark:border-gray-800" />
              </div>
              <div className="pt-10 pb-4 px-4 text-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{profile.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{profile.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{profile.location}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{profile.company}</p>
              </div>
            </div>
            {/* Manage notifications */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Manage your notifications</div>
              <a href="#" className="text-[#0a66c2] hover:underline text-sm">View settings</a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-2xl mx-auto space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${activeTab === tab.id ? 'bg-[#e9f5ee] dark:bg-gray-700 text-[#00664f] border-[#00664f]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{tab.label}</button>
              ))}
            </div>
            {/* Notification List */}
            <div className="space-y-2">
              {notificationsState.map(n => (
                <div key={n.id} className={`flex items-start gap-3 ${n.unread ? 'bg-[#eaf3fc] dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 relative`}> 
                  {n.unread && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0a66c2]" />}
                  <img src={n.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 dark:text-gray-100 leading-tight">{n.text}</div>
                    {n.action && <div className="mt-2">{n.action}</div>}
                  </div>
                  <div className="flex flex-col items-end gap-2 min-w-[60px]">
                    <span className="text-xs text-gray-400 dark:text-gray-300 whitespace-nowrap">{n.time}</span>
                    <button className="p-1 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100" onClick={() => setShowNotificationOptions(n.id)}><EllipsisHorizontalIcon className="h-5 w-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="w-[320px] hidden xl:flex flex-col gap-4">
            {/* Premium Promo */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center mb-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-right w-full">Ad</div>
              <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover mb-2" />
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Siddik, boost your job search with Premium</div>
              <button className="mt-2 px-4 py-2 bg-[#0a66c2] text-white rounded-full text-sm font-semibold hover:bg-[#004182]" onClick={() => setShowPremiumModal(true)}>Retry for free</button>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Premium subscribers who use AI receive 4x more recruiter views</div>
            </div>
            {/* Footer */}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 space-y-1 text-center">
              <div>About &nbsp; Accessibility &nbsp; Help Center</div>
              <div>Privacy & Terms &nbsp; Ad Choices</div>
              <div>Advertising &nbsp; Business Services</div>
              <div>Get the LinkedIn app &nbsp; More</div>
              <div className="mt-2 flex items-center justify-center gap-1"><img src="/images/company-logos/image.png" alt="LinkedIn" className="h-4 w-4" /> LinkedIn Corporation © 2025</div>
            </div>
          </aside>
        </div>
      </div>

      {/* Notification Options Menu */}
      {showNotificationOptions && (
        <div className="fixed inset-0 z-50" onClick={() => setShowNotificationOptions(null)}>
          <div className="absolute right-4 top-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-48">
            <div className="py-1">
              <button
                onClick={() => handleNotificationAction('markAsRead', showNotificationOptions)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Mark as read
              </button>
              <button
                onClick={() => handleNotificationAction('delete', showNotificationOptions)}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Try Premium free</h2>
              <button
                onClick={() => setShowPremiumModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-[#e8f3ff] dark:bg-gray-700 flex items-center justify-center">
                  <SparklesIcon className="h-6 w-6 text-[#0a66c2]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Premium Notifications
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    Get unlimited notifications
                  </p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-[#0a66c2] text-white rounded-full text-sm font-medium hover:bg-[#004182] transition-colors duration-200">
                Try Premium for free
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
} 