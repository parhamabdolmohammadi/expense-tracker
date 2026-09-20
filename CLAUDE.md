# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Expense Tracker — the starter project for a Claude Code course
(https://codewithmosh.com/p/claude-code). A basic React expense tracker.
It intentionally ships with a bug, poor UI, and messy code, which is meant
to be fixed incrementally during the course — don't assume messiness or
bugs found here are accidental unless asked to fix them.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start Vite dev server (http://localhost:5173, or next free port)
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # run ESLint
```

There is no test suite configured in this repo.

## Architecture

Single-page Vite + React 19 app, no router, no state management library,
no persistence — all data lives in React state and resets on reload.

- `src/main.jsx` mounts `<App />` (from `src/App.jsx`) into `#root` inside
  `StrictMode`.
- `src/App.jsx` is the composition root. It owns the only piece of shared
  state, `transactions` (via `useState`, seeded with sample data), defines
  the fixed `categories` list as a module-level constant, and renders
  `Summary`, `TransactionForm`, and `TransactionList` below it.
- Data flows down as props and back up via callback props (lifted-state
  pattern) — there's no context or external store:
  - `src/Summary.jsx` — takes `transactions`, computes `totalIncome`,
    `totalExpenses`, and `balance` itself, and renders the summary cards.
  - `src/TransactionForm.jsx` — takes `categories` and `onAddTransaction`;
    owns its own local form field state and calls `onAddTransaction(newTransaction)`
    on submit. `App.jsx` is the one that actually appends it to `transactions`.
  - `src/TransactionList.jsx` — takes `transactions` and `categories`;
    owns its own local filter state (type, category) and renders the
    filter controls plus the filtered table.
- Styling is plain CSS in `src/App.css` and `src/index.css` (no CSS
  modules, no Tailwind, no CSS-in-JS).

## Linting

ESLint uses the flat config format (`eslint.config.js`) with
`@eslint/js` recommended rules, `eslint-plugin-react-hooks`, and
`eslint-plugin-react-refresh` (Vite-specific). `dist` is ignored.
`no-unused-vars` is configured to ignore vars matching `^[A-Z_]`.
