# TempMail - Temporary Email Generator

A premium, minimal SaaS web application for generating temporary email addresses built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Premium Dark Design** - Clean, calm, and professional UI inspired by Linear and Vercel
- ⚡ **Real-time Inbox** - Live email reception with OTP detection
- 🔄 **Auto-expiry** - Emails automatically expire after 60 minutes with countdown timer
- 📊 **Usage Analytics** - Track your email generation with beautiful charts
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ✨ **Smooth Animations** - Powered by Framer Motion for delightful interactions
- 🎯 **Type-safe** - Built with TypeScript for reliability
- 🗃️ **State Management** - Zustand for efficient global state

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State**: Zustand
- **Icons**: Lucide React
- **Utilities**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd tempmail-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
tempmail-app/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── Navigation.tsx       # Top navigation bar
│   ├── EmailGenerator.tsx   # Email generation component
│   ├── Inbox.tsx           # Inbox with message list
│   └── HistoryPage.tsx     # History & analytics page
├── lib/
│   └── store.ts            # Zustand state management
├── hooks/
│   └── useCountdown.ts     # Countdown timer hook
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Features Overview

### Generator Page
- Generate temporary email addresses with custom labels
- Real-time countdown timer showing time until expiry
- One-click copy functionality
- Automatic email generation with random addresses

### VIP Inbox
- Split-view inbox with message list and preview
- OTP auto-detection and highlighting
- Filter by All, OTP, or Social categories
- Unread message indicators
- Platform icons for visual identification

### History & Usage
- Statistics cards showing:
  - Total emails created
  - Active emails count
  - Expired emails count
  - OTP messages received
- Detailed email history table with:
  - Email addresses
  - Labels
  - Creation dates
  - Expiry status
- Usage analytics chart showing email generation trends

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  bg: {
    primary: '#0E1114',    // Main background
    secondary: '#161A1E',  // Card background
    tertiary: '#1C2126',   // Input background
  },
  accent: {
    green: '#22C55E',      // Primary accent
  }
}
```

### Animations
Modify animation settings in `framer-motion` components for different effects.

## Build for Production

```bash
npm run build
npm start
```

## Design Philosophy

This application follows a **refined minimal** aesthetic:
- Dark neutral backgrounds (#0E1114)
- Single accent color (green #22C55E)
- Generous whitespace
- Subtle shadows and borders
- Clean typography
- No flashy gradients or effects
- Professional, calm, and trustworthy

Inspired by:
- Linear
- Vercel
- Modern developer tools
- Premium SaaS products

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Future Enhancements

- [ ] Real email API integration
- [ ] User authentication
- [ ] Email forwarding
- [ ] Custom domain support
- [ ] Dark/light theme toggle
- [ ] Export email history
- [ ] Advanced filtering
- [ ] Email search functionality
