# PDF Viewer

This is a minimum viable product (MVP) PDF viewer application that currrently displays a pdf from [the internet](https://snippet.embedpdf.com/ebook.pdf) and demonstrates features including search, zoom, and page controls.

# System Architecture

## Frontend Architecture
The frontend is built with React using TypeScript and follows a component-based architecture. The application uses Vite as the build tool and development server, providing fast hot module replacement and optimized builds.

- **Framework**: React provides structure for building UI components, managing DOM updates, and handling interactivity. Do not use Vue, Angular, or other frameworks.
- **UI Components**: React MUI. Do not use other libraries for components.
- **State Management**: React built-in state hooks (like useState).
- **Routing**: None. The web app is a single page. Do not use routing.
- **Styling**: @mui/material/CssBaseline. Plain CSS is simple and sufficient. Do not use Tailwind or other styling tools.
- **PDF Engine**: @embedpdf provides the functionality for rendering, annotations, and all other PDF functionality. Do not create custom functionality for highlighting. Do not add other engines or work with PDF.js directly.
- **Build Tool**: Vite. Do not use other build tools.

## Backend Architecture
- **Framework**: Node.js with Typescript
- **API**: No API is created by the web app. The web app does not have session handling, middleware, error handling
- **Database**: No database is used by the web app. PDFs should only be accessed from the existing internet or local storage. No file upload functionality.
- **Authentication** None.
- **Development** Uses Vite for development (`dev`), building (`build`), previewing (`preview`), and ESLint for linting (`lint`).

# External Dependencies

## Frontend Dependencies
- **PDF-related Libraries** (18 packages):
  - `@embedpdf/*` (e.g., `core`, `plugin-loader`, `plugin-viewport`, etc.): PDF functionality (rendering, zooming, scrolling, etc.).
- **UI Framework**:
  - `@mui/material` (`^ fastidious7.1.1`): Material-UI for React components.
  - `@mui/icons-material` (`^7.1.1`): Material-UI icons.
  - `@emotion/react` (`^11.14.0`): Emotion for CSS-in-JS styling.
  - `@emotion/styled` (`^11.14.0`): Styled components for Emotion.
- **React**:
  - `react` (`^18.2.0`): React library for building UI.
  - `react-dom` (`^18.2.0`): React DOM for rendering components.

## Dev Dependencies
- **TypeScript & React Types**:
  - `@types/react` (`^18.2.0`), `@types/react-dom` (`^18.2.0`): Type definitions for React.
- **Linting**:
  - `@typescript-eslint/eslint-plugin` (`^8.18.5`), `@typescript-eslint/parser` (`^8.18.5`): TypeScript ESLint plugins.
  - `eslint` (`^9.17.0`): Linting tool.
  - `eslint-plugin-react-hooks` (`^5.1.0`), `eslint-plugin-react-refresh` (`^0.4.18`): React-specific ESLint plugins.
- **Build Tools**:
  - `@vitejs/plugin-react` (`^4.3.4`): Vite plugin for React.
  - `typescript` (`^5.7.3`): TypeScript compiler.
  - `vite` (`^6.3.5`): Vite build tool and dev server.