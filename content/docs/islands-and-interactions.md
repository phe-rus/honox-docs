---
title: Interactions (Islands)
---

If you want to add interactions to your page, create Island components. Islands components should be:

*   Placed under `app/islands` directory or named with `$` prefix like `$componentName.tsx`.
*   It should be exported as a default or a proper component name that uses camel case but does not contain `_` and is not all uppercase.

For example, you can write an interactive component such as the following counter:

```tsx
// app/islands/counter.tsx
import { useState } from 'hono/jsx'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

When you load the component in a route file, it is rendered as Server-Side rendering and JavaScript is also sent to the client side.

```tsx
// app/routes/index.tsx
import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>Hello</h1>
      <Counter />
    </div>
  )
})
```

**Note:** You cannot access a Context object in Island components. Therefore, you should pass the value from components outside of the Island.

```tsx
import { useRequestContext } from 'hono/jsx-renderer'
import Counter from '../islands/counter.tsx'

export default function Component() {
  const c = useRequestContext()
  return <Counter init={parseInt(c.req.query('count') ?? '0', 10)} />
}
```
