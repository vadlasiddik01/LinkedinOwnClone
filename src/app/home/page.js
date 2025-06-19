'use client'
import MainLayout from '../../components/layout/MainLayout'
import { useState, useContext } from 'react'
import {
  UserIcon,
  EyeIcon,
  ChartBarIcon,
  BookmarkIcon,
  UsersIcon,
  NewspaperIcon,
  CalendarIcon,
  VideoCameraIcon,
  PhotoIcon,
  DocumentTextIcon,
  PlusIcon,
  GlobeAltIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { ThemeContext } from '@/components/layout/MainLayout'

export default function HomePage() {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  // Mock data
  const profile = {
    name: 'Siddik Vadla',
    title: 'Intern @YashikYadav&Co | No-Code/Low-Code Automation Expe...',
    location: 'Kurnool Rural, Andhra Pradesh',
    company: 'Yashik Yadav & Co',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    coverPhoto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    viewers: 94,
    impressions: 154
  }
  const news = [
    { title: 'TVS teams up with Kadam Mobility', readers: '18,209', time: '5h ago' },
    { title: 'White House seeks trade offers', readers: '17,657', time: '3h ago' },
    { title: 'Udaan raises $114 million', readers: '394', time: '7h ago' },
    { title: 'Law firms expand their focus', readers: '182', time: '7h ago' },
    { title: 'IT on an acquisition spree', readers: '153', time: '7h ago' }
  ]
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Jyoti Bhasin',
        title: 'Community Manager @Get Sponsored Job',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      content: 'Bik is hiring for Software Engineer - I\nExperience: 0 - 1 year\nExpected Salary: 8-16 LPA',
      job: {
        title: 'Software Engineer - I',
        company: 'Bik',
        location: 'Bengaluru, Karnataka, India (On-site)'
      },
      likes: 4,
      liked: false,
      comments: [],
      showComment: false
    },
    {
      id: 2,
      user: {
        name: 'Amit Sharma',
        title: 'Full Stack Developer @Tech Solutions',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
      },
      content: 'Excited to share that I have started a new position at Tech Solutions! Looking forward to new challenges.',
      likes: 10,
      liked: false,
      comments: [
        { user: { name: 'Priya Singh', avatar: 'https://randomuser.me/api/portraits/women/46.jpg' }, text: 'Congratulations Amit!' }
      ],
      showComment: false
    },
    {
      id: 3,
      user: {
        name: 'Sara Lee',
        title: 'UI/UX Designer @Creative Minds',
        avatar: 'https://randomuser.me/api/portraits/women/47.jpg'
      },
      content: 'Check out my latest Dribbble shot! Feedback appreciated. #design #uiux',
      likes: 7,
      liked: false,
      comments: [],
      showComment: false
    }
  ])
  const [showPostInput, setShowPostInput] = useState(false)
  const [newPostContent, setNewPostContent] = useState('')
  const [commentInputs, setCommentInputs] = useState({})
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [reposted, setReposted] = useState({})
  const [sent, setSent] = useState({})
  const [videoFile, setVideoFile] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [articleContent, setArticleContent] = useState('')

  const handlePost = () => {
    if (!newPostContent.trim()) return
    setPosts(prevPosts => [
      {
        id: Date.now(),
        user: profile,
        content: newPostContent,
        likes: 0,
        liked: false,
        comments: [],
        showComment: false
      },
      ...prevPosts
    ])
    setNewPostContent('')
    setShowPostInput(false)
  }

  const handleLike = (id) => {
    setPosts(posts => posts.map(post => post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post))
  }

  const handleToggleComment = (id) => {
    setPosts(posts => posts.map(post => post.id === id ? { ...post, showComment: !post.showComment } : post))
  }

  const handleAddComment = (id) => {
    if (!commentInputs[id]?.trim()) return
    setPosts(posts => posts.map(post => post.id === id ? { ...post, comments: [...post.comments, { user: profile, text: commentInputs[id] }] } : post))
    setCommentInputs(inputs => ({ ...inputs, [id]: '' }))
  }

  const handleViewJob = (post) => {
    if (post.job) router.push('/jobs')
  }

  const handleSavedItems = () => router.push('/saved')
  const handlePremium = () => router.push('/premium')

  
  const handleEvents = () => router.push('/events')

  const handleProfile = () => router.push('/profile')

  const handleAnalytics = () => router.push('/analytics')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) router.push('/search?query=' + encodeURIComponent(searchQuery))
  }

  const handleRepost = (id) => setReposted(prev => ({ ...prev, [id]: true }))

  const handleSend = (id) => setSent(prev => ({ ...prev, [id]: true }))

  // Filter posts based on search query
  const filteredPosts = searchQuery.trim()
    ? posts.filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts

  // Helper to get preview URL
  const getPreviewUrl = (file) => file ? URL.createObjectURL(file) : null

  // Video post handler
  const handleVideoPost = () => {
    if (!videoFile) return
    setPosts(prevPosts => [
      {
        id: Date.now(),
        user: profile,
        content: '',
        video: getPreviewUrl(videoFile),
        likes: 0,
        liked: false,
        comments: [],
        showComment: false
      },
      ...prevPosts
    ])
    setShowVideoModal(false)
    setVideoFile(null)
  }
  // Photo post handler
  const handlePhotoPost = () => {
    if (!photoFile) return
    setPosts(prevPosts => [
      {
        id: Date.now(),
        user: profile,
        content: '',
        photo: getPreviewUrl(photoFile),
        likes: 0,
        liked: false,
        comments: [],
        showComment: false
      },
      ...prevPosts
    ])
    setShowPhotoModal(false)
    setPhotoFile(null)
  }
  // Article post handler
  const handleArticlePost = () => {
    if (!articleContent.trim()) return
    setPosts(prevPosts => [
      {
        id: Date.now(),
        user: profile,
        content: articleContent,
        likes: 0,
        liked: false,
        comments: [],
        showComment: false,
        isArticle: true
      },
      ...prevPosts
    ])
    setShowArticleModal(false)
    setArticleContent('')
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef] dark:bg-gray-900 flex flex-col lg:flex-row justify-center">
        {/* Container */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 px-2 sm:px-4 md:px-6 lg:px-8 mt-6">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[300px] hidden lg:block flex-shrink-0 mb-4 lg:mb-0">
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 dark:text-gray-100 overflow-hidden mb-4 cursor-pointer" onClick={handleProfile}>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 relative">
                <img src={profile.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                <img src={profile.avatar} alt={profile.name} className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white" />
              </div>
              <div className="pt-10 pb-4 px-4 text-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{profile.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{profile.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{profile.location}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{profile.company}</p>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-2 text-sm">
                <div className="flex justify-between py-1 cursor-pointer" onClick={handleAnalytics}>
                  <span className="text-gray-500 dark:text-gray-400">Profile viewers</span>
                  <span className="text-[#0a66c2] font-semibold">{profile.viewers}</span>
                </div>
                <div className="flex justify-between py-1 cursor-pointer" onClick={handleAnalytics}>
                  <span className="text-gray-500 dark:text-gray-400">Post impressions</span>
                  <span className="text-[#0a66c2] font-semibold">{profile.impressions}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-3">
                <button onClick={handlePremium} className="w-full flex items-center justify-center gap-2 text-[#915907] font-semibold bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded py-1 text-sm hover:bg-yellow-100 dark:hover:bg-yellow-800">
                  <StarIcon className="h-4 w-4" /> Try Premium for ₹0
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 space-y-3 dark:text-gray-100">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 py-1" onClick={handleSavedItems}>
                <BookmarkIcon className="h-5 w-5" /> Saved items
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 py-1">
                <UsersIcon className="h-5 w-5" /> Groups
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 py-1" onClick={handleEvents}>
                <CalendarIcon className="h-5 w-5" /> Events
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <main className="flex-1 w-full max-w-2xl mx-auto space-y-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] dark:bg-gray-800 dark:text-gray-100"
                placeholder="Search for people, jobs, posts..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </form>
            {/* Post creation */}
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 mb-2 dark:text-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <img src={profile.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
                <button
                  className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-left text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                  onClick={() => setShowPostInput(true)}
                >Start a post</button>
              </div>
              {showPostInput && (
                <div className="flex flex-col gap-2 mt-2">
                  <textarea
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-[#0a66c2] focus:border-[#0a66c2] dark:bg-gray-800 dark:text-gray-100"
                    rows={3}
                    value={newPostContent}
                    onChange={e => setNewPostContent(e.target.value)}
                    placeholder="What do you want to talk about?"
                  />
                  <div className="flex justify-end gap-2">
                    <button className="px-4 py-1 rounded text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100" onClick={() => setShowPostInput(false)}>Cancel</button>
                    <button className="px-4 py-1 rounded bg-[#0a66c2] text-white font-semibold hover:bg-[#004182]" onClick={handlePost}>Post</button>
                  </div>
                </div>
              )}
              <div className="flex justify-between mt-2">
                <button className="flex items-center gap-1 text-gray-600 dark:text-gray-200 hover:text-[#0a66c2] text-sm font-medium" onClick={() => setShowVideoModal(true)}>
                  <VideoCameraIcon className="h-5 w-5" /> Video
                </button>
                <button className="flex items-center gap-1 text-gray-600 dark:text-gray-200 hover:text-[#0a66c2] text-sm font-medium" onClick={() => setShowPhotoModal(true)}>
                  <PhotoIcon className="h-5 w-5" /> Photo
                </button>
                <button className="flex items-center gap-1 text-gray-600 dark:text-gray-200 hover:text-[#0a66c2] text-sm font-medium" onClick={() => setShowArticleModal(true)}>
                  <DocumentTextIcon className="h-5 w-5" /> Write article
                </button>
              </div>
              {/* Modals for posting */}
              {showVideoModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                    <h2 className="text-lg font-semibold mb-2">Post a Video</h2>
                    <input type="file" accept="video/*" className="mb-4" onChange={e => setVideoFile(e.target.files[0])} />
                    {videoFile && <video src={getPreviewUrl(videoFile)} controls className="w-full mb-2 rounded" />}
                    <div className="flex justify-end gap-2">
                      <button className="px-4 py-1 rounded text-gray-500 hover:text-gray-700" onClick={() => { setShowVideoModal(false); setVideoFile(null) }}>Cancel</button>
                      <button className="px-4 py-1 rounded bg-[#0a66c2] text-white font-semibold hover:bg-[#004182]" onClick={handleVideoPost}>Post</button>
                    </div>
                  </div>
                </div>
              )}
              {showPhotoModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                    <h2 className="text-lg font-semibold mb-2">Post a Photo</h2>
                    <input type="file" accept="image/*" className="mb-4" onChange={e => setPhotoFile(e.target.files[0])} />
                    {photoFile && <img src={getPreviewUrl(photoFile)} alt="Preview" className="w-full mb-2 rounded" />}
                    <div className="flex justify-end gap-2">
                      <button className="px-4 py-1 rounded text-gray-500 hover:text-gray-700" onClick={() => { setShowPhotoModal(false); setPhotoFile(null) }}>Cancel</button>
                      <button className="px-4 py-1 rounded bg-[#0a66c2] text-white font-semibold hover:bg-[#004182]" onClick={handlePhotoPost}>Post</button>
                    </div>
                  </div>
                </div>
              )}
              {showArticleModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                    <h2 className="text-lg font-semibold mb-2">Write an Article</h2>
                    <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4" rows={4} placeholder="Write your article..." value={articleContent} onChange={e => setArticleContent(e.target.value)} />
                    <div className="flex justify-end gap-2">
                      <button className="px-4 py-1 rounded text-gray-500 hover:text-gray-700" onClick={() => { setShowArticleModal(false); setArticleContent('') }}>Cancel</button>
                      <button className="px-4 py-1 rounded bg-[#0a66c2] text-white font-semibold hover:bg-[#004182]" onClick={handleArticlePost}>Post</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Feed posts */}
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 dark:text-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{post.user.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{post.user.title}</div>
                  </div>
                </div>
                <div className="text-gray-800 dark:text-gray-200 whitespace-pre-line mb-2">{post.content}</div>
                {post.job && (
                  <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-900 flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{post.job.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">Job by {post.job.company}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">{post.job.location}</div>
                    </div>
                    <button className="bg-[#0a66c2] text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-[#004182]">View job</button>
                  </div>
                )}
                {post.video && <video src={post.video} controls className="w-full rounded mb-2" />}
                {post.photo && <img src={post.photo} alt="Post" className="w-full rounded mb-2" />}
                {post.isArticle && <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Article</div>}
                <div className="flex gap-6 mt-2 text-gray-500 dark:text-gray-300 text-sm">
                  <button onClick={() => handleLike(post.id)} className={`flex items-center space-x-1 ${post.liked ? 'text-[#0a66c2]' : 'hover:text-gray-700 dark:hover:text-gray-100'}`}>
                    <StarIcon className="h-5 w-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button onClick={() => handleToggleComment(post.id)} className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-100">
                    💬 <span>Comment</span>
                  </button>
                  <button className={`flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-100 ${reposted[post.id] ? 'text-[#0a66c2]' : ''}`} onClick={() => handleRepost(post.id)}>
                    🔁 <span>{reposted[post.id] ? 'Reposted' : 'Repost'}</span>
                  </button>
                  <button className={`flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-100 ${sent[post.id] ? 'text-[#0a66c2]' : ''}`} onClick={() => handleSend(post.id)}>
                    ✉️ <span>{sent[post.id] ? 'Sent' : 'Send'}</span>
                  </button>
                </div>
                {/* Comments */}
                {post.showComment && (
                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <img src={profile.avatar} alt="Your avatar" className="h-8 w-8 rounded-full" />
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="w-full border-0 focus:ring-0 text-sm dark:bg-gray-800 dark:text-gray-100"
                          value={commentInputs[post.id] || ''}
                          onChange={e => setCommentInputs(inputs => ({ ...inputs, [post.id]: e.target.value }))}
                          onKeyDown={e => { if (e.key === 'Enter') handleAddComment(post.id) }}
                        />
                      </div>
                      <button className="p-2 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-100" onClick={() => handleAddComment(post.id)}>
                        <StarIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-2 space-y-2">
                      {post.comments.map((c, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <img src={c.user.avatar} alt={c.user.name} className="h-7 w-7 rounded-full" />
                          <div className="bg-gray-100 dark:bg-gray-700 rounded px-3 py-1 text-sm text-gray-900 dark:text-gray-100">{c.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {filteredPosts.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-300">No results found.</div>
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="w-full xl:w-[320px] hidden xl:block flex-shrink-0 mt-4 xl:mt-0">
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 mb-4 dark:text-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">LinkedIn News</h2>
              <ul className="space-y-2">
                {news.map((item, idx) => (
                  <li key={idx} className="text-sm">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{item.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{item.time} • {item.readers} readers</div>
                  </li>
                ))}
              </ul>
              <button className="text-[#0a66c2] text-sm mt-2 hover:underline">Show more</button>
            </div>
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 mb-4 dark:text-gray-100">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">Today's puzzle</h2>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-2xl">🧩</div>
                <div>
                  <div className="text-sm font-medium">Zip - a quick brain teaser</div>
                  <div className="text-xs text-gray-500 dark:text-gray-300">Solve in 60s or less!</div>
                  <div className="text-xs text-gray-400 dark:text-gray-400">Score is private to you</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm border border-gray-200 p-4 text-center dark:text-gray-100">
              <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">Ad</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Premium subscribers are 2.6x more likely to get hired</div>
              <button onClick={handlePremium} className="mt-2 px-4 py-1 bg-[#0a66c2] text-white rounded-full text-sm font-semibold hover:bg-[#004182]">Try Premium</button>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  )
} 