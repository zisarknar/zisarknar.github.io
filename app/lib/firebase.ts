'use client'

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAnalytics, Analytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyA2iyI8op3Ii0lrgRPW2MyohHF59Pkiai8",
  authDomain: "zisarkar.firebaseapp.com",
  projectId: "zisarkar",
  storageBucket: "zisarkar.firebasestorage.app",
  messagingSenderId: "27294801630",
  appId: "1:27294801630:web:9b1c82016dfc10b2c5ec4f",
  measurementId: "G-WLGSKHXGSM"
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize Analytics only on client side
let analytics: Analytics | null = null
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

export { app, analytics }
