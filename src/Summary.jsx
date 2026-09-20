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
    <div className="summary">
      <div className="balance-hero">
        <p className="balance-label">Current balance</p>
        <p className={`balance-amount ${balance < 0 ? 'is-negative' : ''}`}>
          {formatCurrency(balance)}
        </p>
      </div>
      <div className="summary-stats">
        <div className="stat">
          <p className="stat-label">Income</p>
          <p className="stat-amount income-amount">+{formatCurrency(totalIncome)}</p>
        </div>
        <div className="stat">
          <p className="stat-label">Expenses</p>
          <p className="stat-amount expense-amount">-{formatCurrency(totalExpenses)}</p>
        </div>
      </div>
    </div>
  );
}

export default Summary
