# 🎓 Emotional Alchemist Platform - Setup & Development Guide

## ⚡ Quick Start (5 minutes)

### Step 1: Update package.json
Remove `"@supabase/supabase-js": "^2.49.4"` and add these dependencies:

```json
"firebase": "^10.7.0",
"stripe": "^14.8.0",
"stripe-react": "^2.0.0",
"firebase-admin": "^12.0.0"
```

Install: `npm install`

### Step 2: Create Firebase Project
1. Go to https://firebase.google.com
2. 2. Click "Get Started" → Create new project (FREE)
   3. 3. Enable these services:
      4.    - Authentication (Email/Password, Google Sign-in)
            -    - Realtime Database OR Firestore
                 -    - Storage (for video/course files)
                      - 4. Copy your Firebase config and save it
                       
                        5. ### Step 3: Create Project Structure
                        6. Create these folders in `src/`:
                        7. ```
                           src/
                           ├── components/
                           │   ├── auth/
                           │   ├── coach/
                           │   ├── client/
                           │   └── common/
                           ├── pages/
                           ├── hooks/
                           ├── context/
                           ├── utils/
                           ├── types/
                           └── firebase/
                           ```

                           ## 📋 Priority Build Order

                           ### Phase 1: Authentication (Start Here! 🚀)
                           1. **Firebase Config** (`src/firebase/config.ts`)
                           2. 2. **Auth Context** (`src/context/AuthContext.tsx`)
                              3. 3. **Login Page** (`src/pages/Login.tsx`)
                                 4. 4. **Signup Page** (`src/pages/Signup.tsx`)
                                    5. 5. **Protected Routes** (`src/utils/ProtectedRoute.tsx`)
                                      
                                       6. ### Phase 2: Dashboard & Routing
                                       7. 1. **Main App Router** (`src/App.tsx`)
                                          2. 2. **Dashboard Layout** (`src/components/common/Layout.tsx`)
                                             3. 3. **Coach Dashboard** (`src/pages/CoachDashboard.tsx`)
                                                4. 4. **Client Dashboard** (`src/pages/ClientDashboard.tsx`)
                                                  
                                                   5. ### Phase 3: Course Management
                                                   6. 1. **Database Schema** (Firestore collections setup)
                                                      2. 2. **Course Creator Form** (`src/components/coach/CourseForm.tsx`)
                                                         3. 3. **Course Manager Page** (`src/pages/ManageCourses.tsx`)
                                                            4. 4. **Course List Component** (`src/components/coach/CourseList.tsx`)
                                                              
                                                               5. ### Phase 4: Client Learning
                                                               6. 1. **Client Courses Page** (`src/pages/ClientCourses.tsx`)
                                                                  2. 2. **Course Detail Page** (`src/pages/CourseDetail.tsx`)
                                                                     3. 3. **Video Lesson Component** (`src/components/client/LessonViewer.tsx`)
                                                                        4. 4. **Progress Tracker** (`src/utils/progressTracker.ts`)
                                                                          
                                                                           5. ### Phase 5: Membership & Payments
                                                                           6. 1. **Membership Tiers** (`src/types/membership.ts`)
                                                                              2. 2. **Stripe Integration** (`src/stripe/stripe.ts`)
                                                                                 3. 3. **Payment Form** (`src/components/common/PaymentForm.tsx`)
                                                                                    4. 4. **Subscription Manager** (`src/pages/Subscriptions.tsx`)
                                                                                      
                                                                                       5. ### Phase 6: Advanced Features
                                                                                       6. 1. **Messaging System**
                                                                                          2. 2. **Live Session Scheduling**
                                                                                             3. 3. **Analytics Dashboard**
                                                                                                4. 4. **Certificate Generation**
                                                                                                  
                                                                                                   5. ## 🔧 Key Files to Create First
                                                                                                  
                                                                                                   6. ### 1. src/firebase/config.ts
                                                                                                   7. ```typescript
                                                                                                      import { initializeApp } from 'firebase/app';
                                                                                                      import { getAuth } from 'firebase/auth';
                                                                                                      import { getFirestore } from 'firebase/firestore';
                                                                                                      import { getStorage } from 'firebase/storage';

                                                                                                      const firebaseConfig = {
                                                                                                        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
                                                                                                        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
                                                                                                        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
                                                                                                        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
                                                                                                        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
                                                                                                        appId: process.env.REACT_APP_FIREBASE_APP_ID,
                                                                                                      };

                                                                                                      const app = initializeApp(firebaseConfig);
                                                                                                      export const auth = getAuth(app);
                                                                                                      export const db = getFirestore(app);
                                                                                                      export const storage = getStorage(app);
                                                                                                      ```
                                                                                                      
                                                                                                      ### 2. Create .env.local file
                                                                                                      ```
                                                                                                      REACT_APP_FIREBASE_API_KEY=your_api_key
                                                                                                      REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
                                                                                                      REACT_APP_FIREBASE_PROJECT_ID=your_project_id
                                                                                                      REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
                                                                                                      REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
                                                                                                      REACT_APP_FIREBASE_APP_ID=your_app_id
                                                                                                      REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
                                                                                                      ```
                                                                                                      
                                                                                                      ## 📚 Firestore Database Schema
                                                                                                      
                                                                                                      ### Collections to Create:
                                                                                                      
                                                                                                      **users/**
                                                                                                      ```
                                                                                                      {
                                                                                                        uid: string
                                                                                                        email: string
                                                                                                        role: 'coach' | 'client'
                                                                                                        name: string
                                                                                                        avatar: string
                                                                                                        createdAt: timestamp
                                                                                                        subscriptionTier: 'free' | 'basic' | 'pro' | 'premium'
                                                                                                        subscriptionId: string (Stripe)
                                                                                                      }
                                                                                                      ```
                                                                                                      
                                                                                                      **courses/**
                                                                                                      ```
                                                                                                      {
                                                                                                        id: string
                                                                                                        coachId: string
                                                                                                        title: string
                                                                                                        description: string
                                                                                                        thumbnail: string
                                                                                                        price: number
                                                                                                        tier: 'basic' | 'pro' | 'premium'
                                                                                                        modules: []
                                                                                                        createdAt: timestamp
                                                                                                        updatedAt: timestamp
                                                                                                      }
                                                                                                      ```
                                                                                                      
                                                                                                      **modules/**
                                                                                                      ```
                                                                                                      {
                                                                                                        id: string
                                                                                                        courseId: string
                                                                                                        title: string
                                                                                                        lessons: []
                                                                                                        order: number
                                                                                                      }
                                                                                                      ```
                                                                                                      
                                                                                                      **lessons/**
                                                                                                      ```
                                                                                                      {
                                                                                                        id: string
                                                                                                        moduleId: string
                                                                                                        title: string
                                                                                                        videoUrl: string
                                                                                                        content: string
                                                                                                        resources: []
                                                                                                        dripFeedDate: timestamp (when lesson unlocks)
                                                                                                        order: number
                                                                                                      }
                                                                                                      ```
                                                                                                      
                                                                                                      **enrollments/**
                                                                                                      ```
                                                                                                      {
                                                                                                        id: string
                                                                                                        userId: string
                                                                                                        courseId: string
                                                                                                        enrolledAt: timestamp
                                                                                                        progress: 0-100
                                                                                                        completedLessons: string[]
                                                                                                      }
                                                                                                      ```
                                                                                                      
                                                                                                      **memberships/**
                                                                                                      ```
                                                                                                      {
                                                                                                        tier: string
                                                                                                        name: string
                                                                                                        price: number
                                                                                                        features: string[]
                                                                                                        courseLimit: number
                                                                                                        description: string
                                                                                                      }
                                                                                                      ```
                                                                                                      
                                                                                                      ## 🔐 Stripe Setup (Free to Start)
                                                                                                      
                                                                                                      1. Create free Stripe account at https://stripe.com
                                                                                                      2. 2. Get your PUBLIC key (not secret!)
                                                                                                         3. 3. Add to .env.local as `REACT_APP_STRIPE_PUBLIC_KEY`
                                                                                                            4. 4. Install: `npm install @stripe/react-stripe-js @stripe/js`
                                                                                                               5. 5. You only pay when customers actually buy
                                                                                                                 
                                                                                                                  6. ## 📝 Environment Setup
                                                                                                                 
                                                                                                                  7. Create `.env.local` in project root with your credentials.
                                                                                                                  8. Never commit this file! Add to `.gitignore`.
                                                                                                                 
                                                                                                                  9. ## 🚀 Development Commands
                                                                                                                 
                                                                                                                  10. ```bash
                                                                                                                      # Install dependencies
                                                                                                                      npm install

                                                                                                                      # Start dev server
                                                                                                                      npm run dev

                                                                                                                      # Build for production
                                                                                                                      npm run build

                                                                                                                      # Lint code
                                                                                                                      npm lint
                                                                                                                      ```
                                                                                                                      
                                                                                                                      ## 🎯 Next Steps
                                                                                                                      
                                                                                                                      1. **Clone the repo** to your local machine
                                                                                                                      2. 2. **Install dependencies** (`npm install`)
                                                                                                                         3. 3. **Set up Firebase** (follow steps above)
                                                                                                                            4. 4. **Create .env.local** with your config
                                                                                                                               5. 5. **Start with Phase 1** - Authentication
                                                                                                                                  6. 6. **Build incrementally** - test each phase before moving to next
                                                                                                                                    
                                                                                                                                     7. ## 💡 Pro Tips
                                                                                                                                    
                                                                                                                                     8. - Use Firestore Emulator for testing (free, local database)
                                                                                                                                        - - Test Stripe in "test mode" before going live
                                                                                                                                          - - Always use environment variables for secrets
                                                                                                                                            - - Commit to git frequently
                                                                                                                                              - - Test on mobile early and often
                                                                                                                                               
                                                                                                                                                - ## 📞 Support Resources
                                                                                                                                               
                                                                                                                                                - - Firebase Docs: https://firebase.google.com/docs
                                                                                                                                                  - - Stripe Docs: https://stripe.com/docs
                                                                                                                                                    - - React Docs: https://react.dev
                                                                                                                                                      - - TypeScript: https://www.typescriptlang.org/docs
                                                                                                                                                       
                                                                                                                                                        - ## ✅ Checklist to Start Coding
                                                                                                                                                       
                                                                                                                                                        - - [ ] Create Firebase project
                                                                                                                                                          - [ ] - [ ] Save Firebase config
                                                                                                                                                          - [ ] - [ ] Create .env.local file
                                                                                                                                                          - [ ] - [ ] Update package.json with new dependencies
                                                                                                                                                          - [ ] - [ ] Run `npm install`
                                                                                                                                                          - [ ] - [ ] Create folder structure
                                                                                                                                                          - [ ] - [ ] Create src/firebase/config.ts
                                                                                                                                                          - [ ] - [ ] You're ready to build!
                                                                                                                                                         
                                                                                                                                                          - [ ] Good luck! This is going to be an amazing platform! 🚀✨
