# 🔐 Forgot Password Feature - Setup Guide

The "Forgot Password" feature has been added to your MindfulMe app! Here's what you need to know:

---

## ✅ What's Been Added

1. **"Forgot password?" link** on the Sign In page
2. **Password reset form** that sends a reset email
3. **Success/error messages** for user feedback
4. **Backend integration** with Supabase Auth

---

## 🔧 How It Works

### User Flow:
1. User clicks **"Forgot password?"** on the Sign In page
2. User enters their email address
3. User clicks **"Send Reset Link"**
4. User receives an email with a password reset link
5. User clicks the link and sets a new password
6. User can now sign in with their new password

---

## ⚙️ Supabase Configuration Required

For the password reset feature to work, you need to configure Supabase:

### Step 1: Enable Email Templates (Optional but Recommended)

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your MindfulMe project
3. Go to **Authentication** → **Email Templates**
4. Click on **"Reset Password"**
5. Customize the email template if desired (optional)
6. Make sure it's **enabled**

### Step 2: Configure Redirect URLs

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Add your app URL to **Redirect URLs**:
   - For local development: `http://localhost:3000/*`
   - For production: `https://your-app.vercel.app/*` (or your actual URL)
3. Click **Save**

### Step 3: Test Email Delivery

**Important:** By default, Supabase uses a rate-limited email service for development.

For production, you should:
- Configure a custom SMTP provider (Gmail, SendGrid, etc.)
- Or use Supabase's built-in email service (may have limits)

To configure custom SMTP:
1. Go to **Project Settings** → **Auth**
2. Scroll to **SMTP Settings**
3. Enable **Custom SMTP**
4. Enter your SMTP credentials

---

## 🎨 UI Features

### On Sign In Page:
- **"Forgot password?"** link appears next to the Password field
- Only visible when on the Sign In view (not Sign Up)

### On Forgot Password Page:
- Only shows the Email field
- Button changes to "Send Reset Link"
- Success message appears after sending
- **"Back to sign in"** link to return

### Visual Feedback:
- ✅ **Green success message**: "Password reset link sent! Check your email."
- ❌ **Red error message**: Shows if email doesn't exist or other errors

---

## 📧 Email Configuration (Important!)

### Development/Testing:
Supabase sends emails automatically, but:
- May go to spam folder
- Rate limited (max 3-4 per hour per user)
- Email might be delayed

### Production:
For best results, configure a custom SMTP provider:

**Recommended Services:**
- **SendGrid** (Free tier: 100 emails/day)
- **Mailgun** (Free tier: 5,000 emails/month)
- **AWS SES** (Very cheap)
- **Gmail SMTP** (Free but has daily limits)

---

## 🧪 How to Test

1. **Start your app** in development:
   ```bash
   npm run dev
   ```

2. **Go to Sign In page**

3. **Click "Forgot password?"**

4. **Enter your test email**

5. **Click "Send Reset Link"**

6. **Check your email inbox** (and spam folder!)

7. **Click the reset link** in the email

8. **Set a new password**

9. **Sign in with new password**

---

## 🔍 Troubleshooting

### "Email not sent"
- Check Supabase Dashboard → Authentication → Email Templates
- Verify the email template is enabled
- Check SMTP settings if using custom provider

### "User not found" error
- The email address must be registered in your app
- Try signing up first, then test password reset

### Email goes to spam
- Configure SPF/DKIM records (advanced)
- Use a reputable SMTP provider
- Or ask users to check spam folder

### Reset link doesn't work
- Check that redirect URLs are configured in Supabase
- Verify the link hasn't expired (valid for 1 hour)
- Make sure you're using the correct app URL

---

## 🚀 What Happens After Clicking Reset Link?

Currently, Supabase handles the password reset page automatically. The user will:
1. Click the link in their email
2. Be redirected to Supabase's default reset page
3. Enter a new password
4. Be redirected back to your app
5. Can now sign in with the new password

### Optional: Custom Reset Password Page

If you want a custom reset password page in your app:

1. Create a new component `/components/ResetPassword.tsx`
2. Add a route for `/reset-password`
3. Use `supabase.auth.updateUser()` to set new password
4. Update the `resetPasswordForEmail` redirectTo URL

---

## 📝 Code Changes Made

### AuthContext.tsx
Added `resetPassword` function:
```typescript
async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw error;
  }
}
```

### Auth.tsx
Added:
- `isForgotPassword` state
- `success` message state
- "Forgot password?" link
- Conditional rendering for reset form
- Reset link email sending

---

## ✅ Production Checklist

Before deploying to production:

- [ ] Configure custom SMTP provider (recommended)
- [ ] Test password reset flow thoroughly
- [ ] Add production URL to Supabase redirect URLs
- [ ] Customize email templates with your branding
- [ ] Test email delivery (check spam folder)
- [ ] Consider adding reCAPTCHA to prevent abuse
- [ ] Add rate limiting if needed

---

## 🎯 Next Steps

1. **Test the feature** locally
2. **Configure SMTP** for production
3. **Update Supabase redirect URLs** after deployment
4. **Customize email templates** (optional)
5. **Deploy and test** on live URL

---

**The forgot password feature is now ready to use! 🎉**

Users can reset their passwords directly from the Sign In page.
