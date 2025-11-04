# 🚀 MindfulMe Deployment Guide

This guide explains how to deploy your MindfulMe web app to various hosting platforms.

## 📋 Prerequisites

Before deploying, make sure you have:
- [ ] All code committed to a GitHub repository
- [ ] Supabase project set up and configured
- [ ] Environment variables ready (if needed)

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free)

**Best for:** Simple hosting, free tier, automatic deployments

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/mindfulme.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - The deployment workflow is already configured in `.github/workflows/deploy.yml`

3. **Update Vite Config (if needed):**
   - If your repository name is NOT `mindfulme`, update `vite.config.ts`:
   ```typescript
   base: '/your-repo-name/', // Replace with your actual repo name
   ```

4. **Wait for deployment:**
   - GitHub Actions will automatically build and deploy
   - Your site will be available at: `https://YOUR_USERNAME.github.io/mindfulme/`

5. **Configure Supabase Redirect URLs:**
   - Go to your Supabase dashboard
   - Navigate to **Authentication** → **URL Configuration**
   - Add your GitHub Pages URL to the allowed redirect URLs

---

### Option 2: Vercel (Recommended - Free)

**Best for:** Professional hosting, automatic HTTPS, fast global CDN

1. **Install Vercel CLI (optional):**
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel CLI:**
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

3. **Or deploy via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click **Add New** → **Project**
   - Import your GitHub repository
   - Vercel will automatically detect the configuration
   - Click **Deploy**

4. **Configure Environment Variables (if needed):**
   - In Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add any necessary variables

5. **Update Supabase Redirect URLs:**
   - Add your Vercel domain to Supabase redirect URLs

---

### Option 3: Netlify (Free)

**Best for:** Easy setup, form handling, serverless functions

1. **Deploy via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

2. **Or deploy via Netlify Dashboard:**
   - Go to [netlify.com](https://netlify.com)
   - Click **Add new site** → **Import an existing project**
   - Connect your GitHub repository
   - Build settings are already configured in `netlify.toml`
   - Click **Deploy**

3. **Configure Environment Variables:**
   - In Netlify dashboard, go to **Site settings** → **Environment variables**

4. **Update Supabase Redirect URLs:**
   - Add your Netlify domain to Supabase redirect URLs

---

### Option 4: Firebase Hosting (Free)

**Best for:** Integration with other Firebase services

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Firebase:**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to: `dist`
   - Configure as single-page app: `Yes`
   - Don't overwrite index.html: `No`

3. **Build and deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

---

### Option 5: Render (Free)

**Best for:** Full-stack apps with backend services

1. **Go to [render.com](https://render.com)**
2. **Create a new Static Site**
3. **Connect your GitHub repository**
4. **Configure build settings:**
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. **Click Create Static Site**

---

## 🔒 Important: Supabase Configuration

**After deploying to ANY platform, you MUST update your Supabase configuration:**

1. **Go to your Supabase Dashboard:**
   - Navigate to: https://app.supabase.com

2. **Update Redirect URLs:**
   - Go to **Authentication** → **URL Configuration**
   - Add your deployment URL to **Redirect URLs**
   - Example: `https://your-app.vercel.app/*`

3. **Update Site URL:**
   - Set the **Site URL** to your deployment URL
   - Example: `https://your-app.vercel.app`

**If you skip this step, authentication will NOT work!**

---

## 📱 Converting to Android App (Capacitor)

After your web app is deployed and working, you can convert it to Android:

1. **Follow the instructions in:** `PUBLISHING_CHECKLIST.md`
2. **The Capacitor configuration is already set up** in `capacitor.config.ts`

---

## 🐛 Troubleshooting

### 404 Error on Page Refresh
- Make sure your hosting platform is configured for SPA routing
- Check that redirects are properly configured (see platform-specific configs)

### Build Fails
- Run `npm run build` locally to test
- Check for TypeScript errors: `npm run type-check` (if available)
- Ensure all dependencies are installed: `npm install`

### Authentication Not Working
- Verify Supabase redirect URLs are configured correctly
- Check that environment variables are set (if applicable)
- Ensure Supabase project is not paused

### Blank Page After Deployment
- Check browser console for errors
- Verify `base` path in `vite.config.ts` is correct
- Check that all assets are loading correctly

---

## 📊 Monitoring Your Deployment

### GitHub Pages
- Check Actions tab for deployment status
- View deployment logs for errors

### Vercel/Netlify
- Both platforms provide deployment logs and analytics
- Monitor build times and deployment status in dashboard

---

## 🎉 Success Checklist

After deployment, verify:
- [ ] Site loads correctly at the deployment URL
- [ ] All pages and routes work
- [ ] Sign up/Sign in functionality works
- [ ] Data syncs with Supabase correctly
- [ ] Mobile responsive design works
- [ ] Images and assets load properly
- [ ] No console errors

---

## 🔗 Useful Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Supabase Documentation](https://supabase.com/docs)

---

## 💡 Next Steps

1. **Deploy your web app** using one of the options above
2. **Test thoroughly** on the deployed URL
3. **Set up custom domain** (optional, available on most platforms)
4. **Convert to Android app** using Capacitor (see PUBLISHING_CHECKLIST.md)
5. **Submit to Google Play Store** (see PLAY_STORE_LISTING.md)

---

**Need help?** Check the platform-specific documentation or reach out to the community!
