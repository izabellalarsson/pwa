'use client'
import { Toaster } from '@/components/Toaster'
import { useNotifications } from '@/hooks/useNotifications'
import { useServiceWorker } from '@/hooks/useServiceWorker'
import { useState } from 'react'

const COMPONENTS = {
  button:
    'mx-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
  buttonPassive:
    'mx-4 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
}

export default function Demo() {
  const [toasterMessage, setToasterMessage] = useState('')
  const [title, setTitle] = useState('This is a title')
  const [message, setMessage] = useState('This is a message')

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

      {!isActive && (
        <>
          <section className='flex justify-center'>
            <button className={COMPONENTS.button} onClick={handleSubscribe}>
              Allow notifications
            </button>
          </section>
        </>
      )}
      {isActive && (
        <>
          <section className=''>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
              <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <div className='space-y-6'>
                  <div>
                    <label
                      htmlFor='title'
                      className='block text-sm font-medium leading-6 text-white'
                    >
                      Title
                    </label>
                    <div className='mt-2'>
                      <input
                        name='title'
                        type='text'
                        autoComplete='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className='block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div>
                    <div className='flex items-center justify-between'>
                      <label
                        htmlFor='message'
                        className='block text-sm font-medium leading-6 text-white'
                      >
                        Message
                      </label>
                    </div>
                    <div className='mt-2'>
                      <input
                        name='message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type='text'
                        required
                        className='block w-full rounded-md border-0 bg-white/5 py-1.5 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <button
                className={COMPONENTS.button}
                onClick={() =>
                  handleClientNotification({
                    title,
                    message,
                  })
                }
              >
                Client notification
              </button>
              <button
                className={COMPONENTS.button}
                onClick={() =>
                  handleSendNotification({
                    title,
                    message,
                  })
                }
              >
                Server notification
              </button>
            </div>
            <div className='flex justify-center mt-8'>
              <button
                className={COMPONENTS.button}
                onClick={() => {
                  handleBadgeCount(3)
                  setToasterMessage('Badge count updated')
                }}
              >
                Badge count +
              </button>
              <button
                className={COMPONENTS.button}
                onClick={() => {
                  handleBadgeCount(0)
                  setToasterMessage('Badge count cleared')
                }}
              >
                Badge count clear
              </button>
            </div>
            <div className='flex justify-center mt-8'>
              <button
                className={COMPONENTS.buttonPassive}
                onClick={(e) => {
                  handleUnsubscribe(e)
                  setToasterMessage('Disabled notifications')
                }}
              >
                Disable notifications
              </button>
            </div>
          </section>
        </>
      )}

      <Toaster message={toasterMessage} />
    </main>
  )
}
