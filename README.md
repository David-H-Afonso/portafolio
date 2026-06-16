# Portfolio

Personal portfolio built with React and TypeScript. Features a custom component system, dark/light theming, and full multilingual support across English, Spanish, and Japanese — all persisted across sessions.

## Tech Stack

| Layer     | Technology                    |
| --------- | ----------------------------- |
| Framework | React 19 + TypeScript         |
| State     | Redux Toolkit + redux-persist |
| Routing   | React Router DOM 7            |
| Styling   | SCSS + CSS custom properties  |
| i18n      | i18next (EN · ES · JA)        |
| Build     | Vite 7                        |

## Getting Started

**Prerequisites:** Node.js 20.19+ or 22.12+ and npm 10+

```bash
# Clone and install
git clone <repository-url>
cd portafolio
npm install

# Start development server (http://localhost:5173)
npm run dev
```

## Scripts

```bash
npm run dev       # development server
npm run build     # type-check + production build
npm run preview   # preview production build locally
npm run lint      # ESLint
npm run create    # scaffold a new component
```

## Project Structure

```
src/
├── assets/           # images, global SCSS (variables, keyframes)
├── components/       # feature components (Home, Error404)
│   └── elements/     # shared UI primitives (Button, Console, StatusBox…)
├── environments/     # dev/prod environment config
├── hooks/            # custom React hooks
├── i18n/             # i18next setup + EN/ES/JA locale files
├── layouts/          # AppLayout, EmptyLayout, LayoutProvider, Header
├── models/           # TypeScript interfaces for store and components
├── navigation/       # React Router configuration
├── services/         # API service layer
├── store/            # Redux store, themeFeature, i18nFeature
└── utils/            # shared utilities (customFetch…)
```

## Features

- **Theming** — light/dark mode toggled from the header, persisted via redux-persist
- **Internationalization** — EN, ES, JA with language preference persisted
- **404 handling** — custom error page with terminal-style diagnostics and recovery actions
- **Layout system** — `LayoutProvider` selects the correct layout per route
- **Component scaffolding** — `npm run create` generates a new component from a template

## License

MIT © David H. Afonso — see [LICENSE.md](LICENSE.md)

This project is licensed under the GPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details.

---

**Built with ❤️ for PROJECT worldwide**
