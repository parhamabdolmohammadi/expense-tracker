import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getCategorySpending } from './categorySpending.js'
import { formatCategoryLabel, withCategoryColors } from './categoryColors.js'

function CategoryPieChart({ transactions, categories }) {
  const spending = getCategorySpending(transactions, categories)
  const data = withCategoryColors(spending)
  const totalSpending = data.reduce((sum, entry) => sum + entry.amount, 0)

  return (
    <div className="spending-chart">
      <h2>Category breakdown</h2>
      {data.length === 0 ? (
        <p className="empty-state">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              labelLine={false}
              label={({ amount }) => `${Math.round((amount / totalSpending) * 100)}%`}
            >
              {data.map((entry) => (
                <Cell key={entry.category} fill={entry.fill} stroke="#edeee7" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, formatCategoryLabel(name)]} />
            <Legend formatter={formatCategoryLabel} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default CategoryPieChart
