'use client'

import { useState, useContext } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import { ThemeContext } from '@/components/layout/MainLayout'
import {
  UserCircleIcon,
  LockClosedIcon,
  EyeIcon,
  ShieldCheckIcon,
  RectangleStackIcon,
  BellIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const sidebarLinks = [
  { id: 'account', label: 'Account preferences', icon: UserCircleIcon },
  { id: 'security', label: 'Sign in & security', icon: LockClosedIcon },
  { id: 'visibility', label: 'Visibility', icon: EyeIcon },
  { id: 'privacy', label: 'Data privacy', icon: ShieldCheckIcon },
  { id: 'ads', label: 'Advertising data', icon: RectangleStackIcon },
  { id: 'notifications', label: 'Notifications', icon: BellIcon }
]

const user = {
  name: 'Siddik Vadla',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
}

const settingsContent = {
  account: [
    {
      title: 'Profile information',
      items: [
        { label: 'Name, location, and industry' },
        { label: 'Personal demographic information' },
        { label: 'Verifications' }
      ]
    },
    {
      title: 'Display',
      items: [
        { label: 'Dark mode' }
      ]
    },
    {
      title: 'General preferences',
      items: [
        { label: 'Language' },
        { label: 'Content language' },
        { label: 'Autoplay videos', value: 'On' },
        { label: 'Sound effects', value: 'On' }
      ]
    }
  ],
  security: [
    {
      title: 'Account access',
      items: [
        { label: 'Change password' },
        { label: "Where you're signed in" },
        { label: 'Two-step verification' }
      ]
    },
    {
      title: 'Device recognition',
      items: [
        { label: 'Manage recognized devices' }
      ]
    }
  ],
  visibility: [
    {
      title: 'Visibility of your profile & network',
      items: [
        { label: 'Profile viewing options' },
        { label: 'Edit your public profile' },
        { label: 'Who can see or download your email address' }
      ]
    },
    {
      title: 'Visibility of your LinkedIn activity',
      items: [
        { label: 'Manage active status' },
        { label: 'Share profile updates with your network' }
      ]
    }
  ],
  privacy: [
    {
      title: 'How LinkedIn uses your data',
      items: [
        { label: 'Manage your data and activity' },
        { label: 'Download your data' },
        { label: 'Job application settings' }
      ]
    },
    {
      title: 'Other privacy settings',
      items: [
        { label: 'Advertising data' },
        { label: 'Research and insights' }
      ]
    }
  ],
  ads: [
    {
      title: 'Advertising data',
      items: [
        { label: 'Ad preferences' },
        { label: 'Third-party data' },
        { label: 'Interest categories' }
      ]
    }
  ],
  notifications: [
    {
      title: 'How you get your notifications',
      items: [
        { label: 'On LinkedIn' },
        { label: 'Email' },
        { label: 'Push' }
      ]
    },
    {
      title: 'Types of notifications',
      items: [
        { label: 'Job alerts' },
        { label: 'Network activity' },
        { label: 'News & articles' }
      ]
    }
  ]
}

export default function SettingsPage() {
  const { theme } = useContext(ThemeContext)
  const [active, setActive] = useState('account')
  const [settings, setSettings] = useState({
    name: 'Siddik Vadla',
    language: 'English',
    contentLanguage: 'English',
    autoplay: true,
    sound: true
  })
  const [editingField, setEditingField] = useState(null)
  const [fieldValue, setFieldValue] = useState('')
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const handleEdit = (field, value) => {
    setEditingField(field)
    setFieldValue(value)
  }

  const handleSave = () => {
    setSettings(prev => ({ ...prev, [editingField]: fieldValue }))
    setEditingField(null)
  }

  const handleToggle = (field) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleCancel = () => {
    setEditingField(null)
  }

  // Helper to render editable or toggle fields
  const renderSettingItem = (item) => {
    if (item.label === 'Name, location, and industry') {
      return (
        <>
          <span className="flex-1 text-base text-gray-900 font-medium">Name</span>
          {editingField === 'name' ? (
            <>
              <input
                className="border rounded px-2 py-1 text-sm mr-2"
                value={fieldValue}
                onChange={e => setFieldValue(e.target.value)}
                autoFocus
                onBlur={handleCancel}
                onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
              />
              <button className="text-green-700 font-semibold mr-2" onClick={handleSave}>Save</button>
              <button className="text-gray-500" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-500 mr-4">{settings.name}</span>
              <button className="text-[#0a66c2] underline text-sm" onClick={() => handleEdit('name', settings.name)}>Edit</button>
            </>
          )}
        </>
      )
    }
    if (item.label === 'Language') {
      return (
        <>
          <span className="flex-1 text-base text-gray-900 font-medium">Language</span>
          {editingField === 'language' ? (
            <>
              <input
                className="border rounded px-2 py-1 text-sm mr-2"
                value={fieldValue}
                onChange={e => setFieldValue(e.target.value)}
                autoFocus
                onBlur={handleCancel}
                onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
              />
              <button className="text-green-700 font-semibold mr-2" onClick={handleSave}>Save</button>
              <button className="text-gray-500" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-500 mr-4">{settings.language}</span>
              <button className="text-[#0a66c2] underline text-sm" onClick={() => handleEdit('language', settings.language)}>Edit</button>
            </>
          )}
        </>
      )
    }
    if (item.label === 'Content language') {
      return (
        <>
          <span className="flex-1 text-base text-gray-900 font-medium">Content language</span>
          {editingField === 'contentLanguage' ? (
            <>
              <input
                className="border rounded px-2 py-1 text-sm mr-2"
                value={fieldValue}
                onChange={e => setFieldValue(e.target.value)}
                autoFocus
                onBlur={handleCancel}
                onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
              />
              <button className="text-green-700 font-semibold mr-2" onClick={handleSave}>Save</button>
              <button className="text-gray-500" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-500 mr-4">{settings.contentLanguage}</span>
              <button className="text-[#0a66c2] underline text-sm" onClick={() => handleEdit('contentLanguage', settings.contentLanguage)}>Edit</button>
            </>
          )}
        </>
      )
    }
    if (item.label === 'Autoplay videos') {
      return (
        <>
          <span className="flex-1 text-base text-gray-900 font-medium">Autoplay videos</span>
          <button
            className={`w-12 h-6 flex items-center rounded-full px-1 ${settings.autoplay ? 'bg-[#0a66c2]' : 'bg-gray-300'} transition-colors mr-4`}
            onClick={() => handleToggle('autoplay')}
            aria-pressed={settings.autoplay}
          >
            <span className={`h-4 w-4 rounded-full bg-white shadow transform transition-transform ${settings.autoplay ? 'translate-x-6' : ''}`}></span>
          </button>
          <span className="text-sm text-gray-500">{settings.autoplay ? 'On' : 'Off'}</span>
        </>
      )
    }
    if (item.label === 'Sound effects') {
      return (
        <>
          <span className="flex-1 text-base text-gray-900 font-medium">Sound effects</span>
          <button
            className={`w-12 h-6 flex items-center rounded-full px-1 ${settings.sound ? 'bg-[#0a66c2]' : 'bg-gray-300'} transition-colors mr-4`}
            onClick={() => handleToggle('sound')}
            aria-pressed={settings.sound}
          >
            <span className={`h-4 w-4 rounded-full bg-white shadow transform transition-transform ${settings.sound ? 'translate-x-6' : ''}`}></span>
          </button>
          <span className="text-sm text-gray-500">{settings.sound ? 'On' : 'Off'}</span>
        </>
      )
    }
    // Default: just show label
    return <span className="flex-1 text-base text-gray-900 font-medium">{item.label}</span>
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef] dark:bg-gray-900 flex justify-center pt-8 pb-16">
        <div className="w-full max-w-7xl flex gap-6 px-2 md:px-4 lg:px-8">
          {/* Left Sidebar */}
          <aside className="w-[320px] hidden lg:flex flex-col bg-[#f5f5f3] dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen pt-8 px-0">
            <div className="flex items-center gap-3 px-8 mb-8">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</span>
            </div>
            <nav className="flex flex-col gap-1 px-2">
              {sidebarLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => setActive(link.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg text-base font-medium transition-colors ${active === link.id ? 'bg-white dark:bg-gray-900 text-green-700 shadow-sm' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <link.icon className={`h-6 w-6 ${active === link.id ? 'text-green-700' : 'text-gray-400 dark:text-gray-400'}`} />
                  {link.label}
                </button>
              ))}
            </nav>
          </aside>
          {/* Main Content */}
          <main className="flex-1 max-w-2xl mx-auto">
            <div className="max-w-2xl mx-auto flex flex-col gap-8">
              {(settingsContent[active] || []).map(group => (
                <section key={group.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="px-8 pt-6 pb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">{group.title}</div>
                  <ul>
                    {group.items.map((item, idx) => (
                      <li key={item.label} className={`flex items-center px-8 py-4 border-t border-gray-100 dark:border-gray-700 ${idx === 0 ? 'border-t-0' : ''} group hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer`}>
                        {renderSettingItem(item)}
                        <ArrowRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-100" />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </main>
          {/* Right Sidebar */}
          <aside className="w-[320px] hidden xl:flex flex-col gap-4">
            {/* Premium Ad, tips, etc. */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center mb-4">
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Try Premium for free</div>
              <button className="mt-2 px-4 py-2 bg-[#0a66c2] text-white rounded-full text-sm font-semibold hover:bg-[#004182]" onClick={() => setShowPremiumModal(true)}>Try Premium</button>
            </div>
            {/* Additional widgets */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
              {/* ...additional right sidebar content... */}
            </div>
          </aside>
        </div>
      </div>
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
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-[#e8f3ff] dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-[#0a66c2] text-2xl font-bold">★</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Premium Features
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    Get access to exclusive insights and tools.
                  </p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-[#0a66c2] text-white rounded-full text-sm font-medium hover:bg-[#004182] transition-colors duration-200">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
} 