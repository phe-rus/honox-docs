---
title: Renderer
---

Define your renderer - the middleware that does `c.setRender()` - by writing it in `_renderer.tsx`.

Before writing `_renderer.tsx`, write the `Renderer` type definition in `global.d.ts`.

```typescript
// app/global.d.ts
import type {} from 'hono'

type Head = {
  title?: string
}

declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}
```

The JSX Renderer middleware allows you to create a Renderer as follows:

```tsx
// app/routes/_renderer.tsx
import { jsxRenderer } from 'hono/jsx-renderer'

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {title ? <title>{title}</title> : <></>}
      </head>
      <body>{children}</body>
    </html>
  )
})
```

The `_renderer.tsx` is applied under each directory, and the `app/routes/posts/_renderer.tsx` is applied in `app/routes/posts/*`.
