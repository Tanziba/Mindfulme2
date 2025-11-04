# 🧘 MindfulMe - Mental Wellness App

A comprehensive mental wellness application designed to help people having bad days feel better, stay productive, organized, and motivated.

![MindfulMe](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6)
![Supabase](https://img.shields.io/badge/Supabase-2.39-3ecf8e)

## ✨ Features

- **🎭 Mood Tracking** - Log and visualize your emotional journey
- **🌬️ Breathing Exercises** - Guided breathing techniques for relaxation
- **✨ Positive Affirmations** - Daily motivational messages
- **✅ Task Management** - Organize your to-dos effectively
- **🎯 Habit Tracking** - Build and maintain positive habits
- **💆 Wellness Resources** - Access helpful mental health resources
- **☁️ Cloud Sync** - Your data syncs across all devices via Supabase
- **🔐 Secure Authentication** - User accounts with email/password login
- **📱 Responsive Design** - Works beautifully on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works great)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mindfulme.git
   cd mindfulme
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key from Settings → API
   - Update `utils/supabase/info.tsx` with your credentials

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:3000`

## 📦 Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 🌐 Deployment

See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for detailed instructions on deploying to:
- GitHub Pages
- Vercel
- Netlify
- Firebase
- Render
- And more!

## 📱 Android App

Want to publish this as a native Android app? Check out:
- **[PUBLISHING_CHECKLIST.md](PUBLISHING_CHECKLIST.md)** - Complete guide for Android conversion
- **[PLAY_STORE_LISTING.md](PLAY_STORE_LISTING.md)** - Play Store listing content

## 🛠️ Tech Stack

- **Frontend:**
  - React 18.2
  - TypeScript 5.3
  - Tailwind CSS 4.0
  - Vite 5.0

- **UI Components:**
  - Shadcn/ui
  - Lucide React Icons
  - Recharts for data visualization

- **Backend:**
  - Supabase (PostgreSQL database)
  - Supabase Authentication
  - Supabase Edge Functions

- **Mobile:**
  - Capacitor 5.5 (for Android conversion)

## 📂 Project Structure

```
mindfulme/
├── components/           # React components
│   ├── ui/              # Shadcn UI components
│   ├── Auth.tsx         # Authentication UI
│   ├── Dashboard.tsx    # Main dashboard
│   ├── MoodTracker.tsx  # Mood tracking feature
│   └── ...
├── styles/              # Global styles
├── utils/               # Utility functions
├── supabase/            # Supabase configuration
├── public/              # Static assets
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.html           # HTML template
```

## 🔐 Privacy & Security

- User data is securely stored in Supabase
- Authentication uses industry-standard practices
- See [PRIVACY_POLICY.md](PRIVACY_POLICY.md) for full privacy policy

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🆘 Support

- Check the [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for deployment help
- Review [QUICK_START.md](QUICK_START.md) for usage instructions
- Open an issue for bugs or feature requests

## 📝 Documentation

- [Quick Start Guide](QUICK_START.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Publishing Checklist](PUBLISHING_CHECKLIST.md)
- [Privacy Policy](PRIVACY_POLICY.md)
- [Play Store Listing](PLAY_STORE_LISTING.md)

## 🎯 Roadmap

- [ ] iOS app support (Capacitor)
- [ ] Social login (Google, Facebook)
- [ ] Dark mode
- [ ] Export data feature
- [ ] Community features
- [ ] Meditation timer
- [ ] Journal entries

## 💖 Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI components by [Shadcn](https://ui.shadcn.com)
- Powered by [Supabase](https://supabase.com)

---

Made with ❤️ for mental wellness
