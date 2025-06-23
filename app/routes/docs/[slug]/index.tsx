import { createRoute } from "honox/factory";

export default createRoute((c) => {
  const name = c.req.query("name") ?? "Hono";
  const params = c.req.path

  return c.render(
    <div className="font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-3 space-y-6">
            <div className="text-xl font-semibold text-muted-foreground">Docs</div>
            <nav className="space-y-2 text-sm  text-muted-foreground/85">
              <a href="#getting-started" className="block hover:text-sky-400 transition">
                Getting Started
              </a>
              <a href="#features" className="block hover:text-sky-400 transition">
                Features
              </a>
              <a href="#usage" className="block hover:text-sky-400 transition">
                Usage
              </a>
              <a href="#deployment" className="block hover:text-sky-400 transition">
                Deployment
              </a>
              <a href="#api" className="block hover:text-sky-400 transition">
                API Reference
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-9 space-y-10">
            <section id="getting-started">
              <h1 className="text-3xl font-bold text-white mb-4">Welcome to {name} {params}</h1>
              <p className="text-neutral-300">
                <strong>Hono</strong> – which means flame 🔥 in Japanese – is a small, fast, and modern
                web framework built on Web Standards. It runs on any JavaScript runtime:
                Cloudflare Workers, Fastly Compute, Deno, Bun, Vercel, Netlify, AWS Lambda,
                Lambda@Edge, and Node.js.
              </p>
            </section>

            <section id="features">
              <h2 className="text-2xl font-semibold text-white mb-2">Features</h2>
              <ul className="list-disc pl-5 text-neutral-300 space-y-1">
                <li>Minimal and composable API</li>
                <li>Zero dependency core</li>
                <li>Ultra-fast router and middleware layer</li>
                <li>Type-safe and lightweight</li>
              </ul>
            </section>

            <section id="usage">
              <h2 className="text-2xl font-semibold text-white mb-2">Usage</h2>
              <pre className="bg-neutral-900 text-sm text-neutral-100 p-4 rounded-lg overflow-auto">
                {`import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

export default app`}
              </pre>
            </section>

            <section id="deployment">
              <h2 className="text-2xl font-semibold text-white mb-2">Deployment</h2>
              <p className="text-neutral-300">
                Hono apps can be deployed anywhere: Vercel, Netlify, Deno Deploy, Cloudflare Workers, etc.
              </p>
            </section>

            <section id="api">
              <h2 className="text-2xl font-semibold text-white mb-2">API Reference</h2>
              <p className="text-neutral-300">
                See the full API documentation on <a href="https://hono.dev" className="text-sky-400 underline">hono.dev</a>.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
});
