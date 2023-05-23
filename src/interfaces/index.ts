import { Notification } from '@/types/Notification'

export interface ApiSubscribe {
  subscription: PushSubscription
  subscribe: boolean
}

export interface ApiNotification {
  notification: Notification
}
