# LinkedIn Own Clone(not copied from yt videos/Github codes, didmy own) – Frontend

A modern, responsive, full-featured LinkedIn-like social platform built with **Next.js**, **React**, **Framer-motion**, **Tailwind CSS**, and **Zustand** for state management. This README documents every feature, page, component, and technology used in the frontend.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Core Features](#core-features)
  - [Authentication & User Management](#authentication--user-management)
  - [Main Layout & Navigation](#main-layout--navigation)
  - [Theme & Dark Mode](#theme--dark-mode)
  - [Responsiveness](#responsiveness)
  - [Home Feed](#home-feed)
  - [Post Creation & Media Upload](#post-creation--media-upload)
  - [Profile Page](#profile-page)
  - [Network (Connections)](#network-connections)
  - [Jobs](#jobs)
  - [Messaging & Chat](#messaging--chat)
  - [Notifications](#notifications)
  - [Groups](#groups)
  - [Events](#events)
  - [Premium](#premium)
  - [Settings](#settings)
  - [Search](#search)
  - [Companies & Courses](#companies--courses)
  - [Admin](#admin)
- [Reusable Components](#reusable-components)
- [State Management](#state-management)
- [Styling & Theming](#styling--theming)
- [Accessibility](#accessibility)
- [Assets & Static Files](#assets--static-files)
- [Development & Linting](#development--linting)
- [Extending the App](#extending-the-app)

---

## Tech Stack

- **Next.js 14** – App router, SSR, file-based routing
- **React 18** – UI library
- **Tailwind CSS 3** – Utility-first CSS, dark mode, responsive design
- **Zustand** – Global state management
- **@heroicons/react** – Icon set
- **@headlessui/react** – Accessible UI primitives
- **Framer Motion** – Animations
- **react-hot-toast** – Toast notifications
- **NextAuth.js** – (Planned) Authentication
- **PostCSS** – CSS processing
- **ESLint** – Linting and code quality

---

## Project Structure

```
src/
  app/
    [page directories]/
    layout.js         # Main layout, theme context, navigation
    globals.css       # Tailwind base, custom styles
  components/
    layout/
      MainLayout.js   # Layout, navigation, theme, mobile nav
      Navigation.js   # Sidebar navigation (for admin, etc.)
    MessagingDropdown.js # Floating messaging widget
    providers.js      # (For context providers)
  store/
    index.js          # Zustand store for all global state
public/
  images/
    avatars/          # User avatars
    company-logos/    # Company logos
    groups/           # Group images
    posts/            # Post images
    promoted/         # Promoted/ad images
  *.svg               # SVG icons
```

---

## Core Features

### Authentication & User Management

- **Signup, Signin, Forgot/Reset Password, Email Verification**: All flows are present with mock API endpoints and pages.
- **User State**: Managed in Zustand (`user`, `isAuthenticated`, `login`, `logout`, etc.).
- **Profile State**: Editable profile sections (About, Experience, Education, Skills, Certifications) with inline editing and state persistence.

### Main Layout & Navigation

- **MainLayout**: Provides navigation bar, mobile nav, theme context, and wraps all pages.
- **Navigation**: Sidebar navigation for admin and desktop layouts.
- **Mobile Navigation**: Fixed bottom bar for mobile, with icons for Home, Network, Post, Notifications, Jobs.
- **MessagingDropdown**: Floating widget for quick access to recent messages.

### Theme & Dark Mode

- **Theme Switcher**: Toggle between light/dark mode in the header.
- **ThemeContext**: Propagates theme state to all pages/components.
- **Persistence**: Theme is saved in `localStorage` and applied on load.
- **Tailwind**: Uses `darkMode: 'class'` and extensive `dark:` classes for all UI.

### Responsiveness

- **Mobile-First**: All pages and components use Tailwind responsive classes.
- **Adaptive Layouts**: Sidebars, cards, and navigation adapt to screen size.
- **Touch-Friendly**: Buttons, inputs, and menus are sized for touch.

### Home Feed

- **Feed**: Displays posts (text, job, media, articles) with likes, comments, shares.
- **Sample Posts**: Mock data for initial posts.
- **Real-Time Search**: Search bar filters posts as you type.
- **Post Interactions**: Like, comment, share, repost, send, save.
- **News & Ads**: Sidebars show trending news, puzzles, and premium ads.

### Post Creation & Media Upload

- **Create Post**: Modal and dedicated page for creating posts.
- **Media Upload**: Supports photo, video, and document uploads with previews.
- **Article Posting**: Write and post articles.
- **Audience Picker**: Choose post visibility (public, connections).
- **Drag & Drop**: (Planned) for file uploads.

### Profile Page

- **Profile Header**: Cover photo, avatar, name, pronouns, headline, location, company, education.
- **Editable Sections**: About, Experience, Education, Skills, Certifications – toggle between view and edit modes.
- **Open to Work**: Display and edit open-to-work status.
- **Recent Activities**: Static list of recent posts, comments, likes, connections.
- **Recent Connections**: List of new connections with avatars and titles.
- **Profile Language & URL**: Editable in sidebar.
- **Premium Ad**: Sidebar promo for premium.
- **Viewers**: "Who your viewers also viewed" section.

### Network (Connections)

- **Suggestions**: "People you may know" with mutual connections, avatars, and connect/dismiss actions.
- **Tabs**: Suggestions, Pending, Sent, Connections.
- **Search & Filters**: Real-time search and filter by degree, industry, location.
- **Modern Card Design**: Spacious, visually appealing cards with responsive design.

### Jobs

- **Job Listings**: List of jobs with company, location, type, applicants, save/apply actions.
- **Search & Filters**: Search jobs, filter by date, experience, type, location, company.
- **Recent Searches**: List and clear recent job searches.
- **Job Actions**: Save, apply, withdraw, dismiss jobs.

### Messaging & Chat

- **Messaging Page**: List of conversations, chat area, message input, emoji picker, attachments.
- **MessagingDropdown**: Floating widget for quick access.
- **Search Users**: Real-time user search for new messages.
- **Conversation Actions**: Archive, mute, block, report, delete.
- **Starred Chats**: Mark conversations as starred.
- **Responsive**: Adapts to mobile and desktop layouts.

### Notifications

- **Notification List**: All, Jobs, My Posts, Mentions tabs.
- **Notification Actions**: Mark as read, delete.
- **Premium Modal**: Promo for premium notifications.
- **Notification Dropdown**: In header, shows unread count and recent notifications.

### Groups

- **Group Listings**: List of groups with join/bookmark/share actions.
- **Search & Filters**: Real-time search and filter by category, privacy, activity, size.
- **Create Group**: Modal to create new groups.
- **Trending & Recent Activity**: Displayed for each group.

### Events

- **Event Listings**: List of events with details.
- **Search & Filters**: Real-time search and filter.
- **Create Event**: Button to create new events.

### Premium

- **Premium Page**: Promo, user avatar, goals selection, continue flow.
- **Premium Ads**: Shown in sidebars across the app.

### Settings

- **Sidebar Navigation**: Account, Security, Visibility, Privacy, Ads, Notifications.
- **Editable Settings**: Name, language, content language, autoplay, sound, notification preferences.
- **Dark Mode Toggle**: In display settings.
- **Premium Promo**: Sidebar ad.

### Search

- **Global Search**: Search for people, companies, jobs, and more.
- **Filters**: Type, location, industry, experience.
- **Tabs**: All, People, Companies, Jobs.
- **Result Actions**: Connect, message, follow, apply, save.

### Companies & Courses

- **Company Pages**: Company info, jobs, updates, employees, follow/save/connect actions.
- **Courses**: (Planned) Course listings and details.

### Admin

- **Admin Center**: (Planned) Manage billing and account details.

---

## Reusable Components

- **MainLayout**: Provides navigation, theme, and layout for all pages.
- **Navigation**: Sidebar navigation for admin and desktop.
- **MessagingDropdown**: Floating messaging widget.
- **Buttons, Inputs, Cards**: Styled with Tailwind and custom classes.
- **Modals & Dropdowns**: For post creation, messaging, notifications, etc.

---

## State Management

- **Zustand Store** (`src/store/index.js`):
  - User/auth state
  - Posts/feed state
  - Messaging/conversations
  - Notifications
  - Profile (with editing/updating)
  - Search history
  - Settings (including dark mode)
  - UI state (mobile, menus, etc.)

---

## Styling & Theming

- **Tailwind CSS**: Utility classes for all styling.
- **Custom Colors**: LinkedIn blue, backgrounds, etc.
- **Dark Mode**: `darkMode: 'class'` in Tailwind config, with `dark:` classes everywhere.
- **Custom Classes**: For buttons, cards, inputs, etc. in `globals.css`.

---

## Accessibility

- **Keyboard Navigation**: Focus styles, ARIA labels on navigation and menus.
- **Screen Reader Support**: Proper roles and labels on nav, menus, and buttons.
- **Color Contrast**: Designed for accessibility in both light and dark modes.

---

## Assets & Static Files

- **Avatars**: `public/images/avatars/`
- **Company Logos**: `public/images/company-logos/`
- **Group Images**: `public/images/groups/`
- **Post Images**: `public/images/posts/`
- **SVG Icons**: In `public/`
- **Promoted/Ad Images**: `public/images/promoted/`

---

## Development & Linting

- **ESLint**: Configured for Next.js and React best practices.
- **PostCSS**: For Tailwind and autoprefixing.
- **Scripts**: `dev`, `build`, `start`, `lint` in `package.json`.
- **jsconfig.json**: For absolute imports.

---

## Extending the App

- **Backend Integration**: Ready for Next.js API routes and Prisma.
- **NextAuth.js**: (Planned) for real authentication.
- **More Features**: Easily add new pages, components, and state slices.
- **Custom Themes**: Extend Tailwind config for more themes.

---

## Cross-Check: All Features Included

- [x] Authentication (signup, signin, forgot/reset password, email verification)
- [x] User/profile state, editing, and persistence
- [x] Main layout, navigation, mobile nav, sidebar
- [x] Theme switcher, dark mode, theme context, persistence
- [x] Responsive design (mobile, tablet, desktop)
- [x] Home feed, sample posts, real-time search/filter, post interactions
- [x] Post creation (text, photo, video, article), media upload, previews
- [x] Profile page (editable sections, recent activities, connections, viewers)
- [x] Network (connections, suggestions, search, filters, card design)
- [x] Jobs (listings, search, filters, save/apply, recent searches)
- [x] Messaging (conversations, chat, search users, star/archive/mute/block/report/delete)
- [x] Notifications (list, dropdown, mark as read/delete, premium modal)
- [x] Groups (list, search, filters, join/bookmark/share, create group)
- [x] Events (list, search, filters, create event)
- [x] Premium (promo, goals, continue, ads)
- [x] Settings (sidebar, editable, dark mode, premium ad)
- [x] Search (global, filters, tabs, actions)
- [x] Companies & courses (company info, jobs, updates, employees)
- [x] Reusable components (layout, navigation, dropdowns, modals)
- [x] Zustand state management (all slices)
- [x] Tailwind styling, custom classes, accessibility
- [x] Static assets (avatars, logos, images, SVGs)
- [x] Linting, PostCSS, scripts, config
