# The Invisible Collapse

An editorial landing page for **“The Invisible Collapse”** (*הקריסה הבלתי נראית*), an architecture and poetic-prose book by architect and artist **Nitzan Shelef Levy**.

The site presents the book through architectural imagery, video, project context, information about the author, and purchase options. It is designed primarily in Hebrew with a responsive right-to-left layout.

- **Live site:** [studionsl.com](https://studionsl.com)
- **Portfolio:** [nitzanshelef.myportfolio.com](https://nitzanshelef.myportfolio.com)

## Technology

- React 18
- Vite 5
- CSS
- Docker
- Nginx

## Getting started

Requirements:

- Node.js 20 or newer
- npm

Install the dependencies and start the development server:

```bash
npm ci
npm run dev
```

Vite will print the local development URL in the terminal.

## Available commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
```

## Project structure

```text
.
├── public/                 # Public metadata images, robots.txt and sitemap
├── src/
│   ├── assets/
│   │   ├── logos/         # Footer and social icons
│   │   ├── photoshot/     # Original photography and optimized portrait
│   │   ├── refinements/   # Production-ready book and project images
│   │   └── videos/        # Project videos
│   ├── App.jsx            # Page content and interactions
│   ├── main.jsx           # React entry point
│   └── styles.css         # Global layout and responsive styles
├── index.html             # HTML shell, SEO and social metadata
├── Dockerfile             # Production container build
├── nginx.conf             # Static-site server configuration
└── vite.config.js         # Vite configuration
```

The files under `book-sources/` are original project and publication source documents. They are not included in the production bundle.

## Production build

Create the optimized static site with:

```bash
npm run build
```

The generated site is written to `dist/`.

To build and run the production container:

```bash
docker build -t invisible-collapse .
docker run --rm -p 8080:8080 invisible-collapse
```

The site will be available at [localhost:8080](http://localhost:8080).

## Credits

- Concept, book and website: Nitzan Shelef Levy
- Photography: Yuval Urbach (יובל אורבך)

All artwork, photography, text and project materials are the property of their respective creators.
