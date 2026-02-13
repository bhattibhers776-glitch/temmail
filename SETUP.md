# Quick Setup Guide

## Installation Steps

1. **Navigate to the project**
```bash
cd tempmail-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to: http://localhost:3000

## What You'll See

### Generator Page (Default)
- **Email Generator Card**: Input field to add a label, generate button creates a new temp email
- **Active Email Display**: Shows generated email with copy button and countdown timer
- **Inbox**: Split view with message list on left, preview on right
- **OTP Detection**: Automatically highlights verification codes

### History Page
- **Stats Cards**: Total emails, active, expired, OTP received
- **Email History Table**: All generated emails with status
- **Usage Chart**: Visual analytics of email generation

## Key Features to Try

1. **Generate Email**
   - Click "Generate Email" button
   - Optionally add a label like "netflix-trial"
   - Watch the countdown timer

2. **Check Inbox**
   - Messages appear automatically (mock data)
   - Click messages to view full content
   - Copy OTP codes with one click

3. **Filter Messages**
   - Use All/OTP/Social tabs to filter
   - Unread indicators show new messages

4. **View History**
   - Click "History & Usage" tab
   - See all generated emails
   - View usage statistics and charts

## Mock Data

The app comes with sample data:
- 2 pre-generated emails
- 3 sample inbox messages
- Mock analytics data

This demonstrates the full functionality without needing a backend.

## Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
accent: {
  green: '#22C55E', // Change this to your brand color
}
```

### Modify Expiry Time
Edit `lib/store.ts`:
```typescript
expiresAt: addMinutes(new Date(), 60), // Change 60 to desired minutes
```

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000
# Then run dev again
npm run dev
```

**Dependencies not installing?**
```bash
# Clear npm cache
npm cache clean --force
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Add Real Email API**: Integrate with services like MailSlurp, Guerrilla Mail
2. **User Authentication**: Add login/signup for saving history
3. **Database**: Store emails persistently with PostgreSQL or MongoDB
4. **Deploy**: Deploy to Vercel with one click

Enjoy your premium temporary email generator! 🚀
