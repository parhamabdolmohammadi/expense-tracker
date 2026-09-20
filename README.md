# Finance Tracker

A clean, fast personal finance tracker for keeping tabs on your income and expenses — built with React and Vite, with no backend and no setup beyond `npm install`.

## Features

- **Balance at a glance** — a running total of income vs. expenses, updated instantly as you add transactions.
- **Add transactions** — log income or expenses with a description, amount, category, and date, with built-in validation and clear error messages for bad input.
- **Spending by category** — a bar chart breaking down where your money goes.
- **Category distribution** — a pie chart showing the share of spending across categories.
- **Filterable transaction list** — filter by type (income/expense) and category, and delete transactions you no longer need.
- **Categories** — Food, Housing, Utilities, Transport, Entertainment, Salary, and Other, each with its own color for quick visual scanning.

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) for development and bundling
- [Recharts](https://recharts.org/) for the bar and pie charts
- Plain CSS — no framework, no CSS-in-JS

## Getting Started

```bash
npm install
npm run dev
```

Then open your browser at `http://localhost:5173`.

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the Vite dev server             |
| `npm run build`   | Build for production                  |
| `npm run preview` | Preview the production build locally  |
| `npm run lint`    | Run ESLint                            |

## Project Structure

```
src/
├── main.jsx               # App entry point
├── App.jsx                # Composition root, owns transaction state
├── Summary.jsx             # Balance, total income, and total expenses
├── TransactionForm.jsx      # Form for adding a new transaction
├── TransactionList.jsx      # Filterable, deletable transaction table
├── SpendingByCategory.jsx   # Bar chart of spending per category
├── CategoryPieChart.jsx     # Pie chart of spending distribution
├── categorySpending.js       # Shared category aggregation logic
├── categoryColors.js         # Consistent category color mapping
└── formatCurrency.js         # Currency formatting helper
```

Data lives entirely in memory via React state — refreshing the page resets it to the sample data. There's no persistence layer or backend by design, keeping the project lightweight and easy to run anywhere.

## License

This project is open source and available for personal or educational use.
