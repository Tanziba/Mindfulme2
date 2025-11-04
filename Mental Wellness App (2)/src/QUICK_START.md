# MindfulMe - Quick Start Guide

This is a condensed version of the publishing process. For detailed instructions, see `PUBLISHING_CHECKLIST.md`.

## 🚀 5-Step Publishing Process

### Step 1: Setup (30 min)
```bash
# Install dependencies
npm install

# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Build your app
npm run build

# Add Android platform
npx cap add android
npx cap sync android
```

### Step 2: Create Assets (2-3 hours)
- [ ] App icon (512x512px)
- [ ] At least 2 screenshots of your app
- [ ] Feature graphic (1024x500px)
- [ ] Host privacy policy (see `PRIVACY_POLICY.md`)

### Step 3: Build Release AAB (1 hour)
```bash
# Generate keystore (FIRST TIME ONLY - SAVE THIS!)
keytool -genkey -v -keystore release-key.keystore -alias mindfulme-key -keyalg RSA -keysize 2048 -validity 10000

# Open in Android Studio
npx cap open android

# In Android Studio:
# Build → Generate Signed Bundle/APK → Android App Bundle
# Choose your keystore, enter passwords, select 'release'
```

**🚨 CRITICAL:** Backup your `release-key.keystore` file and passwords!

### Step 4: Google Play Console (2 hours)
1. Create account at [play.google.com/console](https://play.google.com/console) ($25 fee)
2. Create new app
3. Complete all required sections:
   - App access (login credentials if needed)
   - Ads declaration (No ads)
   - Content rating (complete questionnaire)
   - Target audience (13+)
   - Data safety (see checklist for details)
4. Fill in store listing (use `PLAY_STORE_LISTING.md`)
5. Upload screenshots and graphics

### Step 5: Upload & Submit (30 min)
1. Go to Production → Create new release
2. Upload your `app-release.aab` file
3. Add release notes (see `PLAY_STORE_LISTING.md`)
4. Review and submit
5. Wait 1-7 days for approval

## 📝 Key Files You Created

- `PRIVACY_POLICY.md` - Your privacy policy (must host publicly)
- `PLAY_STORE_LISTING.md` - All your store listing content
- `PUBLISHING_CHECKLIST.md` - Detailed step-by-step guide
- `capacitor.config.json` - Capacitor configuration
- `package.json` - Updated with build scripts

## ⚠️ Important Reminders

1. **Never lose your keystore** - No keystore = can't update app ever
2. **Update app ID** - Change `com.mindfulme.app` to your own ID
3. **Host privacy policy** - Required before submission
4. **Test on real device** - Don't skip this step
5. **Create support email** - For user contact

## 🆘 Quick Troubleshooting

**Build fails?**
```bash
npm install
npm run build
npx cap sync android
```

**Can't open Android Studio?**
- Install Android Studio first
- Make sure Java 11+ is installed

**Upload rejected?**
- Check all Play Console sections are 100% complete
- Verify privacy policy URL is accessible
- Ensure content rating is submitted

## 📞 Need Help?

1. Read the full `PUBLISHING_CHECKLIST.md`
2. Check Android Studio error messages
3. Search your error on Stack Overflow
4. Review [Capacitor docs](https://capacitorjs.com/docs)

## ⏱️ Timeline

- **Total hands-on time:** 6-8 hours
- **Google review wait:** 1-7 days
- **First publish:** ~1-2 weeks total

## 🎯 Next Steps

1. Download all files from Figma Make
2. Follow Step 1 above
3. Continue with `PUBLISHING_CHECKLIST.md` for details

**You've got this!** 💜
