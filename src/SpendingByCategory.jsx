import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getCategorySpending } from './categorySpending.js'
import { formatCategoryLabel } from './categoryColors.js'

function SpendingByCategory({ transactions, categories }) {
  const data = getCategorySpending(transactions, categories)

  return (
    <div className="spending-chart">
      <h2>Spending by category</h2>
      {data.length === 0 ? (
        <p className="empty-state">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(data.length * 40, 120)}>
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#d9d4c5" />
            <XAxis
              type="number"
              tickFormatter={(value) => `$${value}`}
              stroke="#6b6459"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={90}
              stroke="#6b6459"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCategoryLabel}
            />
            <Tooltip
              formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']}
              labelFormatter={formatCategoryLabel}
              cursor={{ fill: '#e3e0d3' }}
            />
            <Bar dataKey="amount" fill="#1f6fb2" radius={[0, 4, 4, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default SpendingByCategory
