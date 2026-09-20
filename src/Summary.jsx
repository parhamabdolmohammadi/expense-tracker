import { formatCurrency } from './formatCurrency.js'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="balance-block">
      <p className="balance-label">Your balance</p>
      <p className="balance-amount">{formatCurrency(balance)}</p>
      <p className="balance-meta">
        <span className="credit">↑ {formatCurrency(totalIncome)} in</span>
        <span className="debit">↓ {formatCurrency(totalExpenses)} out</span>
      </p>
    </div>
  );
}

export default Summary
