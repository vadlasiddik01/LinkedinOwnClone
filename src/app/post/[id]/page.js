'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  FaceSmileIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

export default function PostDetailPage({ params }) {
  // Initial post data (could be fetched in real app)
  const initialPost = {
    id: params.id,
    author: {
      name: 'John Doe',
      title: 'Software Engineer at TechCorp',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    content: `Just completed an amazing project using React and Node.js! The team did an incredible job, and I'm proud of what we've accomplished. Here are some key features we implemented:

• Real-time data synchronization
• Advanced search functionality
• Responsive design
• Performance optimizations

Looking forward to sharing more details in the coming weeks! #webdevelopment #react #nodejs`,
    image: '/images/posts/project.jpg',
    timestamp: '2 hours ago',
    likes: 245,
    liked: false,
    saved: false,
    shared: false,
    shares: 245,
    comments: [
      {
        id: 1,
        author: {
          name: 'Sarah Johnson',
          title: 'Senior Developer at InnovateTech',
          avatar: '/images/avatars/sarah.jpg'
        },
        content: 'This looks fantastic! Would love to hear more about the performance optimizations you implemented.',
        timestamp: '1 hour ago',
        likes: 12
      },
      {
        id: 2,
        author: {
          name: 'Mike Chen',
          title: 'Tech Lead at DevCorp',
          avatar: '/images/avatars/mike.jpg'
        },
        content: 'Great work! The real-time sync feature is particularly impressive. What technologies did you use for that?',
        timestamp: '45 minutes ago',
        likes: 8
      }
    ]
  }

  // State for post interactivity
  const [post, setPost] = useState(initialPost)
  const [comment, setComment] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  // Like post
  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1
    }))
  }

  // Save post
  const handleSave = () => {
    setPost(prev => ({
      ...prev,
      saved: !prev.saved
    }))
  }

  // Share post
  const handleShare = () => {
    setPost(prev => ({
      ...prev,
      shared: !prev.shared,
      shares: prev.shared ? prev.shares - 1 : prev.shares + 1
    }))
  }

  // Add comment
  const handleComment = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      setPost(prev => ({
        ...prev,
        comments: [
          ...prev.comments,
          {
            id: Date.now(),
            author: {
              name: 'You',
              title: 'Member',
              avatar: '/images/avatars/current-user.jpg'
            },
            content: comment,
            timestamp: 'Just now',
            likes: 0
          }
        ]
      }))
      setComment('')
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f3f2ef] py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Post */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Author Info */}
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-gray-900">
                    {post.author.name}
                  </h2>
                  <p className="text-sm text-gray-500">{post.author.title}</p>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
              <p className="text-gray-900 whitespace-pre-line">{post.content}</p>
              {post.image && (
                <div className="mt-4">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Post Stats */}
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    <img
                      src="/images/avatars/user1.jpg"
                      alt="User"
                      className="h-5 w-5 rounded-full border-2 border-white"
                    />
                    <img
                      src="/images/avatars/user2.jpg"
                      alt="User"
                      className="h-5 w-5 rounded-full border-2 border-white"
                    />
                  </div>
                  <span>{post.likes} likes</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>{post.comments.length} comments</span>
                  <span>{post.shares} shares</span>
                </div>
              </div>
            </div>

            {/* Post Actions */}
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    post.liked
                      ? 'text-[#0a66c2] hover:bg-blue-50'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  onClick={handleLike}
                >
                  {post.liked ? (
                    <HeartIconSolid className="h-5 w-5" />
                  ) : (
                    <HeartIcon className="h-5 w-5" />
                  )}
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-500 hover:bg-gray-50">
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                  <span>Comment</span>
                </button>
                <button
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    post.shared ? 'text-[#0a66c2] hover:bg-blue-50' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  onClick={handleShare}
                >
                  <ShareIcon className="h-5 w-5" />
                  <span>Share</span>
                </button>
                <button
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    post.saved ? 'text-[#0a66c2] hover:bg-blue-50' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  onClick={handleSave}
                >
                  <BookmarkIcon className="h-5 w-5" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-200">
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Comments
                </h3>
                <div className="space-y-4">
                  {post.comments.map(commentObj => (
                    <div key={commentObj.id} className="flex space-x-3">
                      <img
                        src={commentObj.author.avatar}
                        alt={commentObj.author.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {commentObj.author.name}
                          </h4>
                          <p className="text-sm text-gray-900 mt-1">
                            {commentObj.content}
                          </p>
                        </div>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <button className="hover:text-gray-900">Like</button>
                          <button className="hover:text-gray-900">Reply</button>
                          <span>{commentObj.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <form onSubmit={handleComment} className="mt-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src="/images/avatars/current-user.jpg"
                      alt="You"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          >
                            <FaceSmileIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <PhotoIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="submit"
                            className="text-[#0a66c2] hover:text-[#004182]"
                          >
                            <PaperAirplaneIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 