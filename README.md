<div align="center">

<!-- Animated Banner -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:FF6B35,50:F7931E,100:FFD700&height=200&section=header&text=GYM%20⏱&fontSize=80&fontColor=fff&fontAlignY=38&desc=Workout%20Stopwatch%20App&descAlignY=60&descSize=20&animation=fadeIn"/>

<br/>

**Track every rep. Own every second.**

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-gym--gymers.vercel.app-FF6B35?style=for-the-badge&logoColor=white)](https://gym-gymers.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)

</div>

---

## 🔥 What is GYM?

**GYM** is a **precision workout stopwatch** built for athletes who take their training seriously. Start, pause, resume, and save your exercise times — all synced to the cloud so your data is always there when you come back.

No fluff. Just your workout, timed perfectly.

---

## ✨ Features

| Feature | Description |
|---|---|
| ⏱ **Stopwatch** | Start, pause, and resume with zero lag |
| 💾 **Save Times** | Log each exercise's duration instantly |
| ☁️ **Cloud Sync** | Firebase-powered — your data survives app restarts |
| 🔐 **Auth** | Secure, personal workout history per user |
| 📱 **Responsive** | Pixel-perfect on mobile and desktop |

---

## 🛠 Tech Stack

```
React 18 + TypeScript    →  Type-safe, component-driven UI
Vite                     →  Lightning-fast dev & build
Firebase (Auth + Firestore) →  Auth & real-time cloud storage
Zustand                  →  Lightweight global state
Tailwind CSS + shadcn/ui →  Utility-first styling + accessible components
React Router             →  Client-side navigation
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/M1rzo99/GYM
cd GYM
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Firebase
```bash
cp .env.example .env
```

Open `.env` and fill in your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Don't have a Firebase project?** → [Create one here](https://console.firebase.google.com) (free tier works perfectly)

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 5. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Route-level views
├── store/            # Zustand state management
├── lib/              # Firebase config & utilities
└── types/            # TypeScript interfaces
```

---

## 🌐 Live Demo

**[gym-gymers.vercel.app](https://gym-omega-nine.vercel.app/)** — (Not yet done it. working on) deployed on Vercel, powered by Firebase.

---

<div align="center">

**Built with 💪 by [M1rzo99](https://github.com/M1rzo99)**

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:FFD700,50:F7931E,100:FF6B35&height=100&section=footer&animation=fadeIn"/>

</div>
