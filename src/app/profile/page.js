'use client'

import { useState, useEffect, useContext } from 'react'
import MainLayout, { ThemeContext } from '@/components/layout/MainLayout'
import {
  PencilIcon,
  PlusIcon,
  LinkIcon,
  MapPinIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
  TrophyIcon,
  DocumentTextIcon,
  PhotoIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import useStore from '@/store'

const profile = {
  name: 'Siddik Vadla',
  pronouns: 'They/Them',
  headline: 'Intern @YashikYadav&Co | No-Code/Low-Code Automation Expert | AI App Dev Tools Expert | I ❤️ Ubuntu | MERN Stack Developer | DSA',
  location: 'Kurnool Rural, Andhra Pradesh, India',
  company: {
    name: 'Yashik Yadav & Co',
    logo: '/images/company-logos/y.png'
  },
  education: {
    name: 'RGUKT IIIT SRIKAKULAM,AP',
    logo: '/images/company-logos/rgukt.png'
  },
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  openTo: 'Web Developer, Frontend Developer, Full Stack Developer',
  connections: 500,
  viewers: [
    { name: 'Abhishek C H', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' }
  ],
  publicUrl: 'www.linkedin.com/in/vadla-siddik',
  language: 'English'
}

export default function ProfilePage() {
  const { theme } = useContext(ThemeContext)
  const [activeTab, setActiveTab] = useState('about')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editSection, setEditSection] = useState(null)
  const [aboutInput, setAboutInput] = useState('')
  const [experienceInput, setExperienceInput] = useState(null)
  const [educationInput, setEducationInput] = useState(null)

  const {
    profile: storeProfile,
    setProfile,
    updateProfile,
    addExperience,
    addEducation,
    addSkill,
    removeExperience,
    removeEducation,
    removeSkill
  } = useStore()

  useEffect(() => {
    if (storeProfile) {
      setAboutInput(storeProfile.about || '')
      setExperienceInput(storeProfile.experience ? [...storeProfile.experience] : [])
      setEducationInput(storeProfile.education ? [...storeProfile.education] : [])
    }
  }, [storeProfile])

  const handleEditProfile = (section) => {
    setEditSection(section)
    setShowEditModal(true)
  }

  const handleSaveProfile = (data) => {
    updateProfile(data)
    setShowEditModal(false)
    setEditSection(null)
  }

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' }
  ]

  // Static mock data for recent activities and connections
  const recentActivities = [
    { id: 1, type: 'post', text: 'Shared a post about React best practices', date: '2h ago' },
    { id: 2, type: 'comment', text: "Commented on Jane Smith's post", date: '5h ago' },
    { id: 3, type: 'like', text: 'Liked a post by John Doe', date: '1d ago' },
    { id: 4, type: 'connection', text: 'Connected with Alice Johnson', date: '2d ago' },
  ]
  const recentConnections = [
    { id: 1, name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/32.jpg', title: 'Product Manager at TechCorp' },
    { id: 2, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/31.jpg', title: 'Senior Software Engineer at TechCorp' },
    { id: 3, name: 'Alice Johnson', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', title: 'UI/UX Designer at Creative Minds' },
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef] dark:bg-gray-900 flex flex-col lg:flex-row justify-center pt-6 pb-16">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Main Section */}
          <main className="flex-1 w-full max-w-3xl mx-auto">
            {/* Cover + Profile */}
            <div className="relative rounded-t-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="h-56 bg-gray-200 dark:bg-gray-700 relative">
                <img src={profile.cover} alt="Cover" className="w-full h-full object-cover" />
                <button className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-900 rounded-full shadow hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"><PencilIcon className="h-5 w-5 text-gray-600 dark:text-gray-200" /></button>
              </div>
              <div className="px-8 pb-6 pt-0">
                <div className="relative flex items-end gap-6 -mt-20">
                  <div className="relative">
                    {/* #OPENTOWORK badge as green ring and overlay text */}
                    <div className="relative">
                      <div className="h-36 w-36 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-lg">
                        <div className="h-32 w-32 rounded-full border-4 border-[#27ae60] flex items-center justify-center overflow-hidden">
                          <img src={profile.avatar} alt={profile.name} className="h-28 w-28 rounded-full object-cover" />
                        </div>
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#27ae60] text-white text-xs font-bold px-3 py-0.5 rounded-full border-2 border-white shadow">#OPENTOWORK</span>
                      </div>
                      <button className="absolute bottom-2 right-2 p-2 bg-white dark:bg-gray-900 rounded-full shadow border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"><PencilIcon className="h-4 w-4 text-gray-600 dark:text-gray-200" /></button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">{profile.name}</h1>
                      <span className="text-sm text-gray-500 dark:text-gray-300 font-semibold">{profile.pronouns}</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-200 mt-1 text-base font-medium leading-snug">{profile.headline}</div>
                    <div className="flex flex-wrap gap-4 mt-2 items-center text-sm text-gray-600 dark:text-gray-300">
                      <span>{profile.location}</span>
                      <a href="#" className="text-[#0a66c2] hover:underline">Contact info</a>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold text-[#0a66c2]">{profile.connections}+ connections</span>
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      <button className="bg-[#0a66c2] text-white rounded-full px-5 py-2 font-semibold hover:bg-[#004182] text-sm">Open to</button>
                      <button className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-full px-5 py-2 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">Add profile section</button>
                      <button className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-full px-5 py-2 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">Enhance profile</button>
                      <button className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-full px-5 py-2 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 text-sm">Resources</button>
                    </div>
                  </div>
                </div>
                {/* Company and Education */}
                <div className="flex gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <img src={profile.company.logo} alt={profile.company.name} className="h-6 w-6 rounded" />
                    <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">{profile.company.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={profile.education.logo} alt={profile.education.name} className="h-6 w-6 rounded" />
                    <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">{profile.education.name}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Open to work box */}
            <div className="bg-[#eaf3fc] dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mt-4 p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">Open to work</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{profile.openTo}</div>
                <a href="#" className="text-[#0a66c2] hover:underline text-sm">Show details</a>
              </div>
              <button className="p-2 text-gray-400 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-100"><PencilIcon className="h-5 w-5" /></button>
            </div>
            {/* Hiring box */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mt-4 p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">Share that you're hiring and attract qualified candidates.</div>
                <a href="#" className="text-[#0a66c2] hover:underline text-sm">Get started</a>
              </div>
              <button className="p-2 text-gray-400 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-100"><XMarkIcon className="h-5 w-5" /></button>
            </div>

            {/* About Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mt-4 p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">About</h2>
                {editSection !== 'about' && (
                  <button onClick={() => setEditSection('about')} aria-label="Edit About">
                    <PencilIcon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                  </button>
                )}
              </div>
              {editSection === 'about' ? (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    updateProfile({ about: aboutInput })
                    setEditSection(null)
                  }}
                  className="mt-2"
                >
                  <textarea
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100"
                    value={aboutInput}
                    onChange={e => setAboutInput(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="bg-[#0a66c2] text-white px-4 py-1 rounded">Save</button>
                    <button type="button" className="px-4 py-1 rounded border" onClick={() => { setEditSection(null); setAboutInput(storeProfile?.about || '') }}>Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="mt-2 text-gray-700 dark:text-gray-200 whitespace-pre-line">{storeProfile?.about || <span className="italic text-gray-400">No about info yet.</span>}</div>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mt-4 p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Experience</h2>
                {editSection !== 'experience' && (
                  <button onClick={() => setEditSection('experience')} aria-label="Edit Experience">
                    <PencilIcon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                  </button>
                )}
              </div>
              {editSection === 'experience' ? (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    updateProfile({ experience: experienceInput })
                    setEditSection(null)
                  }}
                  className="mt-2 space-y-4"
                >
                  {experienceInput && experienceInput.length > 0 ? experienceInput.map((exp, idx) => (
                    <div key={exp.id || idx} className="border rounded p-3 mb-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <input
                        className="w-full border-b border-gray-200 dark:border-gray-700 mb-1 px-1 py-0.5 text-sm font-semibold dark:bg-gray-900 dark:text-gray-100"
                        value={exp.title}
                        onChange={e => {
                          const updated = [...experienceInput]
                          updated[idx].title = e.target.value
                          setExperienceInput(updated)
                        }}
                        placeholder="Title"
                      />
                      <input
                        className="w-full border-b border-gray-200 dark:border-gray-700 mb-1 px-1 py-0.5 text-sm dark:bg-gray-900 dark:text-gray-100"
                        value={exp.company}
                        onChange={e => {
                          const updated = [...experienceInput]
                          updated[idx].company = e.target.value
                          setExperienceInput(updated)
                        }}
                        placeholder="Company"
                      />
                      <input
                        className="w-full border-b border-gray-200 dark:border-gray-700 mb-1 px-1 py-0.5 text-sm dark:bg-gray-900 dark:text-gray-100"
                        value={exp.location}
                        onChange={e => {
                          const updated = [...experienceInput]
                          updated[idx].location = e.target.value
                          setExperienceInput(updated)
                        }}
                        placeholder="Location"
                      />
                      <input
                        className="w-full border-b border-gray-200 dark:border-gray-700 mb-1 px-1 py-0.5 text-sm dark:bg-gray-900 dark:text-gray-100"
                        value={exp.startDate}
                        onChange={e => {
                          const updated = [...experienceInput]
                          updated[idx].startDate = e.target.value
                          setExperienceInput(updated)
                        }}
                        placeholder="Start Date"
                      />
                      <input
                        className="w-full border-b border-gray-200 dark:border-gray-700 mb-1 px-1 py-0.5 text-sm dark:bg-gray-900 dark:text-gray-100"
                        value={exp.endDate}
                        onChange={e => {
                          const updated = [...experienceInput]
                          updated[idx].endDate = e.target.value
                          setExperienceInput(updated)
                        }}
                        placeholder="End Date"
                      />
                      <textarea
                        className="w-full border border-gray-200 dark:border-gray-700 rounded px-1 py-0.5 text-sm mt-1 dark:bg-gray-900 dark:text-gray-100"
                        value={exp.description}
                        onChange={e => {
                          const updated = [...experienceInput]
                          updated[idx].description = e.target.value
                          setExperienceInput(updated)
                        }}
                        placeholder="Description"
                        rows={2}
                      />
                      <button type="button" className="text-xs text-red-500 mt-1" onClick={() => {
                        setExperienceInput(experienceInput.filter((_, i) => i !== idx))
                      }}>Remove</button>
                    </div>
                  )) : <div className="italic text-gray-400">No experience yet.</div>}
                  <button type="button" className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded text-sm dark:text-gray-100" onClick={() => setExperienceInput([...(experienceInput || []), { id: Date.now(), title: '', company: '', location: '', startDate: '', endDate: '', description: '' }])}>Add Experience</button>
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="bg-[#0a66c2] text-white px-4 py-1 rounded">Save</button>
                    <button type="button" className="px-4 py-1 rounded border" onClick={() => { setEditSection(null); setExperienceInput(storeProfile?.experience ? [...storeProfile.experience] : []) }}>Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="mt-2 space-y-3">
                  {storeProfile?.experience && storeProfile.experience.length > 0 ? storeProfile.experience.map((exp, idx) => (
                    <div key={exp.id || idx} className="border rounded p-3 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{exp.title}</div>
                      <div className="text-sm text-gray-700 dark:text-gray-200">{exp.company} &middot; {exp.location}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">{exp.startDate} - {exp.endDate}</div>
                      <div className="text-sm mt-1 text-gray-800 dark:text-gray-100">{exp.description}</div>
                    </div>
                  )) : <div className="italic text-gray-400">No experience yet.</div>}
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mt-4 p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Education</h2>
                {editSection !== 'education' && (
                  <button onClick={() => setEditSection('education')} aria-label="Edit Education">
                    <PencilIcon className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                  </button>
                )}
              </div>
              {editSection === 'education' ? (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    updateProfile({ education: educationInput })
                    setEditSection(null)
                  }}
                  className="mt-2 space-y-4"
                >
                  {educationInput && educationInput.length > 0 ? educationInput.map((edu, idx) => (
                    <div key={edu.id || idx} className="border rounded p-3 mb-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <input
                        className="w-full border-b border-gray-200 dark:border-gray-700 mb-1 px-1 py-0.5 text-sm font-semibold dark:bg-gray-900 dark:text-gray-100"
                        value={edu.school}
                        onChange={e => {
                          const updated = [...educationInput]
                          updated[idx].school = e.target.value
                          setEducationInput(updated)
                        }}
                        placeholder="School"
                      />
                      <input
                        className="w-full border-b border-gray-200 dark:border-gray-700 mb-1 px-1 py-0.5 text-sm dark:bg-gray-900 dark:text-gray-100"
                        value={edu.degree}
                        onChange={e => {
                          const updated = [...educationInput]
                          updated[idx].degree = e.target.value
                          setEducationInput(updated)
                        }}
                        placeholder="Degree"
                      />
                      <input
                        className="w-full border-b border-gray-200 dark:border-gray-700 mb-1 px-1 py-0.5 text-sm dark:bg-gray-900 dark:text-gray-100"
                        value={edu.field}
                        onChange={e => {
                          const updated = [...educationInput]
                          updated[idx].field = e.target.value
                          setEducationInput(updated)
                        }}
                        placeholder="Field of Study"
                      />
                      <input
                        className="w-full border-b border-gray-200 dark:border-gray-700 mb-1 px-1 py-0.5 text-sm dark:bg-gray-900 dark:text-gray-100"
                        value={edu.startDate}
                        onChange={e => {
                          const updated = [...educationInput]
                          updated[idx].startDate = e.target.value
                          setEducationInput(updated)
                        }}
                        placeholder="Start Date"
                      />
                      <input
                        className="w-full border-b border-gray-200 dark:border-gray-700 mb-1 px-1 py-0.5 text-sm dark:bg-gray-900 dark:text-gray-100"
                        value={edu.endDate}
                        onChange={e => {
                          const updated = [...educationInput]
                          updated[idx].endDate = e.target.value
                          setEducationInput(updated)
                        }}
                        placeholder="End Date"
                      />
                      <button type="button" className="text-xs text-red-500 mt-1" onClick={() => {
                        setEducationInput(educationInput.filter((_, i) => i !== idx))
                      }}>Remove</button>
                    </div>
                  )) : <div className="italic text-gray-400">No education yet.</div>}
                  <button type="button" className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded text-sm dark:text-gray-100" onClick={() => setEducationInput([...(educationInput || []), { id: Date.now(), school: '', degree: '', field: '', startDate: '', endDate: '' }])}>Add Education</button>
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="bg-[#0a66c2] text-white px-4 py-1 rounded">Save</button>
                    <button type="button" className="px-4 py-1 rounded border" onClick={() => { setEditSection(null); setEducationInput(storeProfile?.education ? [...storeProfile.education] : []) }}>Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="mt-2 space-y-3">
                  {storeProfile?.education && storeProfile.education.length > 0 ? storeProfile.education.map((edu, idx) => (
                    <div key={edu.id || idx} className="border rounded p-3 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{edu.school}</div>
                      <div className="text-sm text-gray-700 dark:text-gray-200">{edu.degree} &middot; {edu.field}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">{edu.startDate} - {edu.endDate}</div>
                    </div>
                  )) : <div className="italic text-gray-400">No education yet.</div>}
                </div>
              )}
            </div>

            {/* Recent Activities & Connections Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Recent Activities */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Recent Activities</h2>
                <ul className="space-y-3">
                  {recentActivities.map(activity => (
                    <li key={activity.id} className="flex items-center gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#0a66c2]" />
                      <span className="text-gray-700 dark:text-gray-200 text-sm flex-1">{activity.text}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-300">{activity.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Recent Connections */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Recent Connections</h2>
                <ul className="space-y-3">
                  {recentConnections.map(conn => (
                    <li key={conn.id} className="flex items-center gap-3">
                      <img src={conn.avatar} alt={conn.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{conn.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-300">{conn.title}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="w-full xl:w-[320px] hidden xl:flex flex-col gap-4 mt-4 xl:mt-0">
            {/* Profile language & URL */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Profile language</span>
                <button className="p-1 text-gray-400 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-100"><PencilIcon className="h-4 w-4" /></button>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200">{profile.language}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Public profile & URL</span>
                <button className="p-1 text-gray-400 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-100"><PencilIcon className="h-4 w-4" /></button>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-200">{profile.publicUrl}</div>
            </div>
            {/* Premium Ad */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-2 text-right w-full">Ad</div>
              <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover mb-2" />
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Siddik, reactivate your Premium free trial today!</div>
              <button className="mt-2 px-4 py-2 bg-[#0a66c2] text-white rounded-full text-sm font-semibold hover:bg-[#004182]">Reactivate Trial</button>
              <div className="text-xs text-gray-500 mt-2 text-center">Unlock your full potential with LinkedIn Premium</div>
            </div>
            {/* Who your viewers also viewed */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-1"><EyeIcon className="h-4 w-4" /> Who your viewers also viewed <span className="text-xs text-gray-500">Private to you</span></div>
              <div className="flex items-center gap-2 mt-2">
                {profile.viewers.map(v => (
                  <img key={v.name} src={v.avatar} alt={v.name} className="w-8 h-8 rounded-full" />
                ))}
                <span className="text-sm text-gray-700 dark:text-gray-200">Abhishek C H · 2nd</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  )
} 