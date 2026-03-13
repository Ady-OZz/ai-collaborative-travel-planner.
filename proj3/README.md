# AI Collaborative Travel Planner

Production-ready collaborative travel planner built with React, Firebase, and Gemini AI.

## Features
- **Firebase Auth**: Secure login and registration.
- **Firestore**: Real-time collaborative trip storage.
- **Gemini AI**: Intelligent itinerary generation.
- **Vercel**: Serverless backend and SPA hosting.

## Setup Instructions

### 1. Firebase Setup
- Create a project in [Firebase Console](https://console.firebase.google.com/).
- Enable **Authentication** (Email/Password).
- Create a **Firestore Database**.
- In Project Settings, generate a new **Private Key** for the Service Account (for `FIREBASE_PRIVATE_KEY`).
- Create a Web App and copy the client config.

### 2. Gemini AI Setup
- Get an API Key from [Google AI Studio](https://aistudio.google.com/).

### 3. Environment Variables
Create a `.env` file based on `.env.example`:
```
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...

REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...

GEMINI_API_KEY=...
```

### 4. Installation & Local Development
```bash
npm install
cd frontend
npm install
cd ..
npm start
```

## Firestore Rules
```
allow read, write: if request.auth != null;
```

## Deployment
Push your code to GitHub and connect it to Vercel.
Or use the Vercel CLI:
```bash
vercel
```
