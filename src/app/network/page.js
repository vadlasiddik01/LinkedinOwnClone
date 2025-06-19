'use client'

import { useState, useEffect, useContext } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  UserPlusIcon,
  UserMinusIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  MapPinIcon,
  EllipsisHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import useStore from '@/store'
import { ThemeContext } from '@/components/layout/MainLayout'

const suggestions = [
  {
    id: 1,
    name: 'Ram Lakshman ...',
    title: '-',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    mutual: 'Manoj and 41 other mutual connections',
    mutualAvatars: [
      'https://randomuser.me/api/portraits/men/21.jpg',
      'https://randomuser.me/api/portraits/women/22.jpg'
    ]
  },
  {
    id: 2,
    name: 'Rohith Basude',
    title: 'Software Engineer at NCR Voyix | Ex-Infor',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    mutual: 'Yamini is a mutual connection',
    mutualAvatars: [
      'https://randomuser.me/api/portraits/women/23.jpg'
    ]
  },
  {
    id: 3,
    name: 'Dinesh Kumar Redd...',
    title: 'Software Engineer-| @Hashedin By Deloitte |..',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    mutual: 'Teja and 1 other mutual connection',
    mutualAvatars: [
      'https://randomuser.me/api/portraits/men/24.jpg'
    ]
  },
  {
    id: 4,
    name: 'GAURAV KUMAR',
    title: 'Data Engineer || AWS || PySpark || CI/CD',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    mutual: 'Sai Vara is a mutual connection',
    mutualAvatars: [
      'https://randomuser.me/api/portraits/men/25.jpg'
    ]
  },
  {
    id: 5,
    name: 'Vyshnavi Thiriveedhi',
    title: 'Graphic Designer Intern at DevSecEngOps',
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    mutual: 'Sambashivarao and 6 other mutual ...',
    mutualAvatars: [
      'https://randomuser.me/api/portraits/men/26.jpg'
    ]
  },
  {
    id: 6,
    name: 'Geeth Krishna ...',
    title: 'YL Associate 🌱 | Competitive programme..',
    avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
    mutual: 'Kategari is a mutual connection',
    mutualAvatars: [
      'https://randomuser.me/api/portraits/men/27.jpg'
    ]
  },
  {
    id: 7,
    name: 'hemant sai gubala',
    title: 'Software Engineer @UnifyApps | ...',
    avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    mutual: '',
    mutualAvatars: []
  },
  {
    id: 8,
    name: 'Kondapalli Chandrika',
    title: "UG CS'25 | Reactjs | Nodejs | Expressjs | ...",
    avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
    mutual: '',
    mutualAvatars: []
  }
]

export default function NetworkPage() {
  const { theme } = useContext(ThemeContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState('suggestions')
  const [selectedFilters, setSelectedFilters] = useState({
    connectionDegree: 'all',
    industry: 'all',
    location: 'all'
  })
  const [suggestionList, setSuggestionList] = useState(suggestions)
  const [pendingList, setPendingList] = useState([])
  const [sentList, setSentList] = useState([])
  const [connectionsList, setConnectionsList] = useState([])

  const {
    connections,
    pendingInvitations,
    sentInvitations,
    setConnections,
    setPendingInvitations,
    setSentInvitations,
    acceptInvitation,
    declineInvitation,
    sendInvitation
  } = useStore()

  useEffect(() => {
    // In a real app, these would be API calls
    const fetchData = async () => {
      // Simulate API calls
      const mockConnections = [
        {
          id: 1,
          name: 'Sarah Johnson',
          title: 'Senior Software Engineer',
          company: 'Tech Solutions Inc.',
          avatar: 'https://via.placeholder.com/48',
          mutualConnections: 12,
          location: 'San Francisco, CA',
          industry: 'Technology',
          connectionDegree: '2nd'
        },
        {
          id: 2,
          name: 'Michael Chen',
          title: 'Product Manager',
          company: 'Innovation Labs',
          avatar: 'https://via.placeholder.com/48',
          mutualConnections: 8,
          location: 'New York, NY',
          industry: 'Technology',
          connectionDegree: '2nd'
        }
      ]

      const mockPendingInvitations = [
        {
          id: 1,
          name: 'Emily Rodriguez',
          title: 'UX Designer',
          company: 'Design Studio',
          avatar: 'https://via.placeholder.com/48',
          mutualConnections: 5,
          location: 'Los Angeles, CA',
          industry: 'Design',
          connectionDegree: '2nd'
        }
      ]

      const mockSentInvitations = [
        {
          id: 1,
          name: 'David Kim',
          title: 'Data Scientist',
          company: 'AI Research Lab',
          avatar: 'https://via.placeholder.com/48',
          mutualConnections: 3,
          location: 'Boston, MA',
          industry: 'Technology',
          connectionDegree: '3rd',
          sentDate: '2 days ago'
        }
      ]

      setConnections(mockConnections)
      setPendingInvitations(mockPendingInvitations)
      setSentInvitations(mockSentInvitations)
    }

    fetchData()
  }, [setConnections, setPendingInvitations, setSentInvitations])

  const handleConnect = (user) => {
    setSuggestionList(list => list.filter(u => u.id !== user.id))
    setPendingList(list => [...list, { ...user, company: user.title, mutualConnections: user.mutualAvatars.length }])
  }

  const handleDismiss = (id) => {
    setSuggestionList(list => list.filter(u => u.id !== id))
  }

  const handleAcceptInvitation = (id) => {
    const user = pendingList.find(u => u.id === id)
    setPendingList(list => list.filter(u => u.id !== id))
    setConnectionsList(list => user ? [...list, user] : list)
  }

  const handleDeclineInvitation = (id) => {
    setPendingList(list => list.filter(u => u.id !== id))
  }

  const handleWithdraw = (id) => {
    setSentList(list => list.filter(u => u.id !== id))
  }

  const handleFilterChange = (filter, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: value
    }))
  }

  const filteredSuggestions = suggestionList.filter(user =>
    (!searchQuery || user.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedFilters.connectionDegree === 'all' || user.connectionDegree === selectedFilters.connectionDegree) &&
    (selectedFilters.industry === 'all' || user.title?.toLowerCase().includes(selectedFilters.industry.toLowerCase())) &&
    (selectedFilters.location === 'all' || user.location?.toLowerCase().includes(selectedFilters.location.toLowerCase()))
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'suggestions':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSuggestions.map(user => (
              <div
                key={user.id}
                className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center p-6 pt-8 transition-transform duration-200 hover:shadow-lg hover:scale-[1.03] group"
              >
                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" onClick={() => handleDismiss(user.id)}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-3 flex items-center justify-center shadow-md border-4 border-white dark:border-gray-800 group-hover:shadow-xl transition-shadow">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div className="text-center w-full">
                  <div className="font-bold text-lg text-gray-900 dark:text-gray-100 truncate">{user.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-300 mt-1 truncate">{user.title}</div>
                  {user.mutual && (
                    <div className="flex items-center justify-center gap-1 mt-3 mb-1">
                      {user.mutualAvatars.map((a, i) => (
                        <img key={i} src={a} alt="mutual" className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 -ml-2 first:ml-0 shadow" />
                      ))}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 truncate">{user.mutual}</span>
                    </div>
                  )}
                </div>
                <button
                  className="mt-5 w-full py-2 rounded-full font-semibold text-base bg-[#0a66c2] text-white hover:bg-[#004182] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:ring-offset-2"
                  onClick={() => handleConnect(user)}
                >
                  <UserPlusIcon className="inline-block h-5 w-5 mr-1 align-middle" /> Connect
                </button>
              </div>
            ))}
          </div>
        )
      case 'pending':
        return (
          <div className="space-y-4">
            {pendingList.map(invitation => (
              <div
                key={invitation.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={invitation.avatar}
                    alt={invitation.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {invitation.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {invitation.title} at {invitation.company}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {invitation.mutualConnections} mutual connections
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <button
                        onClick={() => handleAcceptInvitation(invitation.id)}
                        className="flex-1 px-4 py-1.5 bg-[#0a66c2] text-white rounded-full text-sm font-medium hover:bg-[#004182]"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDeclineInvitation(invitation.id)}
                        className="flex-1 px-4 py-1.5 border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50"
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      case 'sent':
        return (
          <div className="space-y-4">
            {sentList.map(invitation => (
              <div
                key={invitation.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={invitation.avatar}
                    alt={invitation.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {invitation.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {invitation.title} at {invitation.company}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {invitation.mutualConnections} mutual connections
                    </p>
                    <p className="text-xs text-gray-500">
                      Invitation sent {invitation.sentDate || 'just now'}
                    </p>
                    <div className="mt-2">
                      <button className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50" onClick={() => handleWithdraw(invitation.id)}>
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef] dark:bg-gray-900 flex justify-center pt-8 pb-16">
        <div className="w-full max-w-8xl flex gap-6 px-2 md:px-4 lg:px-8">
          {/* Main Content */}
          <main className="flex-1 mx-auto">
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-6 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  People you may know from React Js & React Native Developer's India
                </h2>
                <a href="#" className="text-[#0a66c2] hover:underline font-medium">Show all</a>
              </div>
              {renderContent()}
            </div>
          </main>
          {/* Sidebar (now on the right) */}
          <aside className="w-[320px] hidden lg:flex flex-col gap-4">
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search people"
                  className="flex-1 border-none outline-none bg-transparent text-sm dark:bg-gray-800 dark:text-gray-100"
                />
                <button onClick={()=>setShowFilters(v=>!v)} className="p-1 text-gray-500 hover:text-gray-700"><AdjustmentsHorizontalIcon className="h-5 w-5" /></button>
              </div>
              {showFilters && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-300 mb-1">Connection degree</label>
                    <select value={selectedFilters.connectionDegree} onChange={e=>handleFilterChange('connectionDegree', e.target.value)} className="w-full border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-100">
                      <option value="all">All</option>
                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                      <option value="3rd">3rd+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-300 mb-1">Industry</label>
                    <select value={selectedFilters.industry} onChange={e=>handleFilterChange('industry', e.target.value)} className="w-full border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-100">
                      <option value="all">All</option>
                      <option value="Technology">Technology</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-300 mb-1">Location</label>
                    <select value={selectedFilters.location} onChange={e=>handleFilterChange('location', e.target.value)} className="w-full border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-100">
                      <option value="all">All</option>
                      <option value="San Francisco, CA">San Francisco, CA</option>
                      <option value="New York, NY">New York, NY</option>
                      <option value="Los Angeles, CA">Los Angeles, CA</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex gap-2 mb-2">
                <button onClick={()=>setActiveTab('suggestions')} className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${activeTab==='suggestions' ? 'bg-[#e9f5ee] text-[#00664f] border-[#00664f]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'}`}>Suggestions</button>
                <button onClick={()=>setActiveTab('pending')} className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${activeTab==='pending' ? 'bg-[#e9f5ee] text-[#00664f] border-[#00664f]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'}`}>Pending</button>
                <button onClick={()=>setActiveTab('sent')} className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${activeTab==='sent' ? 'bg-[#e9f5ee] text-[#00664f] border-[#00664f]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'}`}>Sent</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  )
} 