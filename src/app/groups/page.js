'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  GlobeAltIcon,
  LockClosedIcon,
  FireIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    privacy: '',
    activity: '',
    size: ''
  })
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Tech Innovators',
      category: 'tech',
      privacy: 'public',
      thumbnail: '/images/groups/tech-innovators.jpg',
      description: 'A community of technology enthusiasts and professionals sharing insights and innovations.',
      members: 25000,
      posts: 1200,
      isTrending: true,
      recentActivity: '2 hours ago',
      tags: ['Technology', 'Innovation', 'AI', 'Software Development'],
      joined: false,
      bookmarked: false,
      shared: false
    },
    {
      id: 2,
      name: 'Digital Marketing Professionals',
      category: 'business',
      privacy: 'private',
      thumbnail: '/images/groups/digital-marketing.jpg',
      description: 'Connect with digital marketing experts and share best practices in the industry.',
      members: 15000,
      posts: 850,
      isTrending: false,
      recentActivity: '5 hours ago',
      tags: ['Marketing', 'Digital', 'Social Media', 'SEO'],
      joined: false,
      bookmarked: false,
      shared: false
    }
  ])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newGroup, setNewGroup] = useState({ name: '', description: '', category: '', privacy: 'public' })

  const categories = [
    { id: 'all', label: 'All Groups' },
    { id: 'tech', label: 'Technology' },
    { id: 'business', label: 'Business' },
    { id: 'career', label: 'Career Development' },
    { id: 'industry', label: 'Industry Specific' },
    { id: 'networking', label: 'Networking' }
  ]

  const handleFilterChange = (filter, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: value
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      category: '',
      privacy: '',
      activity: '',
      size: ''
    })
  }

  const handleJoin = (groupId) => {
    setGroups(groups => groups.map(g => g.id === groupId ? { ...g, joined: !g.joined } : g))
  }

  const handleBookmark = (groupId) => {
    setGroups(groups => groups.map(g => g.id === groupId ? { ...g, bookmarked: !g.bookmarked } : g))
  }

  const handleShare = (groupId) => {
    setGroups(groups => groups.map(g => g.id === groupId ? { ...g, shared: true } : g))
    setTimeout(() => setGroups(groups => groups.map(g => g.id === groupId ? { ...g, shared: false } : g)), 1000)
  }

  const handleCreateGroup = (e) => {
    e.preventDefault()
    if (newGroup.name && newGroup.description && newGroup.category) {
      setGroups([
        {
          id: Date.now(),
          ...newGroup,
          thumbnail: '',
          members: 1,
          posts: 0,
          isTrending: false,
          recentActivity: 'Just now',
          tags: [],
          joined: true,
          bookmarked: false,
          shared: false
        },
        ...groups
      ])
      setShowCreateModal(false)
      setNewGroup({ name: '', description: '', category: '', privacy: 'public' })
    }
  }

  const filteredGroups = groups.filter(g => {
    return (
      (!searchQuery || g.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedFilters.category || g.category === selectedFilters.category) &&
      (!selectedFilters.privacy || g.privacy === selectedFilters.privacy)
    )
  })

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0a66c2] hover:bg-[#004182]">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Group
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                  placeholder="Search groups"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                Filters
                {showFilters ? (
                  <ChevronUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                )}
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  <button
                    className="text-sm text-[#0a66c2] hover:text-[#004182]"
                    onClick={clearFilters}
                  >
                    Clear all
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                      value={selectedFilters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                      <option value="">All categories</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Privacy
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                      value={selectedFilters.privacy}
                      onChange={(e) => handleFilterChange('privacy', e.target.value)}
                    >
                      <option value="">All privacy settings</option>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Activity
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                      value={selectedFilters.activity}
                      onChange={(e) => handleFilterChange('activity', e.target.value)}
                    >
                      <option value="">Any activity</option>
                      <option value="very-active">Very Active</option>
                      <option value="active">Active</option>
                      <option value="moderate">Moderate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Size
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] sm:text-sm"
                      value={selectedFilters.size}
                      onChange={(e) => handleFilterChange('size', e.target.value)}
                    >
                      <option value="">Any size</option>
                      <option value="large">Large (10k+)</option>
                      <option value="medium">Medium (1k-10k)</option>
                      <option value="small">Small (&lt;1k)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-full border border-gray-300 hover:bg-gray-50 whitespace-nowrap"
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Groups List */}
          <div className="space-y-6">
            {filteredGroups.map(group => (
              <div
                key={group.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="flex">
                  <img
                    src={group.thumbnail}
                    alt={group.name}
                    className="h-48 w-64 object-cover"
                  />
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {group.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <UserGroupIcon className="h-5 w-5 mr-1" />
                            {group.members} members
                          </div>
                          <div className="flex items-center">
                            {group.privacy ? group.privacy.charAt(0).toUpperCase() + group.privacy.slice(1) : ''}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => handleBookmark(group.id)}
                        >
                          {group.bookmarked ? (
                            <BookmarkIcon className="h-5 w-5 text-gray-500" />
                          ) : (
                            <BookmarkIcon className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => handleShare(group.id)}
                        >
                          {group.shared ? (
                            <ShareIcon className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ShareIcon className="h-5 w-5" />
                          )}
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-500">
                          <EllipsisHorizontalIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{group.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {group.posts} posts
                          </span>
                        </div>
                        <div className="flex items-center">
                          <SparklesIcon className="h-5 w-5 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {group.isTrending ? 'Trending' : group.recentActivity}
                          </span>
                        </div>
                      </div>
                      <button
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${group.joined ? 'text-white bg-[#0a66c2] hover:bg-[#004182]' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                        onClick={() => handleJoin(group.id)}
                      >
                        {group.joined ? 'Joined' : 'Join Group'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 