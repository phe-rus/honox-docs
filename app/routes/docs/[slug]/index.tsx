import { createRoute } from "honox/factory";
import { docPagesPromise, getMarkdownContent } from "../../../islands/markdownModules";

export default createRoute(async (c) => {
  const docPages = await docPagesPromise; // Await the pre-parsed doc pages
  const slug = c.req.param("slug") ?? docPages[0]?.slug ?? "getting-started"; // Default to the first page or 'getting-started'
  const { contentHtml, title: pageTitle, headings } = await getMarkdownContent(slug); // Renamed title to pageTitle to avoid conflict

  return c.render(
    // The JSX content for the page
    <>
      <title>{pageTitle} | HonoX Docs</title>
      <div className="font-sans">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="md:col-span-3 space-y-6 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="text-xl font-semibold text-muted-foreground">Documentation</div>
              <nav className="space-y-1 text-sm text-muted-foreground/85">
                {docPages.map((page) => (
                  <a
                    key={page.slug}
                    href={`/docs/${page.slug}`}
                    className={`block px-2 py-1.5 rounded-md hover:bg-muted hover:text-foreground transition ${page.slug === slug ? "text-sky-500 font-semibold bg-sky-500/10" : ""
                      }`}
                  >
                    {page.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="md:col-span-9 space-y-6 prose prose-invert max-w-none prose-h1:text-3xl prose-h1:font-bold prose-h1:text-white prose-h1:mb-6 prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-white prose-h2:mt-8 prose-h2:mb-4 prose-headings:text-white prose-a:text-sky-400 hover:prose-a:text-sky-500 prose-strong:text-white prose-code:bg-neutral-800 prose-code:p-0.5 prose-code:px-1.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-pre:bg-neutral-900 prose-pre:p-4 prose-pre:rounded-lg prose-img:rounded-md prose-img:shadow-lg">
              {/* The h1 is already part of the Markdown content, typically */}
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </main>

            {/* Right Sidebar for "On this page" */}
            {headings && headings.length > 0 && (
              <aside className="hidden lg:block md:col-span-2 space-y-4 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pl-4 border-l border-neutral-800">
                <div className="text-sm font-semibold text-muted-foreground">On this page</div>
                <nav className="space-y-1.5 text-xs text-muted-foreground/85">
                  {headings.filter(h => h.level > 1 && h.level < 4).map((heading) => ( // Typically only show h2 and h3
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className="block hover:text-sky-400 transition leading-snug"
                      style={{ marginLeft: `${(heading.level - 2) * 0.75}rem` }} // Indent based on heading level
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>,
    // Props passed to the renderer (app/routes/_renderer.tsx)
    /**{
      // title: `${pageTitle} | HonoX Docs`
    } **/
  );
});
