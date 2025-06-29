---
title: BYOR - Bring Your Own Renderer
---

You can bring your own renderer using a UI library like React, Preact, Solid, or others.

**Note:** We may not provide support for the renderer you bring.

## React case

You can define a renderer using `@hono/react-renderer`. Install the modules first.

```bash
npm i @hono/react-renderer react react-dom hono
npm i -D @types/react @types/react-dom
```

Define the `Props` that the renderer will receive in `global.d.ts`.

```typescript
// global.d.ts
import '@hono/react-renderer'

declare module '@hono/react-renderer' {
  interface Props {
    title?: string
  }
}
```

The following is an example of `app/routes/_renderer.tsx`.

```tsx
// app/routes/_renderer.tsx
import { reactRenderer } from '@hono/react-renderer'

export default reactRenderer(({ children, title }) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {import.meta.env.PROD ? (
          <script type='module' src='/static/client.js'></script>
        ) : (
          <script type='module' src='/app/client.ts'></script>
        )}
        {title ? <title>{title}</title> : ''}
      </head>
      <body>{children}</body>
    </html>
  )
})
```

The `app/client.ts` will be like this.

```ts
// app/client.ts
import { createClient } from 'honox/client'

createClient({
  hydrate: async (elem, root) => {
    const { hydrateRoot } = await import('react-dom/client')
    hydrateRoot(root, elem)
  },
  createElement: async (type: any, props: any) => {
    const { createElement } = await import('react')
    return createElement(type, props)
  },
})
```

Configure react in `vite.config.ts`.

```typescript
// vite.config.ts
import build from '@hono/vite-build/cloudflare-pages'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: ['./app/client.ts'],
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/assets/[name]-[hash].js',
            assetFileNames: 'static/assets/[name].[ext]',
          },
        },
        emptyOutDir: false,
      },
    }
  } else {
    return {
      ssr: {
        external: ['react', 'react-dom'],
      },
      plugins: [honox(), build()],
    }
  }
})
```

Adjust `tsconfig.json` `jsx` factory function option.

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "jsxImportSource": "react"
    // ...
  }
}
```

### Use React with `<Script />`

If you export a manifest file in `dist/.vite/manifest.json`, you can easily write some codes using `<Script />`.

```tsx
// app/routes/_renderer.tsx
import { reactRenderer } from '@hono/react-renderer'
import { Script } from 'honox/server'

export default reactRenderer(({ children, title }) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <Script src='/app/client.ts' async />
        {title ? <title>{title}</title> : ''}
      </head>
      <body>{children}</body>
    </html>
  )
})
```

Configure react in `vite.config.ts`.

```typescript
// vite.config.ts
import build from '@hono/vite-build/cloudflare-pages'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: ['./app/client.ts'],
        },
        manifest: true,
        emptyOutDir: false,
      },
    }
  } else {
    return {
      ssr: {
        external: ['react', 'react-dom'],
      },
      plugins: [honox(), build()],
    }
  }
})
```
