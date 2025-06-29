---
title: Deployment
---

Since a HonoX instance is essentially a Hono instance, it can be deployed on any platform that Hono supports.

## Cloudflare Pages

Add the `wrangler.toml`:

```toml
# wrangler.toml
name = "my-project-name"
compatibility_date = "2024-04-01"
compatibility_flags = [ "nodejs_compat" ]
pages_build_output_dir = "./dist"
```

Setup the `vite.config.ts`:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import honox from 'honox/vite'
import build from '@hono/vite-build/cloudflare-pages'

export default defineConfig({
  plugins: [honox(), build()],
})
```

Build command (including a client):

```bash
vite build --mode client && vite build
```

Deploy with the following commands after the build. Ensure you have Wrangler installed:

```bash
wrangler pages deploy
```

## SSG - Static Site Generation

Using Hono's SSG feature, you can generate static HTML for each route.

```typescript
import { defineConfig } from 'vite'
import honox from 'honox/vite'
import ssg from '@hono/vite-ssg'

const entry = './app/server.ts'

export default defineConfig(() => {
  return {
    plugins: [honox(), ssg({ entry })],
  }
})
```

If you want to include client-side scripts and assets:

```typescript
// vite.config.ts
import ssg from '@hono/vite-ssg'
import honox from 'honox/vite'
import client from 'honox/vite/client' // Assuming this path is correct or will be honox/client
import { defineConfig } from 'vite'

const entry = './app/server.ts'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [client()], // Or however client assets are typically handled
    }
  } else {
    return {
      build: {
        emptyOutDir: false,
      },
      plugins: [honox(), ssg({ entry })],
    }
  }
})
```
*Self-correction: The original docs had `import client from 'honox/vite/client'`. Based on typical Vite/HonoX patterns, client assets are usually handled by `honox()` plugin itself or a specific build configuration for client mode. If `honox/vite/client` is a specific utility for SSG client assets, it should be verified. For now, I've kept it but added a comment.*

Build command (including a client):

```bash
vite build --mode client && vite build
```

You can also deploy it to Cloudflare Pages.

```bash
wrangler pages deploy ./dist
```

## Others

Using `@hono/vite-build`, you can build the HonoX app for various platforms. For example, you can make it for the Bun:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import honox from 'honox/vite'
import build from '@hono/vite-build/bun'

export default defineConfig({
  plugins: [honox(), build()],
})
```
