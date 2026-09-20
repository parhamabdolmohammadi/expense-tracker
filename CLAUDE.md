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

This is a single-page Vite + React 19 app with no router, no state
management library, and no component decomposition yet:

- `src/main.jsx` mounts `<App />` from `src/main.jsx` into `#root` inside `StrictMode`.
- `src/App.jsx` contains the entire application: transaction state, the
  add-transaction form, filters, computed summary totals (income, expenses,
  balance), and the transactions table are all defined in this one
  component via `useState`. There are no sub-components, no separate data
  layer, and no persistence — transaction data lives only in memory and
  resets on reload.
- Styling is plain CSS in `src/App.css` and `src/index.css` (no CSS
  modules, no Tailwind, no CSS-in-JS).
- `transactions[].amount` is stored as a **string** (e.g. `"5000"`), not a
  number, which affects any arithmetic done on it (e.g. `reduce` sums).

## Linting

ESLint uses the flat config format (`eslint.config.js`) with
`@eslint/js` recommended rules, `eslint-plugin-react-hooks`, and
`eslint-plugin-react-refresh` (Vite-specific). `dist` is ignored.
`no-unused-vars` is configured to ignore vars matching `^[A-Z_]`.
