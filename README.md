# Bundle Builder

A React prototype of a multi-step home security bundle builder with a live review panel. Built as a frontend take-home exercise.

## Prerequisites

- **Node.js** 18+ (20+ recommended)
- **npm** 9+

## Run from a clean clone

```bash
git clone <your-repo-url>
cd bundle-builder
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Verify production build

```bash
npm run build
npm run preview
```

Preview runs at [http://localhost:4173](http://localhost:4173).

### Lint (optional)

```bash
npm run lint
```

## Tech stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** for styling
- **shadcn/ui** patterns (`Button`, `Badge`, `cn` utility)
- **Zustand** (+ `persist` middleware) for state
- **Lucide React** for icons

## What it does

- **4-step accordion builder:** cameras → plan → sensors → add extra protection
- **Live review panel:** synced quantities, grouped line items, totals, savings, checkout
- **Variant selection:** per-color quantities tracked separately; card stepper edits the active variant
- **Data-driven catalog:** products and steps defined in `src/data/catalog.json`
- **Persistence:** cart, active variants, and open step saved to `localStorage` via “Save my system for later”
- **Responsive layout:**
  - **Mobile:** stacked builder + review, “Let’s get started!” header
  - **Medium (`lg`–`xl`):** builder left, review sidebar right
  - **Large (`2xl+`):** builder full width, review panel full width below

## Project structure

```
src/
  components/
    accordion/       Shared accordion shell
    steps/           One component per builder step
    review/          Review panel line items + checkout summary
    ui/              shadcn-style primitives
  data/              catalog.json + image mapping
  store/             Zustand store + selectors
  types/             TypeScript types
  assets/            Product and UI images
```

## Decisions & tradeoffs

- **Local JSON catalog** instead of an API — keeps the repo easy to clone and run; the shape supports swapping in a `fetch()` layer later.
- **Zustand `persist`** auto-saves cart, active variants, and open step to `localStorage`. First visit uses seeded defaults matching the Figma design; returning visitors get their saved configuration back.
- **Separate step components** (`CamerasStep`, `PlanStep`, etc.) so each step can own its grid/layout without touching shared accordion logic.
- **Separate review line components** for products, plan, and shipping — each matches a different Figma row pattern (plan has no stepper; shipping is a fixed FREE row).
- **Product images** are local PNG assets in `src/assets/` (not licensed Wyze marketing assets).
- **Plan selection** is mutually exclusive — choosing one plan clears the others in the cart.
- **Checkout** is a placeholder in-app confirmation; there is no backend or payment flow.
- **Variant chip styling** implements active/inactive behavior and quantity flow; fine visual polish could still be tightened against Figma pixel specs.

## Not finished / known gaps

- No automated tests (unit or E2E).
- No API/backend for catalog or checkout.
- Some accessory and plan product images still use simple SVG placeholders where PNG assets were not available.
- Accessibility pass (keyboard traps in accordion, live region for totals) could be expanded.

## Figma reference

Design: [Frontend Test Figma](https://www.figma.com/design/JYf61etQVqeseX7oY5alGz/Frontend-Test-Figma)
