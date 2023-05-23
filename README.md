# Raket - PWA & push notifications

Repository for lecture and workshop about PWA:s and push notifications.

---

## Browsers

Safari
- macOS 13 and later
- IOS 16.4

Chrome
- Down for whatever

---

## Setup

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Tailwind framework is installed:

[https://tailwindcss.com/](https://tailwindcss.com/) - Read more

[https://tailwindcss.com/docs/](https://tailwindcss.com/docs/) - Docs

[https://tailwindui.com/components](https://tailwindui.com/components) - Components

Typescript:

[https://www.typescriptlang.org/](https://www.typescriptlang.org/)

**Install dependencies:**

```
npm install
# or
yarn install
```

**Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Settings:**

Copy `.env.example` into `.env`
and generate Vapid keys from this url:
[https://vapidkeys.com/](https://vapidkeys.com/)

```
WEB_PUSH_EMAIL=""
WEB_PUSH_PRIVATE_KEY=""
NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY=""
```

***Vapid*** keys, whut? Read at bottom. ⬇️

**Files**

`/src/app/page.tsx` - Front page

`/src/app/api/subscription/route.ts` - API route for enable/disable subscriptions

`/src/app/api/subscription/route.ts` - API route for sending server notification

`/public/sw.js` - Service worker settings

`/src/hooks/useNotifications.ts` - Hook with notification handlers

`/src/app/demo/page.tsx` - Demo page

---

## Tasks

**Installation**
- [ ] Install project
- [ ] Generate Vapid keys, put in `.env`

**Main tasks**
- [ ] 1. Ask user for permission to send notifications with `handleSubscribe`
- [ ] 2. Ask user for permission to send notifications
- [ ] 3. Send a server notification
- [ ] 4. Manage to send a server notification to multiple units at the same time

**Other tasks**
- [ ] Be creative!
- [ ] Update badge count on home screen
- [ ] Rebuild cache to a database:ish solution like [Mongodb](https://www.mongodb.com/), [Redis](https://vercel.com/integrations/upstash), [MySQL](https://planetscale.com/)
- [ ] Deploy to preffered host [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/)


---

## Vapid keys

VAPID, which stands for Voluntary Application Server Identity, is a new way to send and receive website push notifications. Your VAPID keys allow you to send web push campaigns without having to send them through a service like Firebase Cloud Messaging (or FCM). Instead, the application server can voluntarily identify itself to your web push provider.

[https://vapidkeys.com/](https://vapidkeys.com/)
