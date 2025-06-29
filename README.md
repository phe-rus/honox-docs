# HonoX Unofficial Documentation

This project provides unofficial documentation for the [HonoX](https://github.com/honojs/honox) meta-framework. It aims to be a comprehensive resource for developers looking to build full-stack websites or Web APIs with HonoX.

The site is built with HonoX itself, using React for rendering and Tailwind CSS for styling. Documentation content is written in Markdown.

## Features

*   **Comprehensive Guides:** Covers various aspects of HonoX, from getting started to deployment.
*   **Markdown-based:** Documentation is easy to read, write, and contribute to.
*   **Dynamic Content Loading:** Pages are generated dynamically from Markdown files.
*   **Interactive Sidebars:** Includes a main navigation sidebar and an "On this page" table of contents for easy navigation.
*   **Built with HonoX:** Demonstrates a real-world application of HonoX.

## Getting Started

### Prerequisites

*   Node.js (version recommended by HonoX, typically latest LTS)
*   pnpm (or npm/yarn)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/honox-docs.git # Replace with actual repo URL if different
    cd honox-docs
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
    (Or `npm install` / `yarn install` if you prefer)

### Running the Development Server

To start the development server:

```bash
pnpm dev
```

This will typically start the server on `http://localhost:5173`.

## Project Structure

*   `app/`: Contains the HonoX application code.
    *   `routes/`: Defines the application routes.
        *   `docs/[slug]/index.tsx`: The route handler for rendering documentation pages.
        *   `_renderer.tsx`: The main page renderer/layout.
    *   `islands/`: Client-side interactive components (Islands).
    *   `client.ts`: Client-side entry point.
    *   `server.ts`: Server-side entry point for HonoX.
    *   `globals.css`: Global stylesheets and Tailwind CSS setup.
*   `content/`: Contains the documentation content.
    *   `docs/`: Markdown files for each documentation page. Each `.md` file here corresponds to a page in the `/docs/...` section of the site.
        *   Frontmatter (e.g., `title`) is used for page metadata.
*   `public/`: Static assets.
*   `vite.config.ts`: Vite configuration.
*   `wrangler.jsonc`: Cloudflare Workers/Pages configuration (this file was `wrangler.toml` in the official HonoX docs, but this project uses `.jsonc`).

## Contributing

Contributions are welcome! If you find any issues, inaccuracies, or want to add new documentation, please feel free to:

1.  **Fork the repository.**
2.  **Create a new branch** for your changes (`git checkout -b feature/your-feature-name`).
3.  **Make your changes:**
    *   For documentation content, edit or add Markdown files in the `content/docs/` directory.
        *   Ensure you include a `title` in the frontmatter of new Markdown files.
        *   Follow the existing style and formatting.
    *   For code changes, modify the relevant files in the `app/` directory.
4.  **Commit your changes** (`git commit -am 'Add some feature'`).
5.  **Push to the branch** (`git push origin feature/your-feature-name`).
6.  **Open a Pull Request.**

Please ensure your code lints and any tests (if applicable) pass before submitting a PR.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (assuming one will be added, standard for open source).
