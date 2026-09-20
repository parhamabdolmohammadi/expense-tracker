export function getCategorySpending(transactions, categories) {
  return categories
    .map((category) => ({
      category,
      amount: transactions
        .filter((t) => t.type === 'expense' && t.category === category)
        .reduce((sum, t) => sum + t.amount, 0),
    }))
    .filter((entry) => entry.amount > 0)
    .sort((a, b) => b.amount - a.amount)
}
