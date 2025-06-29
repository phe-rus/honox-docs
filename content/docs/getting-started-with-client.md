---
title: Get Started - with Client
---

Let's create an application that includes a client side. Here, we will use `hono/jsx/dom`.

## Project Structure

Below is the project structure of a minimal application including a client side:

```
.
├── app
│   ├── client.ts // client entry file
│   ├── global.d.ts
│   ├── islands
│   │   └── counter.tsx // island component
│   ├── routes
│   │   ├── _renderer.tsx
│   │   └── index.tsx
│   └── server.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Renderer

This is a `_renderer.tsx`, which will load the `/app/client.ts` entry file for the client. It will load the JavaScript file for production according to the variable `import.meta.env.PROD`. And renders the inside of `<HasIslands />` if there are islands on that page.

```tsx
// app/routes/_renderer.tsx
import { jsxRenderer } from 'hono/jsx-renderer'
import { HasIslands } from 'honox/server'

export default jsxRenderer(({ children }) => {
  return (
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {import.meta.env.PROD ? (
          <HasIslands>
            <script type='module' src='/static/client.js'></script>
          </HasIslands>
        ) : (
          <script type='module' src='/app/client.ts'></script>
        )}
      </head>
      <body>{children}</body>
    </html>
  )
})
```

If you have a manifest file in `dist/.vite/manifest.json`, you can easily write it using `<Script />`.

```tsx
// app/routes/_renderer.tsx
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

export default jsxRenderer(({ children }) => {
  return (
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <Script src='/app/client.ts' />
      </head>
      <body>{children}</body>
    </html>
  )
})
```

**Note:** Since `<HasIslands />` can slightly affect build performance when used, it is recommended that you do not use it in the development environment, but only at build time. `<Script />` does not cause performance degradation during development, so it's better to use it.

### `nonce` Attribute

If you want to add a `nonce` attribute to `<Script />` or `<script />` element, you can use Security Headers Middleware.

Define the middleware:

```ts
// app/routes/_middleware.ts
import { createRoute } from 'honox/factory'
import { secureHeaders, NONCE } from 'hono/secure-headers'

export default createRoute(
  secureHeaders({
    contentSecurityPolicy: {
      scriptSrc: [NONCE],
    },
  })
)
```

You can get the `nonce` value with `c.get('secureHeadersNonce')`:

```tsx
// app/routes/_renderer.tsx
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

export default jsxRenderer(({ children }, c) => {
  return (
    <html lang='en'>
      <head>
        <Script src='/app/client.ts' async nonce={c.get('secureHeadersNonce')} />
      </head>
      <body>{children}</body>
    </html>
  )
})
```

## Client Entry File

A client-side entry file should be in `app/client.ts`. Simply, write `createClient()`.

```ts
// app/client.ts
import { createClient } from 'honox/client'

createClient()
```
