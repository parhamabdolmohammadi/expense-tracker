import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getCategorySpending } from './categorySpending.js'

// Pie slices are an all-pairs color context (any two can end up adjacent), which
// only the first 3 categorical hues clear at every CVD/contrast gate. Past that,
// fold the remainder into a neutral "Other" bucket rather than adding a 4th hue.
const CATEGORICAL_COLORS = ['#2a78d6', '#eb6834', '#1baf7a']
const OTHER_COLOR = '#898781'
const TOP_N = 3
const OTHER_KEY = '__other__'

const formatCategoryLabel = (category) =>
  category === OTHER_KEY ? 'Other' : category.charAt(0).toUpperCase() + category.slice(1)

function CategoryPieChart({ transactions, categories }) {
  const spending = getCategorySpending(transactions, categories)

  const top = spending.slice(0, TOP_N).map((entry, index) => ({
    ...entry,
    fill: CATEGORICAL_COLORS[index],
  }))

  const otherTotal = spending.slice(TOP_N).reduce((sum, entry) => sum + entry.amount, 0)

  const data = otherTotal > 0
    ? [...top, { category: OTHER_KEY, amount: otherTotal, fill: OTHER_COLOR }]
    : top

  const totalSpending = data.reduce((sum, entry) => sum + entry.amount, 0)

  return (
    <div className="spending-chart">
      <h2>Category Breakdown</h2>
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
                <Cell key={entry.category} fill={entry.fill} stroke="#fff" strokeWidth={2} />
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
