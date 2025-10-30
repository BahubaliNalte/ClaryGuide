# ClaryGuide

ClaryGuide is a Next.js (App Router) project that helps students discover careers, connect with mentors, and manage mentorship sessions. This repository includes front-end pages, a simple mentor registration/login flow, an admin dashboard, and Firebase (Realtime Database + Authentication) integration for user/mentor data and session management.

---

## Table of Contents

- Project overview
- Key features
- Architecture
- Firebase setup (what this project expects)
- Environment variables
- How mentor flow works (Admin → Assign → Mentor Accept → Schedule)
- Run locally
- Recommended Firebase Realtime Database rules (example)
- Next steps & improvements
- Troubleshooting

---

## Project overview

This is a learning/productivity web app built with Next.js and Firebase. It provides:

- Public pages (home, features, contact, chatbot, career tools)
- Mentor flow:
  - Mentor registration and login (client-side using Firebase Auth)
  - Admin assigns incoming mentor requests to mentors
  - Mentors accept/reject assigned requests
  - Accepted requests appear in the mentor's schedule
- Admin dashboard to review users, contact submissions, and manage mentor requests


## Key features implemented

- Mentor registration and login (client-side Firebase Authentication)
- Mentor profile stored in Firebase Realtime Database under `mentors/{uid}`
- Admin page (`/admin`) to view users, contact submissions, mentor requests and assign requests to mentors
- Admin can send meeting links; if a request is assigned, the meeting link is propagated to that mentor's schedule so they can see it
- Mentor pages:
  - `/mentor` — Mentor portal (links to Requests and Schedule); hides register/login when mentor is signed in
  - `/mentor/register` — Mentor registration
  - `/mentor/login` — Mentor login
  - `/mentor/requests` — Mentor sees assigned requests and can Accept/Reject
  - `/mentor/schedule` — Mentor's accepted requests (schedule)
- Client-side protections (pages check auth + mentor existence in DB). Consider these a convenience layer — secure DB rules are still required


## Architecture and important files

- `app/` — Next.js app routes and pages
  - `app/page.tsx` — Home page
  - `app/mentor/*` — Mentor pages (register/login/portal/requests/schedule/profile)
  - `app/admin/page.tsx` — Admin dashboard
  - `app/mentorreq/page.tsx` — Public mentorship request form (mentees use this)
- `components/Navbar.tsx` — site navigation
- `firebaseConfig.ts` — Firebase initialization (exports `app`, `auth`, `db` (Realtime), `firestore` if needed)
- `pages/api/mentor/*` — (legacy) API routes — note: most flows are implemented client-side now


## Firebase setup (what this project expects)

This project uses Firebase Authentication and Firebase Realtime Database (and optionally Firestore). Before running locally:

1. Create a Firebase project (https://console.firebase.google.com)
2. Enable Email/Password sign-in under Authentication → Sign-in method
3. Create a Realtime Database instance (in test mode initially while developing)
4. (Optional) Create a Firestore database if you want to keep Firestore usage — but current production flows store mentor profiles in Realtime DB


## Environment variables

Create a `.env.local` file in the project root with the following variables (example names — these are referenced in `firebaseConfig.ts`):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=1:...:web:...
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXX
```

Do not commit `.env.local` to version control.


## How mentor/admin flow works (data shape)

High-level flow:

1. A mentee submits a request (writes to `mentor_requests/{requestId}`)
2. Admin reviews requests at `/admin` and chooses a mentor from a dropdown. When assigned the code writes:
   - `mentor_requests/{requestId}.assignedTo = mentorUid`
   - `mentor_requests/{requestId}.assignedToEmail = mentorEmail`
   - `mentor_requests/{requestId}.status = 'assigned'`
   - `mentor_requests/{requestId}.assignedAt = timestamp`
   - `mentors/{mentorUid}/assignedRequests/{requestId} = true` (simple reference)
3. The assigned mentor sees assigned requests on `/mentor/requests` (page filters where `assignedTo === mentorUid`) and can Accept or Reject.
   - Accept: sets `mentor_requests/{requestId}.status = 'accepted'`, writes `acceptedAt/acceptedBy` and copies the request under `mentors/{mentorUid}/schedule/{requestId}`.
   - Reject: sets `mentor_requests/{requestId}.status = 'rejected'`, writes `rejectedAt/rejectedBy`.
4. The schedule page listens to `mentors/{mentorUid}/schedule` so accepted requests appear automatically in `/mentor/schedule`.
5. Admin can also send a meeting link for a request; if request already assigned, admin's send-link handler updates `mentors/{assignedUid}/schedule/{requestId}.meetingLink` so mentors can see it.


## Recommended Realtime Database rules (starter)

Below is a simple starting point — you must adapt these for your exact security requirements. Put these in the Realtime Database rules in the Firebase Console.

Warning: these examples are simplified for development. Harden them before production.

```json
{
  "rules": {
    "mentor_requests": {
      ".read": "auth != null",         // allow authenticated users to read requests (change as needed)
      ".write": "auth != null"
    },
    "mentors": {
      "$uid": {
        ".read": "auth != null && (auth.uid == $uid || root.child('admins').child(auth.uid).exists())",
        ".write": "auth != null && (auth.uid == $uid || root.child('admins').child(auth.uid).exists())"
      }
    },
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "admins": {
      ".read": "auth != null && root.child('admins').child(auth.uid).exists()",
      ".write": "false"
    }
  }
}
```

Notes:
- You should maintain an `admins/{uid}: true` map and only allow admin writes from known admin UIDs, or handle admin actions via a secure server function.
- For write operations that should only be performed by admins (assigning requests), either gate them by `admins` or move those actions to server-side functions to avoid client-side abuse.


## Run locally

Install dependencies and run the dev server (PowerShell example):

```powershell
cd "D:\Web Dev Projects\ClaryGuide"
npm install
npm run dev
```

Open http://localhost:3000


## Testing the mentor flow (quick)

1. Add your Firebase env vars to `.env.local`.
2. Start dev server.
3. Register a mentor at `/mentor/register`.
4. Create a mentor request via the public mentor request form (`/mentorreq`) or seed `mentor_requests` in the Realtime DB.
5. Log in as admin (email used in `app/admin/page.tsx` auth check) and assign the request to a mentor in the Admin dashboard.
6. Log in as the assigned mentor, visit `/mentor/requests` and Accept the request.
7. Visit `/mentor/schedule` — the accepted request should appear there.


## Troubleshooting

- "Cannot find module '../../firebaseConfig'" — ensure `firebaseConfig.ts` exists and exports `app`, `auth`, and `db`.
- Authentication errors — confirm Firebase Auth Email/Password is enabled and env vars are correct.
- Realtime DB permission denied — update your Realtime Database rules for testing or add admin rules.


## Next steps & suggestions

- Harden Firebase DB rules and move sensitive actions (assigning requests) to server-side callable functions to prevent client-side abuse.
- Add notifications when admin assigns a request or sends a meeting link (write to `mentors/{uid}/notifications`).
- Replace simple `assignedRequests/{id}: true` with a richer summary for faster mentor listing.
- Add email notifications or in-app notifications when a request is assigned/accepted/rejected.
- Add tests for UI flows and E2E tests for the mentor request lifecycle.


---

If you want, I can also:

- Add a brief Developer Quickstart section with sample env values and Firebase console steps.
- Provide hardened example Realtime DB rules tailored to your exact flows (admin-only assignment, mentors can accept only assigned requests, etc.).

Tell me which you'd like next and I will add it to this README or implement it in code.
