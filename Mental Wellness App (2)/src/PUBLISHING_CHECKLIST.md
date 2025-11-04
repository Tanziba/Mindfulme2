# MindfulMe - Complete Publishing Checklist

This is your step-by-step guide to publishing MindfulMe on the Google Play Store.

---

## 📋 PRE-PUBLISHING PREPARATION

### ✅ Phase 1: Download & Setup (30-60 minutes)

- [ ] **Download all project files** from Figma Make to your computer
- [ ] **Install Node.js** (v18 or later) from [nodejs.org](https://nodejs.org)
- [ ] **Install Android Studio** from [developer.android.com/studio](https://developer.android.com/studio)
- [ ] **Install JDK** (usually comes with Android Studio)
- [ ] **Verify installations:**
  ```bash
  node --version  # Should show v18+
  npm --version   # Should show 9+
  java --version  # Should show Java 11+
  ```

### ✅ Phase 2: Project Setup (15-30 minutes)

- [ ] **Open terminal** in your project directory
- [ ] **Install dependencies:**
  ```bash
  npm install
  ```
- [ ] **Install Capacitor:**
  ```bash
  npm install @capacitor/core @capacitor/cli @capacitor/android
  ```
- [ ] **Verify Capacitor config** - Check that `capacitor.config.json` and `capacitor.config.ts` exist
- [ ] **Update App ID** in both Capacitor config files:
  - Replace `com.mindfulme.app` with your own ID (e.g., `com.yourname.mindfulme`)
  - Use reverse domain format: `com.yourcompany.appname`

### ✅ Phase 3: Build Web App (5-10 minutes)

- [ ] **Create production build:**
  ```bash
  npm run build
  ```
- [ ] **Verify build** - Check that `dist` folder was created with files
- [ ] **Test build locally:**
  ```bash
  npm run preview
  ```
- [ ] **Verify app works** - Open browser and test all features

### ✅ Phase 4: Add Android Platform (10-15 minutes)

- [ ] **Add Android platform:**
  ```bash
  npx cap add android
  ```
- [ ] **Sync files to Android:**
  ```bash
  npx cap sync android
  ```
- [ ] **Verify `android` folder** was created in your project

---

## 🎨 ASSETS CREATION

### ✅ App Icon (Required)

- [ ] **Create app icon** (512x512px, PNG format)
  - Use your gradient heart logo
  - No transparency (solid background)
  - Save as `icon-512.png`
- [ ] **Generate all sizes** using [appicon.co](https://appicon.co) or [Icon Kitchen](https://icon.kitchen)
  - Upload your 512x512 icon
  - Download Android icon pack
- [ ] **Place icons** in:
  - `android/app/src/main/res/mipmap-hdpi/`
  - `android/app/src/main/res/mipmap-mdpi/`
  - `android/app/src/main/res/mipmap-xhdpi/`
  - `android/app/src/main/res/mipmap-xxhdpi/`
  - `android/app/src/main/res/mipmap-xxxhdpi/`

### ✅ Splash Screen (Optional but Recommended)

- [ ] **Create splash screen** (2732x2732px, PNG)
  - Centered logo on gradient background
  - Use purple/pink gradient from your app
- [ ] **Place in** `android/app/src/main/res/drawable/`
- [ ] **Name it** `splash.png`

### ✅ Screenshots (Required - at least 2, recommended 8)

- [ ] **Take screenshots** of all major features:
  1. Dashboard/Home screen
  2. Mood tracking interface
  3. Mood history/charts
  4. Breathing exercise
  5. Daily affirmations
  6. Task manager
  7. Habit tracker
  8. Resources page
- [ ] **Requirements:**
  - Minimum 2 screenshots
  - JPEG or 24-bit PNG (no alpha)
  - Minimum dimension: 320px
  - Maximum dimension: 3840px
  - 16:9 or 9:16 aspect ratio recommended
- [ ] **Save as:** `screenshot-1.png`, `screenshot-2.png`, etc.

### ✅ Feature Graphic (Required)

- [ ] **Create feature graphic** (1024x500px)
  - Use Canva, Figma, or Photoshop
  - Include app name "MindfulMe"
  - Add tagline: "Transform Bad Days Into Better Ones"
  - Use purple/pink gradient background
  - Add heart icon
- [ ] **Save as** `feature-graphic.png` (PNG or JPEG)

### ✅ Promotional Graphics (Optional)

- [ ] Promo graphic (180x120px) - optional
- [ ] TV banner (1280x720px) - optional, for Android TV

---

## 🔧 ANDROID APP CONFIGURATION

### ✅ Update App Details

- [ ] **Edit** `android/app/src/main/res/values/strings.xml`:
  ```xml
  <resources>
      <string name="app_name">MindfulMe</string>
      <string name="title_activity_main">MindfulMe</string>
      <string name="package_name">com.yourname.mindfulme</string>
  </resources>
  ```

### ✅ Set Permissions

- [ ] **Edit** `android/app/src/main/AndroidManifest.xml`
- [ ] **Verify permissions:**
  ```xml
  <uses-permission android:name="android.permission.INTERNET" />
  ```
- [ ] **Add version info** in `android/app/build.gradle`:
  ```gradle
  android {
      defaultConfig {
          versionCode 1
          versionName "1.0.0"
      }
  }
  ```

### ✅ Configure Colors & Theme

- [ ] **Edit** `android/app/src/main/res/values/colors.xml`:
  ```xml
  <resources>
      <color name="colorPrimary">#a855f7</color>
      <color name="colorPrimaryDark">#9333ea</color>
      <color name="colorAccent">#ec4899</color>
  </resources>
  ```

---

## 🔐 GENERATE SIGNING KEY

### ✅ Create Keystore (FIRST TIME ONLY - CRITICAL!)

- [ ] **Open terminal** in your project directory
- [ ] **Generate keystore:**
  ```bash
  keytool -genkey -v -keystore release-key.keystore -alias mindfulme-key -keyalg RSA -keysize 2048 -validity 10000
  ```
- [ ] **Enter information when prompted:**
  - Password (SAVE THIS!)
  - Your name
  - Organization
  - City
  - State
  - Country code
- [ ] **🚨 CRITICAL: Backup keystore file!**
  - Copy `release-key.keystore` to a safe location
  - Store passwords in a password manager
  - You'll need this for ALL future updates
  - If you lose this, you can NEVER update your app!

### ✅ Configure Signing

- [ ] **Create file** `android/key.properties` (NOT in git!)
- [ ] **Add content:**
  ```properties
  storePassword=YOUR_KEYSTORE_PASSWORD
  keyPassword=YOUR_KEY_PASSWORD
  keyAlias=mindfulme-key
  storeFile=../release-key.keystore
  ```
- [ ] **Edit** `android/app/build.gradle` - Add signing config:
  ```gradle
  def keystoreProperties = new Properties()
  def keystorePropertiesFile = rootProject.file('key.properties')
  if (keystorePropertiesFile.exists()) {
      keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
  }

  android {
      signingConfigs {
          release {
              keyAlias keystoreProperties['keyAlias']
              keyPassword keystoreProperties['keyPassword']
              storeFile file(keystoreProperties['storeFile'])
              storePassword keystoreProperties['storePassword']
          }
      }
      buildTypes {
          release {
              signingConfig signingConfigs.release
          }
      }
  }
  ```

---

## 🏗️ BUILD RELEASE VERSION

### ✅ Open in Android Studio

- [ ] **Open Android Studio**
- [ ] **Open project:**
  ```bash
  npx cap open android
  ```
- [ ] **Wait for Gradle sync** to complete (may take 5-10 minutes first time)

### ✅ Build AAB (Android App Bundle)

- [ ] **In Android Studio:** Build → Generate Signed Bundle / APK
- [ ] **Select:** Android App Bundle (AAB)
- [ ] **Click:** Next
- [ ] **Choose keystore:** Select your `release-key.keystore` file
- [ ] **Enter passwords:**
  - Keystore password
  - Key alias: `mindfulme-key`
  - Key password
- [ ] **Select build variant:** release
- [ ] **Check:** Export encrypted key (for Play App Signing)
- [ ] **Click:** Finish
- [ ] **Wait for build** (2-5 minutes)
- [ ] **Locate AAB file:** `android/app/release/app-release.aab`
- [ ] **Test AAB file** size (should be under 150MB, likely 5-20MB)

### ✅ Test on Device (Highly Recommended)

- [ ] **Build APK for testing:**
  - Build → Build Bundle(s) / APK(s) → Build APK(s)
- [ ] **Install on Android device** via USB
- [ ] **Test all features:**
  - [ ] Sign up
  - [ ] Sign in
  - [ ] Mood tracking
  - [ ] Breathing exercises
  - [ ] Affirmations
  - [ ] Task creation/completion
  - [ ] Habit tracking
  - [ ] Resources page
  - [ ] Sign out
  - [ ] Supabase connection works
- [ ] **Check for crashes or errors**

---

## 📝 PREPARE LEGAL DOCUMENTS

### ✅ Privacy Policy

- [ ] **Review** `PRIVACY_POLICY.md` file
- [ ] **Update placeholders:**
  - [ ] Replace `[your-email@example.com]` with your actual support email
  - [ ] Add your company/developer name
  - [ ] Review all sections for accuracy
- [ ] **Host privacy policy:**
  - **Option 1:** GitHub Pages (free)
    - Create a new GitHub repo
    - Upload PRIVACY_POLICY.md
    - Enable GitHub Pages
    - Get URL: `https://yourusername.github.io/repo-name/PRIVACY_POLICY`
  - **Option 2:** Your own website
  - **Option 3:** Google Docs (make public, get share link)
- [ ] **Save privacy policy URL** - You'll need it for Play Console
- [ ] **Verify URL is publicly accessible**

### ✅ Support Contact

- [ ] **Create support email:** mindfulme.support@gmail.com (or similar)
- [ ] **Set up email monitoring**
- [ ] **Create auto-responder** (optional) for support requests

---

## 🏪 GOOGLE PLAY CONSOLE SETUP

### ✅ Create Developer Account

- [ ] **Go to:** [play.google.com/console](https://play.google.com/console)
- [ ] **Sign in** with Google account
- [ ] **Click:** "Create account"
- [ ] **Choose:** Individual or Organization
- [ ] **Pay registration fee:** $25 (one-time, non-refundable)
- [ ] **Complete identity verification** (may take 1-2 days)
- [ ] **Accept agreements**

### ✅ Create App Listing

- [ ] **Click:** "Create app"
- [ ] **Fill in details:**
  - [ ] App name: **MindfulMe**
  - [ ] Default language: English (United States)
  - [ ] App or Game: **App**
  - [ ] Free or Paid: **Free**
- [ ] **Declare if app is primarily for children:** No
- [ ] **Click:** Create app

---

## 📋 COMPLETE ALL PLAY CONSOLE SECTIONS

### ✅ Dashboard Tasks

Complete all tasks shown in the Play Console dashboard. Here's the typical checklist:

### 1️⃣ App Access

- [ ] **Declare app access:**
  - [ ] Select: "All functionality is available without special access"
  - OR
  - [ ] If login required: "All or some functionality is restricted"
  - [ ] Provide test account credentials for review team:
    - Email: test@example.com (create a test account)
    - Password: [provide password]

### 2️⃣ Ads

- [ ] **Declare ad presence:**
  - [ ] Select: "No, my app does not contain ads"

### 3️⃣ Content Rating

- [ ] **Start questionnaire**
- [ ] **Select category:** Health & Fitness / Reference
- [ ] **Answer questions:**
  - Violence: None
  - Sexual content: None
  - Profanity: None
  - Controlled substances: None (unless you reference them in crisis resources)
  - User interaction: Yes (account creation)
  - Share location: No
  - Personal information: Yes (email, mood data)
- [ ] **Submit for rating**
- [ ] **Expected rating:** Everyone or Teen
- [ ] **Download certificate** (automatic)

### 4️⃣ Target Audience

- [ ] **Select age groups:**
  - [ ] Ages 13-17 (Teens)
  - [ ] Ages 18+ (Adults)
- [ ] **Appeal to children:** No

### 5️⃣ News Apps

- [ ] **Is this a news app?** No

### 6️⃣ COVID-19 Contact Tracing & Status Apps

- [ ] **Is this a contact tracing app?** No

### 7️⃣ Data Safety

- [ ] **Complete data safety form:**
  
  **Data Collection:**
  - [ ] Collects data: **Yes**
  
  **Types of data collected:**
  - [ ] Personal info: Email address, Name
  - [ ] Health & Fitness: Mood data
  - [ ] App activity: Tasks, Habits
  
  **Data usage:**
  - [ ] App functionality
  - [ ] Account management
  
  **Data sharing:**
  - [ ] Shared with third parties: **Yes** (Supabase for backend)
  - [ ] Purpose: App functionality
  
  **Data security:**
  - [ ] Data encrypted in transit: **Yes**
  - [ ] Data encrypted at rest: **Yes**
  - [ ] Users can request data deletion: **Yes**
  
  **Optional:**
  - [ ] Link to privacy policy: [Your URL]

### 8️⃣ Government Apps

- [ ] **Is this a government app?** No

### 9️⃣ Financial Features

- [ ] **Contains financial features?** No

---

## 📱 STORE LISTING

### ✅ Main Store Listing

- [ ] **Open:** Store presence → Main store listing
- [ ] **App details:**
  - [ ] **Short description** (80 chars):
    ```
    Transform bad days into better ones with mood tracking, tasks & self-care tools
    ```
  - [ ] **Full description** (4000 chars):
    - [ ] Copy from `PLAY_STORE_LISTING.md`
    - [ ] Customize as needed

- [ ] **Graphics:**
  - [ ] **App icon** (512x512px): Upload your icon
  - [ ] **Feature graphic** (1024x500px): Upload feature graphic
  - [ ] **Phone screenshots** (at least 2): Upload all screenshots
    - Minimum 2, recommended 8
    - Upload in order of importance

- [ ] **Categorization:**
  - [ ] **Category:** Health & Fitness
  - [ ] **Tags:** Mental Health, Wellness, Self-Care

- [ ] **Contact details:**
  - [ ] Website: [Your website or GitHub]
  - [ ] Email: mindfulme.support@gmail.com
  - [ ] Phone: (optional)
  - [ ] Privacy policy URL: [Your hosted privacy policy URL]

- [ ] **Save changes**

---

## 🚀 UPLOAD & RELEASE

### ✅ Production Release

- [ ] **Go to:** Production → Create new release
- [ ] **Opt in to Play App Signing** (recommended)
  - Google manages your signing key
  - Safer for long-term maintenance
- [ ] **Upload app bundle:**
  - [ ] Click "Upload"
  - [ ] Select `app-release.aab` file
  - [ ] Wait for upload and processing (2-5 minutes)
- [ ] **Review warnings** (if any)
  - Address critical warnings
  - Minor warnings can often be ignored
- [ ] **Release name:** 1.0.0
- [ ] **Release notes:**
  ```
  🎉 Welcome to MindfulMe!

  • 📊 Track your moods with beautiful visualizations
  • 🧘 Guided breathing exercises for instant calm
  • ✨ Daily affirmations to boost your mindset
  • ✅ Task management to stay productive
  • 🎯 Habit tracking with motivating streaks
  • 📚 Mental health resources & crisis support
  • ☁️ Secure cloud sync across devices
  • 🔐 Privacy-first design - your data stays yours

  Start your mental wellness journey today!
  ```
- [ ] **Save**

### ✅ Rollout

- [ ] **Choose rollout type:**
  - **Staged rollout** (recommended): Start with 20% of users, gradually increase
  - **Full rollout**: Release to 100% immediately
- [ ] **Select countries:**
  - Start with: United States, Canada, United Kingdom, Australia
  - Or: Available to all countries
- [ ] **Review everything one last time**
- [ ] **Click:** "Start rollout to Production"

---

## ⏱️ REVIEW PROCESS

### ✅ Wait for Google Review

- [ ] **Submit for review**
- [ ] **Wait for approval:**
  - Typical: 1-3 days
  - Can take up to 7 days
  - Check email for updates
- [ ] **Check review status** in Play Console
- [ ] **Respond to any issues** if app is rejected

### ✅ If Rejected

- [ ] **Read rejection reasons** carefully
- [ ] **Make necessary changes**
- [ ] **Re-build AAB**
- [ ] **Upload new version**
- [ ] **Resubmit**

### ✅ If Approved

- [ ] **🎉 Congratulations!** Your app is live!
- [ ] **Find your app** on Google Play Store
- [ ] **Test download** on a device
- [ ] **Share with friends/family**

---

## 📢 POST-LAUNCH

### ✅ Monitoring

- [ ] **Check Play Console daily** for:
  - Crash reports
  - User reviews
  - Download statistics
  - Ratings
- [ ] **Respond to user reviews** within 48 hours
- [ ] **Monitor support email**
- [ ] **Track Supabase usage/costs**

### ✅ Marketing (Optional)

- [ ] **Share on social media**
- [ ] **Create landing page**
- [ ] **Submit to app review sites**
- [ ] **Reach out to mental health communities**
- [ ] **Consider ASO (App Store Optimization)**

### ✅ Updates & Maintenance

- [ ] **Plan regular updates:**
  - Bug fixes
  - New features
  - Security updates
- [ ] **Monitor Supabase** for any issues
- [ ] **Keep dependencies updated**
- [ ] **Respond to user feedback**

---

## 🆘 TROUBLESHOOTING

### Common Issues & Solutions

**Build Errors:**
- [ ] Run `npm install` again
- [ ] Delete `node_modules` and `android` folders, reinstall
- [ ] Check Java version (needs Java 11+)
- [ ] Update Android Studio

**Signing Errors:**
- [ ] Verify keystore path in `key.properties`
- [ ] Check passwords are correct
- [ ] Ensure keystore file exists

**Upload Errors:**
- [ ] AAB file too large: Optimize images, remove unused code
- [ ] Version code conflict: Increment version code
- [ ] Package name conflict: Change app ID

**Supabase Connection:**
- [ ] Verify URLs are correct
- [ ] Check API keys
- [ ] Test authentication flow
- [ ] Review CORS settings

**App Rejected:**
- [ ] Review Google Play policies
- [ ] Check privacy policy is accessible
- [ ] Ensure content rating is accurate
- [ ] Add required disclosures

---

## 📚 HELPFUL RESOURCES

### Documentation
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/studio/publish)
- [Play Console Help](https://support.google.com/googleplay/android-developer)
- [Supabase Docs](https://supabase.com/docs)

### Tools
- [Icon Generator](https://appicon.co)
- [Screenshot Maker](https://screenshots.pro)
- [Canva](https://canva.com) - For graphics
- [Google Play Academy](https://playacademy.exceedlms.com/student/catalog) - Free courses

### Support
- Stack Overflow: [android], [capacitor], [supabase] tags
- Capacitor Forums: [forum.ionicframework.com](https://forum.ionicframework.com)
- r/androiddev on Reddit

---

## ✅ FINAL CHECKLIST BEFORE SUBMISSION

- [ ] App builds without errors
- [ ] Tested on real Android device
- [ ] All features work (auth, mood, tasks, habits, etc.)
- [ ] Supabase integration works
- [ ] Privacy policy is live and accessible
- [ ] All Play Console sections are complete (100%)
- [ ] Screenshots show actual app functionality
- [ ] App icon and graphics look professional
- [ ] Contact email is set up and monitored
- [ ] Keystore is backed up safely
- [ ] Release notes are clear and engaging
- [ ] Content rating is appropriate
- [ ] Data safety form is accurate

---

## 🎯 ESTIMATED TIMELINE

- **Setup & Configuration:** 2-3 hours
- **Asset Creation:** 2-4 hours
- **Building & Testing:** 1-2 hours
- **Play Console Setup:** 1-2 hours
- **Google Review:** 1-7 days
- **Total:** 1-2 weeks from start to published

---

## 💡 TIPS FOR SUCCESS

1. **Start with test account** - Create in internal testing track first
2. **Take your time** - Don't rush the process
3. **Read rejection reasons carefully** - Google provides detailed feedback
4. **Keep keystore safe** - You can't recover a lost keystore
5. **Monitor after launch** - First 48 hours are critical
6. **Respond to reviews** - Shows you care about users
7. **Plan for updates** - Apps that update regularly rank better
8. **Follow Play policies** - Read and understand Google's rules

---

## 🎉 YOU'RE READY!

You now have everything you need to publish MindfulMe to the Google Play Store. Follow this checklist step-by-step, and you'll have your app live soon!

**Good luck, and remember:** You're creating something that helps people feel better. That's amazing! 💜

---

**Questions?** Review the troubleshooting section or consult the linked documentation.

**Stuck?** Search for your specific error message on Stack Overflow or Google.

**Need help?** Consider hiring a freelance developer for 1-2 hours to help with the build process.
