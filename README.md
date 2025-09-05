# The Govind Pathak Academy

Modern course-selling platform built with Next.js (App Router) + Tailwind, MongoDB, and Razorpay placeholder.

## Setup

1. Copy `.env.example` to `.env.local` and fill values:

```
MONGODB_URI=...
MONGODB_DB_NAME=...
JWT_SECRET=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

2. Install dependencies:

```
npm install
```

3. Run dev server:

```
npm run dev
```

## Structure

- Public pages: `/`, `/courses`, `/course/[slug]`, `/about`, `/contact`, `/success`
- Admin: `/admin/login`, `/admin/dashboard`, `/admin/orders`
- API: `/api/courses`, `/api/orders`, `/api/admin/login`, `/api/payments/razorpay`

## Notes

- Admin routes are protected by middleware checking a JWT cookie.
- Payments are placeholders; wire Razorpay frontend and webhook later.
- Course delivery (email/WhatsApp) is stubbed; integrate providers later.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
