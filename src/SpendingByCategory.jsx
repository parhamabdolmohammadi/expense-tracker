import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getCategorySpending } from './categorySpending.js'

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1)

function SpendingByCategory({ transactions, categories }) {
  const data = getCategorySpending(transactions, categories)

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="empty-state">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(data.length * 40, 120)}>
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
            <XAxis
              type="number"
              tickFormatter={(value) => `$${value}`}
              stroke="#888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={90}
              stroke="#888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={capitalize}
            />
            <Tooltip
              formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']}
              labelFormatter={capitalize}
              cursor={{ fill: '#f5f5f5' }}
            />
            <Bar dataKey="amount" fill="#2a78d6" radius={[0, 4, 4, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default SpendingByCategory
