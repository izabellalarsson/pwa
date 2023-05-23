import { ApiNotification, ApiSubscribe } from '@/interfaces'
import { Notification } from '@/types/Notification'

/**
 * Unsubscribe request
 * @param {*} data
 */
export const apiUnsubscribe = async (subscription: PushSubscription) => {
  const payload: ApiSubscribe = {
    subscription,
    subscribe: false,
  }
  return await fetch('/api/subscription', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

/**
 * Subscribe request
 * @param subscription
 * @returns
 */
export const apiSubscribe = async (subscription: PushSubscription) => {
  const payload: ApiSubscribe = {
    subscription,
    subscribe: true,
  }
  return await fetch('/api/subscription', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

/**
 *
 * @param notification
 * @returns
 */
export const apiNotification = async (notification: Notification) => {
  const payload: ApiNotification = {
    notification,
  }
  return await fetch('/api/notification', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
