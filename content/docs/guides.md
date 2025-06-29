---
title: Guides
---

## Nested Layouts

If you are using the JSX Renderer middleware, you can nest layouts using `<Layout />`.

```tsx
// app/routes/posts/_renderer.tsx
import { jsxRenderer } from 'hono/jsx-renderer'

export default jsxRenderer(({ children, Layout }) => {
  return (
    <Layout>
      <nav>Posts Menu</nav>
      <div>{children}</div>
    </Layout>
  )
})
```

### Passing Additional Props in Nested Layouts

Props passed to nested renderers do not automatically propagate to the parent renderers. To ensure that the parent layouts receive the necessary props, you should explicitly pass them from the nested component. Here's how you can achieve that:

Let's start with our route handler:

```tsx
// app/routes/nested/index.tsx
export default createRoute((c) => {
  return c.render(<div>Content</div>, { title: 'Dashboard' })
})
```

Now, let's take a look at our nested renderer:

```tsx
// app/routes/nested/_renderer.tsx
export default jsxRenderer(({ children, Layout, title }) => {
  return (
    <Layout title={title}> {/* Pass the title prop to the parent renderer */}
      <main>{children}</main>
    </Layout>
  )
})
```

In this setup, all the props sent to the nested renderer's are consumed by the parent renderer:

```tsx
// app/routes/_renderer.tsx
export default jsxRenderer(({ children, title }) => {
  return (
    <html lang='en'>
      <head>
        <title>{title}</title> {/* Use the title prop here */}
      </head>
      <body>
        {children} {/* Insert the Layout's children here */}
      </body>
    </html>
  )
})
```

## Using Middleware

You can use Hono's Middleware in each root file with the same syntax as Hono. For example, to validate a value with the Zod Validator, do the following:

```ts
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const schema = z.object({
  name: z.string().max(10),
})

export const POST = createRoute(zValidator('form', schema), async (c) => {
  const { name } = c.req.valid('form')
  setCookie(c, 'name', name)
  return c.redirect('/')
})
```

Alternatively, you can use a `_middleware.(ts|tsx)` file in a directory to have that middleware applied to the current route, as well as all child routes. Middleware is run in the order that it is listed within the array.

```ts
// /app/routes/_middleware.ts
import { createRoute } from 'honox/factory'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'

export default createRoute(logger(), secureHeaders(), /* ...<more-middleware> */)
```

## Trailing Slash

By default, trailing slashes are removed if the root file is an index file such as `index.tsx` or `index.mdx`. However, if you set the `trailingSlash` option to `true` as the following, the trailing slash is not removed.

```ts
import { createApp } from 'honox/server'

const app = createApp({
  trailingSlash: true,
})
```

Like the followings:

*   `trailingSlash` is `false` (default): `app/routes/path/index.mdx` => `/path`
*   `trailingSlash` is `true`: `app/routes/path/index.mdx` => `/path/`

## Excluding Files and Directories from Routes

By default, directories and files starting with `-` are excluded from routes.

Example:

```
routes/
├── posts.tsx
├── -post-list.tsx     // 👈🏼 ignored
├── -components/       // 👈🏼 ignored
│   ├── header.tsx     // 👈🏼 ignored
│   ├── footer.tsx     // 👈🏼 ignored
│   └── ...
```
In this example, `routes/posts.tsx` is routed to `/posts`, but other items starting with `-` are not routed.

This feature is useful for colocation.

## Using Tailwind CSS

Given that HonoX is Vite-centric, if you wish to utilize Tailwind CSS, basically adhere to the official instructions.

Write `app/style.css`, you must set the base path for source detection explicitly:

```css
@import 'tailwindcss' source('../app');
```

Import it in a renderer file. Using the `Link` component will refer to the correct CSS file path after it is built.

```tsx
// app/routes/_renderer.tsx
import { jsxRenderer } from 'hono/jsx-renderer'
import { Link } from 'honox/server'

export default jsxRenderer(({ children }) => {
  return (
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <Link href='/app/style.css' rel='stylesheet' />
      </head>
      <body>{children}</body>
    </html>
  )
})
```

Finally, add `vite.config.ts` configuration to output assets for the production.

```typescript
import honox from 'honox/vite'
import { defineConfig } from 'vite'
import build from '@hono/vite-build/cloudflare-pages'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    honox({
      client: {
        input: ['/app/style.css'],
      },
    }),
    build(),
    tailwindcss(),
  ],
})
```

## MDX

MDX can also be used. Here is the `vite.config.ts`.

```typescript
import devServer from '@hono/vite-dev-server'
import mdx from '@mdx-js/rollup'
import honox from 'honox/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [
      honox(),
      mdx({
        jsxImportSource: 'hono/jsx',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    ],
  }
})
```

Blog site can be created.

```tsx
// app/routes/index.tsx
import type { Meta } from '../types'

export default function Top() {
  const posts = import.meta.glob<{ frontmatter: Meta }>('./posts/*.mdx', {
    eager: true,
  })
  return (
    <div>
      <h2>Posts</h2>
      <ul class='article-list'>
        {Object.entries(posts).map(([id, module]) => {
          if (module.frontmatter) {
            return (
              <li>
                <a href={`${id.replace(/\.mdx$/, '')}`}>{module.frontmatter.title}</a>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}
```

## Cloudflare Bindings

If you want to use Cloudflare's Bindings in your development environment, create `wrangler.toml` and configure it properly.

```toml
name = "my-project-name"
compatibility_date = "2024-04-01"
compatibility_flags = [ "nodejs_compat" ]
pages_build_output_dir = "./dist"

# [vars]
# MY_VARIABLE = "production_value"

# [[kv_namespaces]]
# binding = "MY_KV_NAMESPACE"
# id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

In `vite.config.ts`, use the Cloudflare Adapter in `@hono/vite-dev-server`.

```typescript
import honox from 'honox/vite'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    honox({
      devServer: {
        adapter,
      },
    }),
  ],
})
```
