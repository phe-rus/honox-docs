---
title: Not Found and Error Pages
---

## Not Found page

You can write a custom Not Found page in `_404.tsx`.

```tsx
// app/routes/_404.tsx
import { NotFoundHandler } from 'hono'

const handler: NotFoundHandler = (c) => {
  return c.render(<h1>Sorry, Not Found...</h1>)
}

export default handler
```

## Error Page

You can write a custom Error page in `_error.tsx`.

```tsx
// app/routes/_error.tsx
import { ErrorHandler } from 'hono'

const handler: ErrorHandler = (e, c) => {
  return c.render(<h1>Error! {e.message}</h1>)
}

export default handler
```
