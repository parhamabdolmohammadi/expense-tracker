// Kept out of the red/green family on purpose: those two hues already mean
// "credit" and "debit" elsewhere on the page, so reusing them here would make
// a category slice look like a direction indicator. Validated with
// scripts/validate_palette.js (dataviz skill) against the paper surface,
// --pairs all, all six checks passing.
export const CATEGORICAL_COLORS = ['#1f6fb2', '#c8860a', '#b03a6b']
export const OTHER_COLOR = '#6b6459'
export const TOP_N = 3
export const OTHER_KEY = '__other__'

export const formatCategoryLabel = (category) =>
  category === OTHER_KEY ? 'Other' : category.charAt(0).toUpperCase() + category.slice(1)

export function withCategoryColors(spending) {
  const top = spending.slice(0, TOP_N).map((entry, index) => ({
    ...entry,
    fill: CATEGORICAL_COLORS[index],
  }))

  const otherTotal = spending.slice(TOP_N).reduce((sum, entry) => sum + entry.amount, 0)

  return otherTotal > 0
    ? [...top, { category: OTHER_KEY, amount: otherTotal, fill: OTHER_COLOR }]
    : top
}
