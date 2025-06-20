'use client'

import { useState, useEffect, useContext } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  MapPinIcon,
  EllipsisHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BookmarkIcon,
  ShareIcon,
  CheckIcon,
  XMarkIcon,
  SparklesIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'
import useStore from '@/store'
import { ThemeContext } from '@/components/layout/MainLayout'

const unsplashLogos = [
  'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=80&h=80&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=80&h=80&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=80&h=80&q=80',
  'https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?auto=format&fit=facearea&w=80&h=80&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=80&h=80&q=80',
]

const savedJob = {
  title: 'Frontend Engineer - Bangalore',
  company: 'Oleria',
  location: 'Bengaluru (On-site)',
  logo: unsplashLogos[0],
}

const jobs = [
  {
    id: 1,
    title: 'Java Full Stack Developer',
    company: 'Tata Consultancy Services',
    location: 'Bengaluru, Karnataka, India (On-site)',
    logo: unsplashLogos[1],
    activelyReviewing: true,
    promoted: true,
    easyApply: true
  },
  {
    id: 2,
    title: 'AWS Java Full Stack (React)',
    company: 'Accolite',
    location: 'Bengaluru, Karnataka, India (Hybrid)',
    logo: unsplashLogos[2],
    activelyReviewing: true,
    promoted: true,
    easyApply: true
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'Synechron',
    location: 'Bengaluru, Karnataka, India (Hybrid)',
    logo: unsplashLogos[3],
    activelyReviewing: true,
    promoted: true,
    easyApply: true
  }
]

const recentSearches = [
  { term: 'frontend developer', count: 278, location: 'Bengaluru, Karnataka, India' }
]

const getLogo = (job, idx) => {
  // Prefer job.logo, then job.company.logo, then fallback to unsplash
  if (job.logo) return job.logo;
  if (typeof job.company === 'object' && job.company.logo) return job.company.logo;
  return unsplashLogos[idx % unsplashLogos.length];
};

export default function JobsPage() {
  const { theme } = useContext(ThemeContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedFilters, setSelectedFilters] = useState({
    datePosted: 'any',
    experienceLevel: 'any',
    jobType: 'any',
    location: 'any',
    company: 'any'
  })
  const [expandedFilters, setExpandedFilters] = useState({
    datePosted: false,
    experienceLevel: false,
    jobType: false,
    location: false,
    company: false
  })
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [recentSearchesList, setRecentSearchesList] = useState(recentSearches);

  const {
    jobs: storeJobs,
    setJobs,
    saveJob,
    unsaveJob,
    applyToJob,
    withdrawApplication,
    searchJobs
  } = useStore()

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchJobs = async () => {
      // Simulate API call
      const mockJobs = [
        {
          id: 1,
          title: 'Senior Software Engineer',
          company: {
            name: 'Tech Solutions Inc.',
            logo: 'https://via.placeholder.com/48',
            location: 'San Francisco, CA'
          },
          location: 'Remote',
          type: 'Full-time',
          experience: 'Senior',
          salary: '$120,000 - $180,000',
          postedAt: '2 days ago',
          applicants: 45,
          description: 'We are looking for a Senior Software Engineer to join our team...',
          requirements: [
            '5+ years of experience in software development',
            'Strong knowledge of React, Node.js, and TypeScript',
            'Experience with cloud platforms (AWS, GCP)',
            'Excellent problem-solving skills'
          ],
          benefits: [
            'Competitive salary and equity',
            'Health, dental, and vision insurance',
            '401(k) matching',
            'Flexible work hours'
          ],
          isSaved: false,
          hasApplied: false,
          applicationOptions: [
            'Apply with LinkedIn',
            'Apply with Resume',
            'Apply with Cover Letter'
          ]
        },
        {
          id: 2,
          title: 'Product Manager',
          company: {
            name: 'Innovation Labs',
            logo: 'https://via.placeholder.com/48',
            location: 'New York, NY'
          },
          location: 'Hybrid',
          type: 'Full-time',
          experience: 'Mid-Senior',
          salary: '$100,000 - $150,000',
          postedAt: '1 week ago',
          applicants: 78,
          description: 'Join our product team to help shape the future of our platform...',
          requirements: [
            '3+ years of product management experience',
            'Strong analytical and problem-solving skills',
            'Experience with agile methodologies',
            'Excellent communication skills'
          ],
          benefits: [
            'Competitive salary',
            'Comprehensive benefits package',
            'Professional development budget',
            'Remote work options'
          ],
          isSaved: true,
          hasApplied: false,
          applicationOptions: [
            'Apply with LinkedIn',
            'Apply with Resume'
          ]
        }
      ]

      setJobs(mockJobs)
    }

    fetchJobs()
  }, [setJobs])

  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      const results = await searchJobs(query)
      // Update jobs with search results
      setJobs(results)
      // Add to recent searches if not already present
      if (!recentSearchesList.some(s => s.term === query)) {
        setRecentSearchesList([{ term: query, count: 0, location: 'Anywhere' }, ...recentSearchesList])
      }
    }
  }

  const handleFilterChange = (filter, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: value
    }))
  }

  const handleSaveJob = async (jobId) => {
    const job = storeJobs.find(j => j.id === jobId)
    if (job.isSaved) {
      await unsaveJob(jobId)
    } else {
      await saveJob(jobId)
    }
  }

  const handleApply = async (jobId) => {
    await applyToJob(jobId)
  }

  const handleWithdraw = async (jobId) => {
    await withdrawApplication(jobId)
  }

  const handleDismissJob = (jobId) => {
    setJobs(storeJobs.filter(job => job.id !== jobId))
  }

  const handleClearSearch = (term) => {
    setRecentSearchesList(recentSearchesList.filter(s => s.term !== term))
  }

  const toggleFilter = (filter) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }))
  }

  const toggleShowAllJobs = () => {
    setShowAllJobs(!showAllJobs)
  }

  const filteredJobs = storeJobs.filter(job => {
    return (!searchQuery || job.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
           (selectedFilters.datePosted === 'any' || job.postedAt === selectedFilters.datePosted) &&
           (selectedFilters.experienceLevel === 'any' || job.experience === selectedFilters.experienceLevel) &&
           (selectedFilters.jobType === 'any' || job.type === selectedFilters.jobType) &&
           (selectedFilters.location === 'any' || job.location === selectedFilters.location) &&
           (selectedFilters.company === 'any' || job.company.name === selectedFilters.company)
  })

  const displayedJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 3)

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef] dark:bg-gray-900 flex justify-center pt-6 pb-16">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-4 md:gap-6 px-1 sm:px-2 md:px-4 lg:px-8">
          {/* Sidebar for desktop, collapsible for mobile */}
          <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-4 mb-4 lg:mb-0">
            {/* Mobile: Collapsible section */}
            <div className="block lg:hidden">
              <details className="mb-2">
                <summary className="font-semibold text-base text-gray-900 dark:text-gray-100 py-2 px-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer">Saved Job & Preferences</summary>
                <div className="p-3 space-y-4">
                  {/* Saved Job */}
                  <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-3 flex flex-col items-start">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={savedJob.logo} alt="logo" className="w-10 h-10 rounded bg-gray-100 object-contain" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">{savedJob.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-300">{savedJob.company}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-300">{savedJob.location}</div>
                      </div>
                    </div>
                    <button className="w-full mt-2 bg-[#0a66c2] text-white rounded-full py-2 font-semibold flex items-center justify-center gap-2 hover:bg-[#004182] text-sm">Apply <ArrowTopRightOnSquareIcon className="h-4 w-4" /></button>
                  </div>
                  {/* Preferences & My Jobs */}
                  <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-3 space-y-3">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 py-1 text-sm">
                      <BriefcaseIcon className="h-5 w-5" /> Preferences
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 py-1 text-sm">
                      <BookmarkIcon className="h-5 w-5" /> My jobs
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 py-1 text-sm">
                      <ChartBarIcon className="h-5 w-5" /> My Career Insights
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                      <button className="flex items-center gap-2 text-[#0a66c2] font-semibold hover:underline text-sm">
                        <PlusIcon className="h-5 w-5" /> Post a free job
                      </button>
                    </div>
                  </div>
                </div>
              </details>
            </div>
            {/* Desktop sidebar */}
            <div className="hidden lg:block space-y-4">
              <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-3">
                  <img src={savedJob.logo} alt="logo" className="w-12 h-12 rounded-full object-cover shadow" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">{savedJob.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{savedJob.company}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{savedJob.location}</div>
                  </div>
                </div>
                <button className="w-full mt-2 bg-[#0a66c2] text-white rounded-full py-2 font-semibold flex items-center justify-center gap-2 hover:bg-[#004182]">Apply <ArrowTopRightOnSquareIcon className="h-4 w-4" /></button>
              </div>
              <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 space-y-3">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 py-1">
                  <BriefcaseIcon className="h-5 w-5" /> Preferences
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 py-1">
                  <BookmarkIcon className="h-5 w-5" /> My jobs
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 py-1">
                  <ChartBarIcon className="h-5 w-5" /> My Career Insights
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                  <button className="flex items-center gap-2 text-[#0a66c2] font-semibold hover:underline">
                    <PlusIcon className="h-5 w-5" /> Post a free job
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-2xl mx-auto space-y-6">
            {/* Top job picks */}
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4">
              <div className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">Top job picks for you</div>
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-4">Based on your profile, preferences, and activity like applies, searches, and saves</div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {displayedJobs.map((job, idx) => {
                  const companyName = typeof job.company === 'object' ? job.company.name : job.company;
                  const companyLogo = getLogo(job, idx);
                  return (
                    <div key={job.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-3 sm:gap-6">
                      {/* Logo */}
                      <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16">
                        <img src={companyLogo} alt="logo" className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover shadow border border-gray-200 dark:border-gray-700 bg-white" onError={e => { e.target.onerror = null; e.target.src = unsplashLogos[idx % unsplashLogos.length]; }} />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <a href="#" className="font-semibold text-[#0a66c2] hover:underline text-base flex items-center gap-1">{job.title}</a>
                            {/* Example badge: Verified */}
                            {job.verified && <span className="inline-block align-middle"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg></span>}
                          </div>
                          <div className="text-sm text-gray-700 dark:text-gray-200">{companyName} · {job.location}</div>
                          {/* Badges row */}
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            {job.viewed && <span className="text-xs text-gray-500 dark:text-gray-300">Viewed</span>}
                            {job.promoted && <span className="text-xs text-gray-500 dark:text-gray-300">Promoted</span>}
                            {job.activelyReviewing && (
                              <span className="flex items-center gap-1 text-xs text-green-700"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Actively reviewing applicants</span>
                            )}
                            {job.easyApply && <span className="flex items-center gap-1 text-xs text-[#0a66c2] bg-[#eaf1fb] px-2 py-0.5 rounded"><svg className="w-4 h-4 text-[#0a66c2]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-7 19c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"/></svg>Easy Apply</span>}
                          </div>
                        </div>
                      </div>
                      {/* Dismiss (X) icon */}
                      <button className="ml-auto mt-2 sm:mt-0 flex-shrink-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition" onClick={() => handleDismissJob(job.id)} aria-label="Dismiss">
                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end mt-2">
                <button onClick={toggleShowAllJobs} className="text-[#0a66c2] hover:underline font-medium">
                  {showAllJobs ? 'Show less' : 'Show all →'}
                </button>
              </div>
            </div>

            {/* Recent job searches */}
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4">
              <div className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-2">Recent job searches</div>
              <div className="flex flex-col gap-2">
                {recentSearchesList.map((search, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b last:border-b-0 border-gray-100 dark:border-gray-700">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{search.term}</span>
                      <span className="text-green-600 font-semibold ml-2">{search.count} new</span>
                      <div className="text-xs text-gray-500 dark:text-gray-300">Not On · {search.location}</div>
                    </div>
                    <button className="text-[#0a66c2] text-xs hover:underline mt-2 sm:mt-0" onClick={() => handleClearSearch(search.term)}>Clear</button>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  )
} 