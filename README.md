# Reel Pro - Video Sharing Platform

A modern, full-stack video sharing platform built with Next.js, featuring user authentication, video uploads, and a beautiful responsive interface. Reel Pro allows users to discover, upload, and share videos in a TikTok-like experience.

## Features

### Core Functionality

- **Video Upload & Sharing**: Upload videos with custom titles and descriptions
- **Video Feed**: Browse and watch videos from the community
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Beautiful UI that works on all devices


### Authentication & Security

- **NextAuth.js Integration**: Secure authentication with JWT tokens
- **Password Hashing**: Bcrypt encryption for user passwords
- **Protected Routes**: Secure access to user-specific features
- **Session Management**: Persistent user sessions

### User Experience

- **Modern UI/UX**: Clean, intuitive interface with Tailwind CSS
- **Loading States**: Smooth loading animations and progress indicators
- **Form Validation**: Real-time validation with helpful error messages
- **Responsive Layout**: Optimized for desktop, tablet, and mobile

### Technical Features

- **ImageKit Integration**: Cloud video and image storage with CDN
- **MongoDB Database**: Scalable data storage with Mongoose ODM
- **TypeScript**: Full type safety throughout the application
- **API Routes**: RESTful API endpoints for data management

## Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, DaisyUI, Lucide React, React Hook Form  
**Backend:** Next.js API Routes, MongoDB, Mongoose, NextAuth.js, Bcryptjs  
**External Services:** ImageKit (video/image storage), Vercel (deployment)

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** database (local or cloud)
- **ImageKit** account

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

4. **Run the Development Server**
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
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   └── videos/        # Video management endpoints
│   │   ├── components/        # Reusable React components
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── upload/            # Video upload page
│   │   └── page.tsx           # Home page
│   ├── lib/                   # Utility libraries
│   │   ├── api-client.ts      # API client functions
│   │   ├── authOptions.ts     # NextAuth configuration
│   │   └── db.ts              # Database connection
│   └── models/                # MongoDB models
│       ├── User.ts            # User model
│       └── Video.ts           # Video model
├── public/                    # Static assets
└── package.json               # Dependencies and scripts
```

## Key Features Explained

- **File Upload**: Drag-and-drop video upload with progress tracking
- **ImageKit Integration**: Video and image storage with CDN delivery
- **Form Validation**: Real-time validation for title and description
- **Profile Pictures**: Users can upload profile images
- **User Registration & Login**: Secure account creation and authentication
- **Session Persistence**: Automatic login state management
- **Video Feed**: Browse and watch videos with creator info

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

Deploy easily to Vercel or any platform that supports Next.js.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT
