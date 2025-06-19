# Learning Platform

A comprehensive learning platform for students to access courses, internships, and connect with peers.

## Features

- **Authentication System**
  - Email/password authentication
  - Google OAuth integration
  - Email verification
  - Password reset functionality

- **Course Management**
  - Course listing and details
  - Course enrollment
  - Progress tracking
  - Reviews and ratings

- **Internship Platform**
  - Internship listings
  - Application system
  - Status tracking
  - Company profiles

- **Social Features**
  - User profiles
  - Posts and comments
  - Following system
  - Messaging system

- **Progress Tracking**
  - Streak tracking
  - Leaderboards
  - Achievements
  - Weekly statistics

- **Admin Dashboard**
  - User management
  - Content moderation
  - Analytics
  - Course and internship management

## Tech Stack

- **Frontend**
  - Next.js 14
  - React 18
  - Tailwind CSS
  - Framer Motion
  - Apollo Client

- **Backend**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL
  - NextAuth.js
  - GraphQL

- **Email**
  - Nodemailer
  - SMTP

## Prerequisites

- Node.js 18+
- PostgreSQL
- SMTP server (for email functionality)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/learning_platform"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# SMTP
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@example.com"
SMTP_PASSWORD="your-password"
SMTP_FROM="noreply@example.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/learning-platform.git
   cd learning-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- Run database migrations:
  ```bash
  npx prisma migrate dev
  ```

- Generate Prisma client:
  ```bash
  npx prisma generate
  ```

- View database with Prisma Studio:
  ```bash
  npx prisma studio
  ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
