'use client'
import { Toaster } from '@/components/Toaster'
import { useNotifications } from '@/hooks/useNotifications'
import { useServiceWorker } from '@/hooks/useServiceWorker'
import { string } from 'prop-types'
import { useState } from 'react'

export default function Home() {
  // Enable service worker...
  useServiceWorker()
  const {
    isSupported,
    isActive,
    handleSubscribe,
    handleUnsubscribe,
    handleClientNotification,
    handleSendNotification,
    handleBadgeCount,
  } = useNotifications()

  if (!isSupported) {
    return <div>Not supported...</div>
  }

  return (
    <main className=''>
      <header className='flex justify-center my-16'>
        <h1 className='text-3xl font-sans font-medium'>
          PWA & push notifications
        </h1>
      </header>
    </main>
  )
}