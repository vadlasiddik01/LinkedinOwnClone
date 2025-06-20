import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // User State
      user: null,
      setUser: (user) => set({ user }),
      updateUserProfile: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      })),

      // Authentication State
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Posts State
      posts: [],
      setPosts: (posts) => set({ posts }),
      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts]
      })),
      likePost: (postId) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                likes: post.likes + 1,
                isLiked: true
              }
            : post
        )
      })),
      unlikePost: (postId) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                likes: post.likes - 1,
                isLiked: false
              }
            : post
        )
      })),
      commentOnPost: (postId, comment) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                comments: [...post.comments, comment]
              }
            : post
        )
      })),
      sharePost: (postId) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                shares: post.shares + 1
              }
            : post
        )
      })),
      savePost: (postId) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                isSaved: true
              }
            : post
        )
      })),
      unsavePost: (postId) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === postId
            ? {
                ...post,
                isSaved: false
              }
            : post
        )
      })),

      // Network State
      connections: [],
      pendingInvitations: [],
      sentInvitations: [],
      setConnections: (connections) => set({ connections }),
      setPendingInvitations: (invitations) => set({ pendingInvitations: invitations }),
      setSentInvitations: (invitations) => set({ sentInvitations: invitations }),
      acceptInvitation: (id) => set((state) => {
        const invitation = state.pendingInvitations.find(inv => inv.id === id)
        return {
          pendingInvitations: state.pendingInvitations.filter(inv => inv.id !== id),
          connections: invitation ? [...state.connections, invitation] : state.connections
        }
      }),
      declineInvitation: (id) => set((state) => ({
        pendingInvitations: state.pendingInvitations.filter(inv => inv.id !== id)
      })),
      sendInvitation: (user) => set((state) => ({
        sentInvitations: [...state.sentInvitations, { ...user, sentDate: new Date().toISOString(), status: 'Pending' }]
      })),

      // Jobs State
      jobs: [],
      savedJobs: [],
      setJobs: (jobs) => set({ jobs }),
      setSavedJobs: (jobs) => set({ savedJobs: jobs }),
      saveJob: (job) => set((state) => ({
        savedJobs: [...state.savedJobs, job]
      })),
      unsaveJob: (jobId) => set((state) => ({
        savedJobs: state.savedJobs.filter(job => job.id !== jobId)
      })),
      applyToJob: (jobId) => set((state) => ({
        jobs: state.jobs.map(job =>
          job.id === jobId
            ? {
                ...job,
                hasApplied: true,
                applicants: job.applicants + 1
              }
            : job
        )
      })),

      // Messages State
      conversations: [],
      setConversations: (conversations) => set({ conversations }),
      sendMessage: (conversationId, message) => set((state) => ({
        conversations: state.conversations.map(conv =>
          conv.id === conversationId
            ? {
                ...conv,
                messages: [
                  ...(conv.messages || []),
                  {
                    id: Date.now(),
                    text: message,
                    timestamp: new Date().toISOString(),
                    isSent: true,
                    isRead: false
                  }
                ],
                lastMessage: {
                  text: message,
                  timestamp: new Date().toISOString(),
                  isRead: false
                }
              }
            : conv
        )
      })),
      markMessageAsRead: (conversationId, messageId) => set((state) => ({
        conversations: state.conversations.map(conv =>
          conv.id === conversationId
            ? {
                ...conv,
                messages: conv.messages?.map(msg =>
                  msg.id === messageId
                    ? { ...msg, isRead: true }
                    : msg
                ),
                unreadCount: Math.max(0, (conv.unreadCount || 0) - 1)
              }
            : conv
        )
      })),

      // Notifications State
      notifications: [],
      unreadNotifications: 0,
      setNotifications: (notifications) => set({ notifications }),
      addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadNotifications: state.unreadNotifications + 1
      })),
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(notif =>
          notif.id === id
            ? { ...notif, read: true }
            : notif
        ),
        unreadNotifications: Math.max(0, state.unreadNotifications - 1)
      })),
      clearNotifications: () => set({ notifications: [], unreadNotifications: 0 }),

      // UI State
      isMobile: false,
      showNotifications: false,
      showProfileMenu: false,
      setIsMobile: (value) => set({ isMobile: value }),
      setShowNotifications: (value) => set({ showNotifications: value }),
      setShowProfileMenu: (value) => set({ showProfileMenu: value }),

      // Global Post Input Trigger
      showGlobalPostInput: false,
      setShowGlobalPostInput: (value) => set({ showGlobalPostInput: value }),

      // Feed State
      feedFilters: {
        sortBy: 'recent',
        contentType: 'all',
        timeRange: 'all'
      },
      setFeedFilters: (filters) => set({ feedFilters: filters }),

      // Profile State
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates }
      })),
      profileViews: 0,
      setProfileViews: (views) => set({ profileViews: views }),
      incrementProfileViews: () => set((state) => ({
        profileViews: state.profileViews + 1
      })),

      // Search State
      searchHistory: [],
      addSearchHistory: (query) => set((state) => ({
        searchHistory: [query, ...state.searchHistory.slice(0, 9)]
      })),
      clearSearchHistory: () => set({ searchHistory: [] }),

      // Settings State
      settings: {
        emailNotifications: true,
        pushNotifications: true,
        darkMode: false,
        language: 'en',
        privacy: {
          profileVisibility: 'public',
          showConnections: true,
          showActivity: true
        }
      },
      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      }))
    }),
    {
      name: 'linkedin-clone-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        settings: state.settings,
        savedJobs: state.savedJobs,
        searchHistory: state.searchHistory
      })
    }
  )
)

export default useStore 