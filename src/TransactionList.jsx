import { useState } from 'react'
import { formatCategoryLabel } from './categoryColors.js'
import { formatCurrency } from './formatCurrency.js'

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
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="empty-state">No transactions match these filters.</p>
      ) : (
        <div className="ledger-rows">
          <div className="ledger-row ledger-row-head">
            <span className="col-date">Date</span>
            <span className="col-desc">Description</span>
            <span className="col-category">Category</span>
            <span className="col-amount">Amount</span>
            <span className="col-actions"></span>
          </div>
          {filteredTransactions.map(t => (
            <div className="ledger-row" key={t.id}>
              <span className="col-date">{t.date}</span>
              <span className="col-desc">{t.description}</span>
              <span className="col-category">{formatCategoryLabel(t.category)}</span>
              <span className={`col-amount ${t.type === "income" ? "credit" : "debit"}`}>
                {t.type === "income" ? "+" : "−"}{formatCurrency(t.amount)}
              </span>
              <span className="col-actions">
                <button
                  className="delete-btn"
                  onClick={() => {
                    if (window.confirm(`Are you sure that you want to delete "${t.description}"?`)) {
                      onDeleteTransaction(t.id);
                    }
                  }}
                >
                  Remove
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList
