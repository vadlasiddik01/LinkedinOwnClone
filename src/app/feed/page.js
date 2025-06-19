'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  PhotoIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  CalendarIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  LinkIcon,
  FaceSmileIcon,
  PaperClipIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'

export default function FeedPage() {
  const [postContent, setPostContent] = useState('')
  const [showPostForm, setShowPostForm] = useState(false)
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Alex Thompson',
        title: 'Senior Product Manager',
        company: 'TechCorp',
        avatar: '/images/avatars/alex.jpg'
      },
      content: 'Just published a new article about building scalable React applications. Check it out!',
      timestamp: '2 hours ago',
      likes: 45,
      comments: [
        { id: 1, author: 'Maria Garcia', text: 'Great article!' }
      ],
      shares: 5,
      liked: false,
      saved: false,
      showComment: false,
      commentInput: ''
    },
    {
      id: 2,
      author: {
        name: 'Maria Garcia',
        title: 'UX Designer',
        company: 'DesignCo',
        avatar: '/images/avatars/maria.jpg'
      },
      content: 'Excited to share our latest design system update! We\'ve improved accessibility and added new components.',
      timestamp: '5 hours ago',
      likes: 89,
      comments: [],
      shares: 15,
      liked: true,
      saved: true,
      showComment: false,
      commentInput: ''
    },
    {
      id: 3,
      author: {
        name: 'David Kim',
        title: 'Software Engineer',
        company: 'Innovate Inc',
        avatar: '/images/avatars/david.jpg'
      },
      content: 'Looking for a senior frontend developer to join our team. Must have experience with React and TypeScript.',
      timestamp: '1 day ago',
      likes: 34,
      comments: [],
      shares: 3,
      liked: false,
      saved: false,
      showComment: false,
      commentInput: ''
    }
  ])

  const trendingTopics = [
    {
      id: 1,
      title: 'Artificial Intelligence',
      posts: 12500,
      trending: true
    },
    {
      id: 2,
      title: 'Remote Work',
      posts: 8500,
      trending: true
    },
    {
      id: 3,
      title: 'Web Development',
      posts: 6200,
      trending: false
    }
  ]

  const handleLike = (postId) => {
    setPosts(posts => posts.map(post => post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post))
  }

  const handleSave = (postId) => {
    setPosts(posts => posts.map(post => post.id === postId ? { ...post, saved: !post.saved } : post))
  }

  const handleShare = (postId) => {
    setPosts(posts => posts.map(post => post.id === postId ? { ...post, shares: post.shares + 1 } : post))
  }

  const handleToggleComment = (postId) => {
    setPosts(posts => posts.map(post => post.id === postId ? { ...post, showComment: !post.showComment } : post))
  }

  const handleCommentInput = (postId, value) => {
    setPosts(posts => posts.map(post => post.id === postId ? { ...post, commentInput: value } : post))
  }

  const handleAddComment = (postId) => {
    setPosts(posts => posts.map(post => {
      if (post.id === postId && post.commentInput.trim()) {
        return {
          ...post,
          comments: [...post.comments, { id: Date.now(), author: 'You', text: post.commentInput }],
          commentInput: ''
        }
      }
      return post
    }))
  }

  const handlePost = (e) => {
    e.preventDefault()
    if (postContent.trim()) {
      setPosts([
        {
          id: Date.now(),
          author: {
            name: 'You',
            title: 'Member',
            company: '',
            avatar: '/images/avatars/john.jpg'
          },
          content: postContent,
          timestamp: 'Just now',
          likes: 0,
          comments: [],
          shares: 0,
          liked: false,
          saved: false,
          showComment: false,
          commentInput: ''
        },
        ...posts
      ])
      setPostContent('')
      setShowPostForm(false)
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Create Post */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center space-x-4">
              <img
                src="/images/avatars/john.jpg"
                alt="Your avatar"
                className="h-10 w-10 rounded-full"
              />
              <button
                className="flex-1 text-left text-gray-500 hover:bg-gray-50 rounded-full px-4 py-2 border border-gray-300"
                onClick={() => setShowPostForm(true)}
              >
                Start a post
              </button>
            </div>

            {showPostForm && (
              <form onSubmit={handlePost} className="mt-4">
                <textarea
                  className="w-full border-0 focus:ring-0 resize-none"
                  rows="4"
                  placeholder="What do you want to talk about?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="flex items-center text-gray-500 hover:text-gray-700"
                    >
                      <PhotoIcon className="h-6 w-6 mr-1" />
                      Photo
                    </button>
                    <button
                      type="button"
                      className="flex items-center text-gray-500 hover:text-gray-700"
                    >
                      <VideoCameraIcon className="h-6 w-6 mr-1" />
                      Video
                    </button>
                    <button
                      type="button"
                      className="flex items-center text-gray-500 hover:text-gray-700"
                    >
                      <DocumentTextIcon className="h-6 w-6 mr-1" />
                      Document
                    </button>
                    <button
                      type="button"
                      className="flex items-center text-gray-500 hover:text-gray-700"
                    >
                      <CalendarIcon className="h-6 w-6 mr-1" />
                      Event
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0a66c2] text-white rounded-full hover:bg-[#004182]"
                    disabled={!postContent.trim()}
                  >
                    Post
                  </button>
                </div>
              </form>
            )}

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <PhotoIcon className="h-6 w-6 mr-1" />
                Photo
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <VideoCameraIcon className="h-6 w-6 mr-1" />
                Video
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <DocumentTextIcon className="h-6 w-6 mr-1" />
                Document
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <CalendarIcon className="h-6 w-6 mr-1" />
                Event
              </button>
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Trending Topics
            </h2>
            <div className="space-y-4">
              {trendingTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {topic.posts.toLocaleString()} posts
                    </p>
                  </div>
                  {topic.trending && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Trending
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {post.author.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {post.author.title} at {post.author.company}
                          </p>
                          <p className="text-xs text-gray-500">
                            {post.timestamp}
                          </p>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-500">
                          <EllipsisHorizontalIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="mt-2 text-gray-600">{post.content}</p>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-2 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <button
                      className={`flex items-center space-x-1 ${
                        post.liked ? 'text-[#0a66c2]' : 'hover:text-gray-700'
                      }`}
                      onClick={() => handleLike(post.id)}
                    >
                      <StarIcon className="h-5 w-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      className="flex items-center space-x-1 hover:text-gray-700"
                      onClick={() => handleToggleComment(post.id)}
                    >
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                      <span>{post.comments.length}</span>
                    </button>
                    <button
                      className="flex items-center space-x-1 hover:text-gray-700"
                      onClick={() => handleShare(post.id)}
                    >
                      <ShareIcon className="h-5 w-5" />
                      <span>{post.shares}</span>
                    </button>
                    <button
                      className={`flex items-center space-x-1 ${
                        post.saved ? 'text-[#0a66c2]' : 'hover:text-gray-700'
                      }`}
                      onClick={() => handleSave(post.id)}
                    >
                      <BookmarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Comments */}
                {post.showComment && (
                  <div className="px-4 py-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/images/avatars/john.jpg"
                        alt="Your avatar"
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="w-full border-0 focus:ring-0 text-sm"
                          value={post.commentInput}
                          onChange={(e) => handleCommentInput(post.id, e.target.value)}
                        />
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-500" onClick={() => handleAddComment(post.id)}>
                        <FaceSmileIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <PaperClipIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-[#0a66c2] hover:text-[#004182]">
                        <PaperAirplaneIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 