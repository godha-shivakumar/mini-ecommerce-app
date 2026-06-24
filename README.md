# Nua Ecommerce Frontend Assignment

## Live Demo

**Live URL:** <ADD_VERCEL_URL>

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Context API
- SCSS

## Features

- Product listing page using Fake Store API
- Product detail page with variant selection
- URL-based variant persistence (deep linking)
- Add to Cart functionality
- Cart item count in navbar
- Cart quantity management
- Remove items from cart
- Cart persistence using localStorage
- Loading and error states
- Responsive design for desktop and mobile
- Lazy-loaded product images

## Project Structure

```txt
src/
├─ components/
│  ├─ LazyImage.tsx
│  ├─ Navbar.tsx
│  └─ ProductCard.tsx
├─ context/
│  └─ CartContext.tsx
├─ pages/
│  ├─ ProductListing.tsx
│  └─ ProductDetail.tsx
├─ router/
│  └─ index.tsx
├─ services/
│  └─ products.ts
├─ styles/
│  └─ globals.scss
├─ types/
│  └─ product.ts
├─ App.tsx
├─ App.css
├─ index.css
└─ main.tsx
```

## Setup

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## API

This project uses the Fake Store API:

https://fakestoreapi.com

## State Management

React Context API is used for cart state management.

Cart data is persisted in localStorage and rehydrated on application startup to ensure cart contents remain available after page refreshes.

## Design Decisions

Additional architectural decisions and implementation trade-offs are documented in the `DECISIONS.md` file.

## Known Trade-Offs

- Fake Store API does not provide product variants or inventory data, so variant information is simulated locally.
- Inventory states such as available, low stock, and sold out are mocked for demonstration purposes.
- Context API was chosen instead of Redux due to the limited global state requirements of the application.

## Deployment

Hosted on Vercel.

**Live URL:** https://mini-ecommerce-app-vm89.vercel.app/
