# TravelSync

Find your perfect travel companions and create unforgettable journeys together.

## 🚀 Features

- **Smart Matching**: AI-powered algorithm to find compatible travel companions
- **Real-time Chat**: Connect with matches via WhatsApp integration
- **Group Travel**: Find or create travel groups for shared experiences
- **Secure Authentication**: Safe and secure user authentication
- **Professional Neon Design**: Modern dark theme with subtle neon accents
- **Responsive Design**: Beautiful UI that works on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom neon design system
- **Language**: TypeScript
- **State Management**: React Hooks
- **Authentication**: Custom auth system
- **Backend**: Go (separate service)

## 🎨 Design System

- **Professional Neon Theme**: Dark background with cyan (#00E4FF) and mint (#7CFFEA) accents
- **Rounded Header**: Frosted glass effect with subtle neon glow
- **Frosted Cards**: Translucent cards with backdrop blur
- **Smooth Animations**: GPU-accelerated transitions and hover effects
- **Accessible**: Full keyboard navigation and screen reader support

## 📁 Project Structure

```
travelsync/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   └── login/
│   ├── (main)/            # Main application routes
│   │   ├── home/          # Landing page
│   │   ├── create/        # Create ticket
│   │   ├── find/          # Find matches
│   │   └── ticket/        # Ticket management
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── shared/           # Shared components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
├── utils/                # Helper functions
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd travelsync
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. **Important**: Copy the hero image to the correct location:
```bash
# Copy your hero image to public/images/hero.png
# The image should be optimized for web use (recommended: 800x600px)
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design Features

### Professional Neon Theme
- **Dark Background**: Deep black (#0B0F12) with gradient overlays
- **Neon Accents**: Cyan (#00E4FF) and mint (#7CFFEA) for highlights
- **Frosted Glass**: Translucent cards with backdrop blur effects
- **Rounded Header**: Professional capsule design with subtle glow

### Component Highlights
- **Hero Section**: Large typography with neon text accents
- **Stats Cards**: Animated counters with neon left borders
- **Match Groups**: Three-tier matching system (Best Match, Best Group, Alternatives)
- **Interactive Forms**: Professional input styling with neon focus states
- **Profile Dropdown**: Accessible navigation with smooth animations

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## 🏗️ Architecture

### Rendering Strategy

- **SSR (Server-Side Rendering)**: Used for pages requiring current user data (tickets, matches)
- **SSG (Static Site Generation)**: Used for public content (home page)
- **CSR (Client-Side Rendering)**: Used for interactive forms and real-time features

### Component Organization

- **Server Components**: Used for data fetching and static rendering
- **Client Components**: Used for interactivity and state management
- **Shared Components**: Reusable components across the application

### API Integration

- Communication with Go backend via `lib/api.ts`
- Server-side data fetching with caching headers
- Client-side API calls with error handling

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### TypeScript Configuration

The project uses strict TypeScript configuration with:
- Path mapping for clean imports
- Strict type checking
- ESLint integration

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable styled components
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Ready for future implementation

## 📱 Pages

- **Home** (`/home`): Landing page with marketing content
- **Login** (`/login`): User authentication
- **Tickets** (`/ticket`): User's travel tickets
- **Create** (`/create`): Create new travel ticket
- **Find** (`/find`): Find travel companions
- **Ticket Details** (`/ticket/[id]`): Individual ticket with matches

## 🔐 Authentication

- Custom authentication system
- JWT token-based authentication
- Secure cookie storage
- Protected routes and API endpoints

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- The open-source community for inspiration and tools

## 📞 Support

For support, email support@travelsync.com or join our Discord community.

---

Made with ❤️ by the TravelSync Team