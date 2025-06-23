import { ThemeProvider } from "../islands/themeProvider";
import { reactRenderer } from "@hono/react-renderer";
import { Link, Script } from "honox/server";
import Header from "../islands/header";
import { cn } from "../islands/utils";

export default reactRenderer(({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {import.meta.env.PROD ? (
          <>
            <Link href="/static/assets/globals.css" rel="stylesheet" />
            <Script src="/static/client.js" async />
          </>
        ) : (
          <>
            <Link href="/app/globals.css" rel="stylesheet" />
            <Script src="/app/client.ts" async />
          </>
        )}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cn(
          "relative isolate min-h-screen bg-background font-sans antialiased",
          ` antialiased`
        )}
      >
        <ThemeProvider defaultTheme={"dark"} storageKey="vite-ui-theme">
          <Header />
          <div className="flex-1">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
});
