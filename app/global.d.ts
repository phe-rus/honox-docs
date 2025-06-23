import type { Context } from 'hono'
import type {} from '@hono/react-renderer'

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: {}
  }
}

declare module '@hono/react-renderer' {
  interface Props extends Context {
    children: React.ReactNode
    c: Context
  }
}

export {}