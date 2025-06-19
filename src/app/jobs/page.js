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

const savedJob = {
  title: 'Frontend Engineer - Bangalore',
  company: 'Oleria',
  location: 'Bengaluru (On-site)',
  logo: 'https://media.licdn.com/dms/image/C560BAQFQw7Qw7Qw7Qw/company-logo_100_100/0/1631360000000?e=2147483647&v=beta&t=logo',
}

const jobs = [
  {
    id: 1,
    title: 'Java Full Stack Developer',
    company: 'Tata Consultancy Services',
    location: 'Bengaluru, Karnataka, India (On-site)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_Consultancy_Services_Logo.svg',
    activelyReviewing: true,
    promoted: true,
    easyApply: true
  },
  {
    id: 2,
    title: 'AWS Java Full Stack (React)',
    company: 'Accolite',
    location: 'Bengaluru, Karnataka, India (Hybrid)',
    logo: 'https://media.licdn.com/dms/image/C560BAQFQw7Qw7Qw7Qw/company-logo_100_100/0/1631360000000?e=2147483647&v=beta&t=logo',
    activelyReviewing: true,
    promoted: true,
    easyApply: true
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'Synechron',
    location: 'Bengaluru, Karnataka, India (Hybrid)',
    logo: 'https://media.licdn.com/dms/image/C560BAQFQw7Qw7Qw7Qw/company-logo_100_100/0/1631360000000?e=2147483647&v=beta&t=logo',
    activelyReviewing: true,
    promoted: true,
    easyApply: true
  }
]

const recentSearches = [
  { term: 'frontend developer', count: 278, location: 'Bengaluru, Karnataka, India' }
]

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
        <div className="w-full max-w-7xl flex gap-6 px-2 md:px-4 lg:px-8">
          {/* Left Sidebar */}
          <aside className="w-[320px] hidden lg:block flex-shrink-0 space-y-4">
            {/* Saved Job */}
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-3">
                <img src={savedJob.logo} alt="logo" className="w-12 h-12 rounded bg-gray-100 object-contain" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">{savedJob.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">{savedJob.company}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">{savedJob.location}</div>
                </div>
              </div>
              <button className="w-full mt-2 bg-[#0a66c2] text-white rounded-full py-2 font-semibold flex items-center justify-center gap-2 hover:bg-[#004182]">
                Apply <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </button>
            </div>
            {/* Preferences & My Jobs */}
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
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-2xl mx-auto space-y-6">
            {/* Top job picks */}
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">Top job picks for you</div>
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-4">Based on your profile, preferences, and activity like applies, searches, and saves</div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {displayedJobs.map(job => (
                  <div key={job.id} className="flex items-start py-4 relative">
                    <img src={job.company.logo} alt="logo" className="w-12 h-12 rounded bg-gray-100 object-contain mr-4" />
                    <div className="flex-1 min-w-0">
                      <a href="#" className="font-semibold text-[#0a66c2] hover:underline text-base flex items-center gap-1">{job.title}</a>
                      <div className="text-sm text-gray-700 dark:text-gray-200">{job.company.name} · {job.location}</div>
                      {job.activelyReviewing && (
                        <div className="flex items-center gap-1 text-xs text-green-700 mt-1">
                          <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                          Actively reviewing applicants
                        </div>
                      )}
                      <div className="flex gap-2 mt-1">
                        {job.promoted && <span className="text-xs text-gray-500 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded px-2">Promoted</span>}
                        {job.easyApply && <span className="text-xs text-[#0a66c2] border border-[#0a66c2] rounded px-2">Easy Apply</span>}
                      </div>
                    </div>
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-100" onClick={() => handleDismissJob(job.id)}>
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                    <button className="absolute top-2 right-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-100" onClick={() => handleSaveJob(job.id)}>
                      <BookmarkIcon className={`h-5 w-5 ${job.isSaved ? 'text-[#0a66c2]' : ''}`} />
                    </button>
                    {job.hasApplied ? (
                      <button className="absolute top-2 right-20 text-gray-400 hover:text-gray-600 dark:hover:text-gray-100" onClick={() => handleWithdraw(job.id)}>
                        Withdraw
                      </button>
                    ) : (
                      <button className="absolute top-2 right-20 text-gray-400 hover:text-gray-600 dark:hover:text-gray-100" onClick={() => handleApply(job.id)}>
                        Apply
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-2">
                <button onClick={toggleShowAllJobs} className="text-[#0a66c2] hover:underline font-medium">
                  {showAllJobs ? 'Show less' : 'Show all &rarr;'}
                </button>
              </div>
            </div>

            {/* Recent job searches */}
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-2">Recent job searches</div>
              {recentSearchesList.map((search, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-100 dark:border-gray-700">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{search.term}</span>
                    <span className="text-green-600 font-semibold ml-2">{search.count} new</span>
                    <div className="text-xs text-gray-500 dark:text-gray-300">Not On · {search.location}</div>
                  </div>
                  <button className="text-[#0a66c2] text-xs hover:underline" onClick={() => handleClearSearch(search.term)}>Clear</button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  )
} 