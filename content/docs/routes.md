---
title: Routes
---

There are three ways to define routes.

### 1. `createRoute()`

Each route should return an array of `Handler | MiddlewareHandler`. `createRoute()` is a helper function to return it. You can write a route for a GET request with default export.

```tsx
// app/routes/index.tsx
// `createRoute()` helps you create handlers
import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>Hello!</h1>
    </div>
  )
})
```

You can also handle methods other than GET by export `POST`, `PUT`, and `DELETE`.

```tsx
// app/routes/index.tsx
import { createRoute } from 'honox/factory'
import { getCookie, setCookie } from 'hono/cookie'

export const POST = createRoute(async (c) => {
  const { name } = await c.req.parseBody<{ name: string }>()
  setCookie(c, 'name', name)
  return c.redirect('/')
})

export default createRoute((c) => {
  const name = getCookie(c, 'name') ?? 'no name'
  return c.render(
    <div>
      <h1>Hello, {name}!</h1>
      <form method='POST'>
        <input type='text' name='name' placeholder='name' />
        <input type='submit' />
      </form>
    </div>
  )
})
```

### 2. Using a Hono instance

You can create API endpoints by exporting an instance of the `Hono` object.

```ts
// app/routes/about/index.ts
import { Hono } from 'hono'

const app = new Hono()

// matches `/about/:name`
app.get('/:name', (c) => {
  const name = c.req.param('name')
  return c.json({
    'your name is': name,
  })
})

export default app
```

### 3. Just return JSX

Or simply, you can just return JSX.

```tsx
// app/routes/index.tsx
export default function Home(_c: Context) {
  return <h1>Welcome!</h1>
}
```
