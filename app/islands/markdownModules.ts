import matter from 'gray-matter';
import { marked } from "marked";

// Type for the frontmatter
export interface Frontmatter {
    title?: string;
}

// Type for the imported Markdown modules
export interface MarkdownModule {
    default: string; // This will hold the raw Markdown string
    frontmatter: Frontmatter;
}

// Type for individual heading
export interface HeadingInfo {
    level: number;
    text: string;
    id: string;
}

// Use Vite's import.meta.glob to import all .md files from content/docs
// IMPORTANT: For this to work effectively and provide raw content for gray-matter,
// we need to import them as raw strings.
export const markdownModules = import.meta.glob<{ default: string }>("../../../../content/docs/*.md", {
    query: "?raw",
    import: "default", // Vite expects 'default' when query is used for raw content
    eager: true, // Eagerly load them
});

// Pre-parse frontmatter for all pages to build the sidebar
// This will now happen once when the module is loaded.
export const docPagesPromise = (async () => {
    const matter = (await import("gray-matter")).default;
    return Object.entries(markdownModules).map(([path, rawContent]) => {
        const slug = path.split("/").pop()?.replace(".md", "") ?? "";
        // Ensure rawContent is treated as a string, as per the glob import type
        const { data } = matter(rawContent);
        return {
            slug,
            title: (data as Frontmatter).title ?? "Untitled",
        };
    }).sort((a, b) => a.title.localeCompare(b.title));
})();

export const docPages = Object.entries(markdownModules).map(([path, rawContent]) => {
    const slug = path.split("/").pop()?.replace(".md", "") ?? "";
    const { data } = matter(rawContent); // Parse frontmatter
    return {
        slug,
        title: (data as Frontmatter).title ?? "Untitled",
    };
}).sort((a, b) => a.title.localeCompare(b.title)); // Sort pages alphabetically by title for consistent sidebar

export async function getMarkdownContent(
    slug: string
): Promise<{ contentHtml: string; title: string; headings: HeadingInfo[] }> {
    const matter = (await import("gray-matter")).default;
    const filePath = `../../../../content/docs/${slug}.md`;

    // The type of markdownModules values should be string here due to `import: 'default'` and `query: '?raw'`
    const rawContent = markdownModules[filePath] as unknown as string | undefined;

    if (!rawContent) {
        return {
            title: "Not Found",
            contentHtml: "<p>Documentation page not found.</p>",
            headings: [],
        };
    }

    // rawContent is already a string here
    const { data, content: markdownContent } = matter(rawContent);
    const frontmatter = data as Frontmatter;

    const headings: HeadingInfo[] = [];
    const renderer = new marked.Renderer();

    renderer.heading.apply = function ({ text, depth, raw, slugger }: { text: string; depth: number; raw: string; slugger: any }) {
        const id = slugger.slug(raw);
        headings.push({ level: depth, text, id });
        return `<h${depth} id="${id}">${text}</h${depth}>`;
    };

    marked.use({ renderer });
    const contentHtml = await marked.parse(markdownContent);

    return {
        title: frontmatter.title ?? "Untitled Document",
        contentHtml,
        headings,
    };
}