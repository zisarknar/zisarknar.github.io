'use client'

import { useEffect } from 'react'
import { analytics } from '../lib/firebase'

export default function FirebaseAnalytics() {
  useEffect(() => {
    // Analytics is automatically initialized when imported
    // You can log custom events here if needed
    if (analytics) {
      console.log('Firebase Analytics initialized')
    }
  }, [])

  return null
}
