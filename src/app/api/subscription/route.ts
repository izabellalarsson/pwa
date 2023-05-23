import { getCache, hasCache, setCache } from '@/helpers/cache'
import { CACHE_KEY } from '@/helpers/constants'
import { ApiSubscribe } from '@/interfaces'
import { NextResponse } from 'next/server'

/**
 * Listen to POST request
 * @param request
 * @returns
 */
export async function POST(request: Request) {
  const { subscription, subscribe }: ApiSubscribe = await request.json()
  const cache = await hasCache('subscribers')
  let subscribers: PushSubscription[] = cache
    ? await getCache(CACHE_KEY.subscribers)
    : []

  /**
   * Subscribe?
   * Add subscription to cache
   */
  if (subscribe) {
    subscribers = [...subscribers, subscription]
  }

  /**
   * Unsubscribe
   * Remove subscription from cache
   */
  if (!subscribe) {
    subscribers = subscribers.filter(
      (s) => s.endpoint !== subscription.endpoint
    )
  }

  await setCache(CACHE_KEY.subscribers, subscribers)
  return NextResponse.json({})
}
