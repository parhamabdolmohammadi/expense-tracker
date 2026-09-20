import { useState } from 'react'

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1)

function TransactionForm({ categories, onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAddTransaction({
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add transaction</h2>
      <form onSubmit={handleSubmit}>
        <label className="field field-description">
          <span className="field-label">Description</span>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="field field-amount">
          <span className="field-label">Amount</span>
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className="field field-type">
          <span className="field-label">Type</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="field field-category">
          <span className="field-label">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{capitalize(cat)}</option>
            ))}
          </select>
        </label>
        <button type="submit">Add transaction</button>
      </form>
    </div>
  );
}

export default TransactionForm
