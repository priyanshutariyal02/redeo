# Redeo - Video Sharing Platform

A modern, full-stack video sharing platform built with Next.js, featuring user authentication, video uploads, and a beautiful responsive interface. Redeo allows users to discover, upload, and share videos in a TikTok-like experience.

## Features

### Core Functionality

- **Video Upload & Sharing**: Upload videos with custom titles and descriptions
- **Video Feed**: Browse and watch videos from the community
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Notifications**: User-friendly feedback for all actions

### Authentication & Security

- **NextAuth.js Integration**: Secure authentication with JWT tokens
- **Password Hashing**: Bcrypt encryption for user passwords
- **Protected Routes**: Secure access to user-specific features
- **Session Management**: Persistent user sessions

### 📱 User Experience

- **Modern UI/UX**: Clean, intuitive interface with Tailwind CSS
- **Loading States**: Smooth loading animations and progress indicators
- **Form Validation**: Real-time validation with helpful error messages
- **Responsive Layout**: Optimized for desktop, tablet, and mobile

### 🛠 Technical Features

- **ImageKit Integration**: Cloud video storage and CDN
- **MongoDB Database**: Scalable data storage with Mongoose ODM
- **TypeScript**: Full type safety throughout the application
- **API Routes**: RESTful API endpoints for data management

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Lucide React** - Icon library
- **React Hook Form** - Form management

### Backend

- **Next.js API Routes** - Server-side API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **NextAuth.js** - Authentication solution
- **Bcryptjs** - Password hashing

### External Services

- **ImageKit** - Video storage and CDN
- **Vercel** - Deployment platform (recommended)

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **ImageKit** account for video storage

## 🛠 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/reel-pro.git
cd reel-pro
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# ImageKit (for video uploads)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### 4. Database Setup

Make sure your MongoDB database is running and accessible. The application will automatically create the necessary collections when you first run it.

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

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
│   │   └── db.ts             # Database connection
│   └── models/               # MongoDB models
│       ├── User.ts           # User model
│       └── Video.ts          # Video model
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## Key Features Explained

### Video Upload System

- **File Upload**: Drag-and-drop video upload with progress tracking
- **ImageKit Integration**: Automatic video processing and CDN delivery
- **Form Validation**: Real-time validation for title and description
- **Thumbnail Generation**: Automatic thumbnail creation from uploaded videos

### Authentication System

- **User Registration**: Secure account creation with password hashing
- **User Login**: JWT-based authentication with session management
- **Protected Routes**: Secure access to user-specific features
- **Session Persistence**: Automatic login state management

### Video Feed

- **Infinite Scroll**: Smooth video browsing experience
- **Video Player**: Custom video player with controls
- **User Information**: Display creator details for each video
- **Loading States**: Beautiful loading animations

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Next.js** team for the amazing framework
- **Vercel** for hosting and deployment
- **ImageKit** for video storage solutions
- **Tailwind CSS** for the beautiful styling system
