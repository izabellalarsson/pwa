import webPush from 'web-push'
import { ApiNotification } from '@/interfaces'
import { NextResponse } from 'next/server'
import { getCache, hasCache, setCache } from '@/helpers/cache'
import { CACHE_KEY } from '@/helpers/constants'

/**
 * Setup Vapid credentials
 */
webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY as string,
  process.env.WEB_PUSH_PRIVATE_KEY as string
)

/**
 * Listen to POST request
 * @param request
 * @returns
 */
export async function POST(request: Request) {
  const { notification }: ApiNotification = await request.json()

  const cache = await hasCache(CACHE_KEY.subscribers)
  let subscribers: PushSubscription[] = cache
    ? await getCache(CACHE_KEY.subscribers)
    : []
  let updatedSubscribers = subscribers

  /**
   * Notify all active subscribers...
   */
  if (subscribers.length) {
    for await (const subscriber of subscribers) {
      await webPush
        .sendNotification(subscriber as any, JSON.stringify(notification))
        .catch(() => {
          console.log('Old or invalid subscription, remove...')
          // Remove if error
          updatedSubscribers = updatedSubscribers.filter(
            (s) => s.endpoint !== subscriber.endpoint
          )
        })
    }
  }

  // Update if we removed subscribers...
  if (subscribers?.length !== updatedSubscribers?.length) {
    setCache(CACHE_KEY.subscribers, updatedSubscribers)
  }

  return NextResponse.json({})
}
