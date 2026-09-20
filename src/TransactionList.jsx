import { useState } from 'react'
import { formatCurrency } from './formatCurrency.js'

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1)

function TransactionList({ transactions, categories, onDeleteTransaction }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{capitalize(cat)}</option>
          ))}
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="empty-state">No transactions match these filters.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="amount-col">Amount</th>
              <th className="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{capitalize(t.category)}</td>
                <td className={`amount-col ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </td>
                <td className="actions-col">
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm(`Are you sure that you want to delete "${t.description}"?`)) {
                        onDeleteTransaction(t.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList
