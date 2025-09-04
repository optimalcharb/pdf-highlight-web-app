# PDF Viewer Application

## Overview
A React/TypeScript PDF viewer application using EmbedPDF library and Material-UI. Successfully configured for Replit environment.

## Project Setup
- **Language**: Node.js 20 with TypeScript
- **Framework**: React with Vite build tool  
- **UI Library**: Material-UI (@mui/material, @mui/icons-material)
- **PDF Engine**: @embedpdf/* packages for rendering, zoom, search, etc.
- **Port**: 5000 (configured for Replit proxy)
- **Host**: 0.0.0.0 with allowedHosts: 'all'

## Recent Changes (Sept 4, 2025)
- Configured Vite for Replit environment (port 5000, allow all hosts)
- Set up development workflow with npm run dev
- Added serve dependency for production deployment
- Created .gitignore with Node.js patterns
- Configured deployment with autoscale target

## Architecture
- Frontend-only application (no backend)
- Single page application with drawer-based navigation
- Loads PDF from external URL: https://snippet.embedpdf.com/ebook.pdf
- Features: search, zoom, page controls, sidebar navigation

## Workflows
- PDF Viewer: `npm run dev` (development server on port 5000)

## Deployment
- Target: autoscale
- Build: `npm run build`
- Run: `npx serve -s dist -l 5000`