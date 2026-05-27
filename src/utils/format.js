/**
 * Format a score number into a compact string: 12345 → "12.3k"
 */
export function formatScore(score) {
  if (score === null || score === undefined) return '•'
  if (Math.abs(score) >= 1000) {
    return (score / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  }
  return String(score)
}
