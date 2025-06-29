---
title: Get Started - Basic
---

Let's create a basic HonoX application using `hono/jsx` as a renderer. This application has no client JavaScript and renders JSX on the server side.

## Project Structure

Below is a typical project structure for a HonoX application.

```
.
├── app
│   ├── global.d.ts // global type definitions
│   ├── routes
│   │   ├── _404.tsx // not found page
│   │   ├── _error.tsx // error page
│   │   ├── _renderer.tsx // renderer definition
│   │   ├── merch
│   │   │   └── [...slug].tsx // matches /merch/:category, /merch/:category/:item, /merch/:category/:item/:variant
│   │   ├── about
│   │   │   └── [name].tsx // matches /about/:name
│   │   ├── blog
│   │   │   ├── index.tsx // matches /blog
│   │   │   └── (content)
│   │   │       ├── _renderer.tsx // renderer definition for routes inside this directory
│   │   │       └── [name].tsx    // matches /blog/:name
│   │   └── index.tsx // matches /
│   └── server.ts // server entry file
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## vite.config.ts

The minimum Vite setup for development is as follows:

```typescript
import { defineConfig } from 'vite'
import honox from 'honox/vite'

export default defineConfig({
  plugins: [honox()],
})
```

## Server Entry File

A server entry file is required. The file should be placed at `app/server.ts`. This file is first called by the Vite during the development or build phase.

In the entry file, simply initialize your app using the `createApp()` function. `app` will be an instance of Hono, so you can use Hono's middleware and the `showRoutes()` in `hono/dev`.

```typescript
// app/server.ts
import { createApp } from 'honox/server'
import { showRoutes } from 'hono/dev'

const app = createApp()

showRoutes(app)

export default app
```
