# Reel Pro - Video Sharing Platform

A modern, full-stack video sharing platform built with Next.js 15, featuring user authentication, video uploads, and a beautiful responsive interface. Reel Pro allows users to discover, upload, and share videos in a TikTok-like experience.

## Features

### Core Functionality

- **Video Upload & Sharing**: Upload videos with custom titles and descriptions
- **Video Feed**: Browse and watch videos from the community
- **User Authentication**: Secure login and registration system with Google OAuth
- **Responsive Design**: Beautiful UI that works on all devices
- **Profile Management**: Update profile pictures and user information

### Authentication & Security

- **NextAuth.js Integration**: Secure authentication with JWT tokens
- **Google OAuth**: One-click sign-in with Google accounts
- **Password Hashing**: Bcrypt encryption for user passwords
- **Protected Routes**: Secure access to user-specific features
- **Session Management**: Persistent user sessions with automatic redirects

### User Experience

- **Modern UI/UX**: Clean, intuitive interface with Tailwind CSS
- **Loading States**: Smooth loading animations and progress indicators
- **Form Validation**: Real-time validation with helpful error messages
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Drag & Drop Upload**: Easy file upload with progress tracking

### Technical Features

- **ImageKit Integration**: Cloud video and image storage with CDN
- **MongoDB Database**: Scalable data storage with Mongoose ODM
- **TypeScript**: Full type safety throughout the application
- **API Routes**: RESTful API endpoints for data management
- **Middleware Protection**: Route-based authentication with Next.js middleware

## Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, DaisyUI, Lucide React, React Hook Form  
**Backend:** Next.js API Routes, MongoDB, Mongoose, NextAuth.js, Bcryptjs  
**External Services:** ImageKit (video/image storage), Google OAuth, Vercel (deployment)

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** database (local or cloud)
- **ImageKit** account
- **Google Cloud Console** project (for OAuth)

## Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/reel-pro.git
   cd reel-pro
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # ImageKit (for uploads)
   NEXT_PUBLIC_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   NEXT_PUBLIC_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. **Google OAuth Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

5. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
reel-pro/
├── src/
│   ├── middleware.ts              # Next.js middleware for route protection
│   ├── app/                       # Next.js App Router
│   │   ├── api/                   # API routes
│   │   │   ├── auth/              # Authentication endpoints
│   │   │   │   ├── [...nextauth]/ # NextAuth.js configuration
│   │   │   │   ├── imagekit-auth/ # ImageKit authentication
│   │   │   │   ├── profile-picture/ # Profile picture updates
│   │   │   │   └── register/      # User registration
│   │   │   └── videos/            # Video management endpoints
│   │   ├── components/            # Reusable React components
│   │   │   ├── file-upload.tsx    # File upload component
│   │   │   ├── header.tsx         # Navigation header
│   │   │   ├── notification.tsx   # Toast notifications
│   │   │   ├── profile-picture-upload.tsx # Profile picture upload
│   │   │   ├── providers.tsx      # Context providers
│   │   │   ├── video-component.tsx # Video player component
│   │   │   ├── video-feed.tsx     # Video feed display
│   │   │   └── video-upload-form.tsx # Video upload form
│   │   ├── login/                 # Login page
│   │   ├── register/              # Registration page
│   │   ├── upload/                # Video upload page
│   │   ├── profile/               # User profile page
│   │   └── page.tsx               # Home page
│   ├── lib/                       # Utility libraries
│   │   ├── api-client.ts          # API client functions
│   │   ├── authOptions.ts         # NextAuth configuration
│   │   └── db.ts                  # Database connection
│   └── models/                    # MongoDB models
│       ├── User.ts                # User model
│       └── Video.ts               # Video model
├── public/                        # Static assets
└── package.json                   # Dependencies and scripts
```

## Key Features Explained

### Authentication Flow
- **Google OAuth**: One-click sign-in with Google accounts
- **Email/Password**: Traditional registration and login
- **Session Management**: Automatic session persistence and route protection
- **Profile Updates**: Update profile pictures and user information

### File Upload System
- **Drag & Drop**: Intuitive file upload interface
- **Progress Tracking**: Real-time upload progress indicators
- **File Validation**: Type and size validation for videos and images
- **Cloud Storage**: Secure storage with ImageKit CDN

### Route Protection
- **Middleware**: Next.js middleware protects routes based on authentication
- **Public Routes**: Home page, login, and register accessible to everyone
- **Protected Routes**: Profile and upload pages require authentication
- **Automatic Redirects**: Seamless navigation based on auth status

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production
Make sure to update your environment variables for production:
- `NEXTAUTH_URL` should be your production domain
- `GOOGLE_CLIENT_SECRET` should not have trailing characters
- Add production redirect URIs in Google Cloud Console

## Recent Updates

- ✅ **Fixed Google OAuth**: Resolved duplicate username issues
- ✅ **Improved Middleware**: Better route protection and redirect logic
- ✅ **TypeScript Fixes**: Resolved type compatibility issues
- ✅ **Production Ready**: Cleaned up debug code and error handling
- ✅ **Profile Picture Upload**: Fixed type compatibility with ImageKit