# Firebase Setup Guide for RSVP System

This guide will help you set up Firebase for your wedding website's RSVP functionality.

## Step 1: Create Firebase Project

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Click "Create a project"**
3. **Enter project name:** `ethereal-nuptial-glow` (or your preferred name)
4. **Choose whether to enable Google Analytics** (optional)
5. **Click "Create project"**

## Step 2: Add Web App

1. **In your Firebase project, click the web icon (</>)**
2. **Register app with nickname:** `ethereal-nuptial-glow`
3. **Click "Register app"**
4. **Copy the Firebase configuration** (you'll need this for the next step)

## Step 3: Configure Firebase in Your Code

1. **Open `src/lib/firebase.ts`**
2. **Replace the placeholder config with your actual Firebase config:**

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 4: Set up Firestore Database

1. **In Firebase Console, go to "Firestore Database"**
2. **Click "Create database"**
3. **Choose "Start in test mode"** (for development)
4. **Select a location** (choose one close to your users)
5. **Click "Done"**

## Step 5: Set up Security Rules

1. **In Firestore Database, go to "Rules" tab**
2. **Replace the rules with:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read and write to rsvp_responses collection
    match /rsvp_responses/{document} {
      allow read, write: if true;
    }
  }
}
```

**Note:** These rules allow public read/write access. For production, you might want to add authentication.

## Step 6: Deploy Your Application

```bash
git add .
git commit -m "Switch to Firebase backend"
git push
```

Your Vercel deployment will automatically pick up the changes.

## Step 7: Test the System

1. **Visit your website** and submit an RSVP
2. **Check Firebase Console** → Firestore Database to see the data
3. **Visit admin panel:** `your-domain.vercel.app/admin`

## Firebase Console Features

### View RSVP Data
- **Go to Firestore Database** in Firebase Console
- **Click on `rsvp_responses` collection**
- **View all submitted RSVPs in real-time**

### Export Data
- **In Firestore Database, click "Export"**
- **Choose JSON or CSV format**
- **Download your RSVP data**

### Monitor Usage
- **Go to "Usage and billing"** in Firebase Console
- **Monitor your free tier usage**

## Security Considerations

### For Production (Optional)
If you want to add authentication to the admin panel:

1. **Enable Authentication** in Firebase Console
2. **Add Email/Password sign-in method**
3. **Update security rules** to require authentication
4. **Add login functionality** to your admin panel

### Current Setup
The current setup allows public access to RSVP submission and viewing, which is perfect for a wedding website where you want guests to easily submit RSVPs.

## Cost
- **Firebase Free Tier** includes:
  - 1GB storage
  - 50,000 reads/day
  - 20,000 writes/day
  - Perfect for wedding RSVPs!

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized" error:**
   - Check your Firebase config in `src/lib/firebase.ts`
   - Ensure all config values are correct

2. **"Permission denied" error:**
   - Check Firestore security rules
   - Ensure rules allow read/write access

3. **Data not appearing:**
   - Check browser console for errors
   - Verify Firestore collection name is `rsvp_responses`

### Testing Locally:
```bash
npm run dev
```
Visit `http://localhost:5173` to test locally.

## Next Steps

1. **Add email notifications** when RSVPs are submitted
2. **Implement RSVP editing** functionality
3. **Add RSVP deadline** features
4. **Create RSVP reminders** for guests who haven't responded

## Support

If you encounter issues:
1. Check Firebase Console for error messages
2. Review browser console for JavaScript errors
3. Verify your Firebase configuration
4. Check Firestore security rules
