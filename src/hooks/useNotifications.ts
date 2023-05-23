import { MouseEvent, useEffect, useState } from 'react'
import { base64ToUint8Array } from '@/helpers/utilities'
import { Notification } from '@/types/Notification'
import { apiNotification, apiSubscribe, apiUnsubscribe } from '@/helpers/api'

/**
 * Use notification
 */
export const useNotifications = () => {
  const [isSupported, setIsSupported]: [isSupported: boolean, setIsSupported: any] =
  useState(true)
  const [isActive, setIsActive]: [isActive: boolean, setIsActive: any] =
    useState(false)
  const [badgeCount, setBadgeCount]: [badgeCount: number, setBadgeCount: any] =
    useState(0)
  const [subscription, setSubscription]: [
    subscription: PushSubscription | any,
    setSubscription: any
  ] = useState(null)
  const [registration, setRegistration]: any = useState(null)

  const navigatorReady =
    typeof window !== 'undefined' && 'serviceWorker' in navigator

  /**
   * Get subscription
   */
  useEffect(() => {
    if (navigatorReady) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        // Supported?
        if (!reg?.pushManager) {
          setIsSupported(false)
          return
        }
        reg?.pushManager?.getSubscription().then((sub) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub)
            setIsActive(true)
          }
        })
        setRegistration(reg)
      })
    }
  }, [navigatorReady])

  /**
   * Subsciption
   * @param event
   */
  const handleSubscribe = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const key = process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY as string
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(key),
    })
    if (sub) {
      setSubscription(sub)
      setIsActive(true)
      apiSubscribe(sub)
    }
  }

  /**
   * Handle un
   * @param event
   */
  const handleUnsubscribe = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!subscription) return
    await subscription.unsubscribe()
    apiUnsubscribe(subscription)
    setSubscription(null)
    setIsActive(false)
  }

  /**
   * Handle send notification
   * @returns
   */
  const handleSendNotification = async (notification: Notification) => {
    apiNotification(notification)
  }

  /**
   * Handle Client Poll
   */
  const handleClientPoll = async (notification: Notification) => {
    registration.showNotification(notification.title, {
      body: notification.message,
      actions: [
        {
          action: 'yes',
          type: 'button',
          title: '👍 Yes',
        },
        {
          action: 'no',
          type: 'text',
          title: '👎 No (explain why)',
          placeholder: 'Type your explanation here',
        },
      ],
    })
  }

  /**
   * Handle Client notification
   */
  const handleClientNotification = async (notification: Notification) => {
    registration.showNotification(notification.title, {
      body: notification.message,
    })
  }

  /**
   * Handle badge count
   * @param number
   */
  const handleBadgeCount = (number: number) => {
    if (number <= 0) {
      ;(navigator as any).clearAppBadge()
    } else {
      ;(navigator as any).setAppBadge(3)
    }
  }

  return {
    isSupported,
    isActive,
    badgeCount,

    handleSubscribe,
    handleUnsubscribe,
    handleSendNotification,
    handleClientPoll,
    handleClientNotification,
    handleBadgeCount,
  }
}
