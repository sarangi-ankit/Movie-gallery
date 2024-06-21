This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

1. Debounce for Search Items
The search functionality is debounced using the useDebounce hook to reduce API requests frequency while typing.

2. TypeScript Integration
The entire project is built using TypeScript for static typing and improved code quality.

3. Framer Motion for Animation
Animations are implemented using Framer Motion to create smooth transitions and interactive elements.

4. Lazy Loading for Item Display
Lazy loading is implemented to optimize performance by loading items dynamically as the user scrolls, reducing initial load time.

Technology Stack
Next.js: React framework for server-rendered applications.
TypeScript: Provides static typing and enhances code maintainability.
Framer Motion: Used for animations and transitions.
Use Debounce: Custom hook for debouncing user input.
Lazy Loading: Implemented for efficient rendering of large item lists.

## Deploy on Netlify

Netlify Link- https://teal-crepe-508d72.netlify.app
